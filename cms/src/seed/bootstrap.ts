import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';
import {
  ABOUT_INTRO,
  ABOUT_LOCATION,
  CASE_STUDIES,
  HOME,
  MARQUEE,
  PRODUCTS,
} from './content';

export const PUBLIC_ACTIONS = [
  'api::about-ceo.about-ceo.find',
  'api::about-history.about-history.find',
  'api::about-intro.about-intro.find',
  'api::about-location.about-location.find',
  'api::timeline-item.timeline-item.find',
  'api::timeline-item.timeline-item.findOne',
  'api::site-setting.site-setting.find',
  'api::home-page.home-page.find',
  'api::product.product.find',
  'api::product.product.findOne',
  'api::case-study.case-study.find',
  'api::case-study.case-study.findOne',
];

export async function enablePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const existing = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  const existingActions = new Set(existing.map((p: { action: string }) => p.action));

  for (const action of PUBLIC_ACTIONS) {
    if (!existingActions.has(action)) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
    }
  }
}

export async function ensureLocales(strapi: Core.Strapi) {
  const localeService = strapi.plugin('i18n').service('locales');
  await localeService.initDefaultLocale();

  const existing = await localeService.find();
  const codes = existing.map((l: { code: string }) => l.code);

  if (!codes.includes('ko')) {
    await localeService.create({ name: 'Korean (ko)', code: 'ko' });
  }
  if (!codes.includes('en')) {
    await localeService.create({ name: 'English (en)', code: 'en' });
  }

  await localeService.setDefaultLocale({ code: 'ko' });
}

async function uploadSeedPhoto(strapi: Core.Strapi) {
  const candidates = [
    path.join(process.cwd(), 'seed/ceo-photo.png'),
    path.join(process.cwd(), 'seed/ceo-kim.jpg'),
    path.join(process.cwd(), '../assets/ceo-kim.jpg'),
  ];

  const filePath = candidates.find((p) => fs.existsSync(p));
  if (!filePath) return null;

  const uploadService = strapi.plugin('upload').service('upload');
  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';

  const [uploaded] = await uploadService.upload({
    data: { fileInfo: { name: path.basename(filePath), alternativeText: 'CEO photo' } },
    files: {
      filepath: filePath,
      originalFilename: path.basename(filePath),
      mimetype: mime,
      size: stat.size,
    },
  });

  return uploaded?.id ?? null;
}

async function seedAboutCeo(strapi: Core.Strapi, photoId: number | null) {
  const existing = await strapi.documents('api::about-ceo.about-ceo').findFirst({ locale: 'ko' });
  if (existing) {
    const existingWithPhoto = existing as typeof existing & { photo?: unknown };
    if (photoId && !existingWithPhoto.photo) {
      await strapi.documents('api::about-ceo.about-ceo').update({
        documentId: existing.documentId,
        locale: 'ko',
        data: { photo: photoId },
      });
    }
    return;
  }

  await strapi.documents('api::about-ceo.about-ceo').create({
    data: {
      label: 'CEO 메세지',
      title: '현장에서 시작한\n기술의 힘',
      lead: '제조 현장의 언어로 소프트웨어를 만듭니다.',
      name: '김순태',
      role: '대표이사 / CEO',
      body: '<p>AIAN은 현장에서 일해본 사람들이 만든 회사입니다. 복잡한 기술을 현장 누구나 쓸 수 있는 형태로 바꾸는 것이 우리의 목표입니다.</p><p>120개 이상의 제조 현장과 함께하며, IT와 제조를 잇는 가장 쉬운 방법을 만들어가고 있습니다.</p>',
      ...(photoId ? { photo: photoId } : {}),
    },
    locale: 'ko',
    status: 'published',
  });

  await strapi.documents('api::about-ceo.about-ceo').create({
    data: {
      label: 'CEO Message',
      title: 'Technology born\non the factory floor',
      lead: 'We build software in the language of the factory floor.',
      name: 'Soon-tae Kim',
      role: 'Chief Executive Officer',
      body: '<p>AIAN was founded by people from the factory floor. Our goal is to make complex technology usable by everyone on site.</p><p>Working with 120+ manufacturing sites, we build the easiest way to connect IT and manufacturing.</p>',
    },
    locale: 'en',
    status: 'published',
  });
}

async function seedTimeline(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::timeline-item.timeline-item').findFirst({ locale: 'ko' });
  if (existing) return;

  const items = [
    { year: '2024', sortOrder: 1, ko: { title: '120+ 현장 돌파', description: '국내 제조 현장 120곳 이상에 솔루션을 도입했습니다.' }, en: { title: '120+ sites', description: 'Deployed solutions to 120+ domestic manufacturing sites.' } },
    { year: '2022', sortOrder: 2, ko: { title: '본격 SaaS 전환', description: '클라우드 기반 MES·QMS 서비스를 출시했습니다.' }, en: { title: 'SaaS launch', description: 'Launched cloud-based MES and QMS services.' } },
    { year: '2020', sortOrder: 3, ko: { title: 'AIAN 설립', description: '제조 현장 IT 연결을 목표로 회사를 설립했습니다.' }, en: { title: 'Founded', description: 'Founded to connect IT with the factory floor.' } },
  ];

  for (const item of items) {
    const doc = await strapi.documents('api::timeline-item.timeline-item').create({
      data: { year: item.year, title: item.ko.title, description: item.ko.description, sortOrder: item.sortOrder },
      locale: 'ko',
      status: 'published',
    });
    await strapi.documents('api::timeline-item.timeline-item').update({
      documentId: doc.documentId,
      locale: 'en',
      data: { title: item.en.title, description: item.en.description },
      status: 'published',
    });
  }
}

async function seedSiteSettings(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::site-setting.site-setting').findFirst({ locale: 'ko' });
  if (existing) return;

  const siteSetting = await strapi.documents('api::site-setting.site-setting').create({
    data: {
      siteName: 'AIAN',
      phone: '02-1234-5678',
      email: 'hello@aian.kr',
      footerTagline: 'IT와 제조를 잇는 소프트웨어 파트너.',
      navCtaLabel: '상담 신청',
      address: '서울특별시 강남구 테헤란로 123',
    },
    locale: 'ko',
  });

  await strapi.documents('api::site-setting.site-setting').update({
    documentId: siteSetting.documentId,
    locale: 'en',
    data: {
      footerTagline: 'The software partner connecting IT and manufacturing.',
      navCtaLabel: 'CONTACT US',
      address: '123 Teheran-ro, Gangnam-gu, Seoul',
    },
  });
}

async function seedAboutHistory(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::about-history.about-history').findFirst({ locale: 'ko' });
  if (existing) return;

  await strapi.documents('api::about-history.about-history').create({
    data: { label: 'HISTORY', title: 'AIAN의\n발자취', lead: '현장에서 시작해, 제조 소프트웨어로 성장해 왔습니다.' },
    locale: 'ko',
    status: 'published',
  });
  await strapi.documents('api::about-history.about-history').create({
    data: { label: 'HISTORY', title: 'Our\njourney', lead: 'From the factory floor to manufacturing software.' },
    locale: 'en',
    status: 'published',
  });
}

async function seedAboutIntro(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::about-intro.about-intro').findFirst({ locale: 'ko' });

  if (!existing) {
    await strapi.documents('api::about-intro.about-intro').create({
      data: ABOUT_INTRO.ko,
      locale: 'ko',
      status: 'published',
    });
    await strapi.documents('api::about-intro.about-intro').create({
      data: ABOUT_INTRO.en,
      locale: 'en',
      status: 'published',
    });
    return;
  }

  // After JSON → component schema change, cards may be empty — restore seed once.
  for (const locale of ['ko', 'en'] as const) {
    const doc = await strapi.documents('api::about-intro.about-intro').findFirst({ locale });
    if (!doc) continue;
    const cards = (doc as { cards?: unknown[] | null }).cards;
    if (!cards || cards.length === 0) {
      await strapi.documents('api::about-intro.about-intro').update({
        documentId: doc.documentId,
        locale,
        data: { cards: ABOUT_INTRO[locale].cards },
      });
      strapi.log.info(`Restored About Intro cards for locale: ${locale}`);
    }
  }
}

async function seedAboutLocation(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::about-location.about-location').findFirst({ locale: 'ko' });
  if (existing) return;

  await strapi.documents('api::about-location.about-location').create({
    data: { ...ABOUT_LOCATION.ko, mapEmbedUrl: ABOUT_LOCATION.mapEmbedUrl, mapLinkUrl: ABOUT_LOCATION.mapLinkUrl },
    locale: 'ko',
    status: 'published',
  });
  await strapi.documents('api::about-location.about-location').create({
    data: { ...ABOUT_LOCATION.en, mapEmbedUrl: ABOUT_LOCATION.mapEmbedUrl, mapLinkUrl: ABOUT_LOCATION.mapLinkUrl },
    locale: 'en',
    status: 'published',
  });
}

async function seedHomePage(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::home-page.home-page').findFirst({ locale: 'ko' });
  if (existing) return;

  await strapi.documents('api::home-page.home-page').create({
    data: { ...HOME.ko, marqueeItems: MARQUEE },
    locale: 'ko',
    status: 'published',
  });
  await strapi.documents('api::home-page.home-page').create({
    data: { ...HOME.en, marqueeItems: MARQUEE },
    locale: 'en',
    status: 'published',
  });
}

async function seedProducts(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::product.product').findFirst({ locale: 'ko' });
  if (existing) return;

  for (const product of PRODUCTS) {
    const doc = await strapi.documents('api::product.product').create({
      data: {
        slug: product.slug,
        cardId: product.cardId,
        sortOrder: product.sortOrder,
        theme: product.theme,
        linkUrl: product.linkUrl,
        name: product.ko.name,
        badge: product.ko.badge,
        headline: product.ko.headline,
        description: product.ko.description,
        tags: product.ko.tags,
      },
      locale: 'ko',
      status: 'published',
    });
    await strapi.documents('api::product.product').update({
      documentId: doc.documentId,
      locale: 'en',
      data: {
        badge: product.en.badge,
        headline: product.en.headline,
        description: product.en.description,
        tags: product.en.tags,
      },
      status: 'published',
    });
  }
}

async function seedCaseStudies(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::case-study.case-study').findFirst({ locale: 'ko' });
  if (existing) return;

  for (const item of CASE_STUDIES) {
    const doc = await strapi.documents('api::case-study.case-study').create({
      data: {
        slug: item.slug,
        sortOrder: item.sortOrder,
        tabLabel: item.ko.tabLabel,
        category: item.ko.category,
        title: item.ko.title,
        description: item.ko.description,
        bullets: item.ko.bullets,
        mockTitle: item.ko.mockTitle,
        mockStats: item.ko.mockStats,
        links: item.ko.links,
      },
      locale: 'ko',
      status: 'published',
    });
    await strapi.documents('api::case-study.case-study').update({
      documentId: doc.documentId,
      locale: 'en',
      data: {
        tabLabel: item.en.tabLabel,
        category: item.en.category,
        title: item.en.title,
        description: item.en.description,
        bullets: item.en.bullets,
        mockTitle: item.en.mockTitle,
        mockStats: item.en.mockStats,
        links: item.en.links,
      },
      status: 'published',
    });
  }
}

export async function seedContent(strapi: Core.Strapi) {
  let photoId: number | null = null;
  try {
    photoId = await uploadSeedPhoto(strapi);
  } catch (err) {
    strapi.log.warn('CEO photo upload skipped:', err);
  }

  await seedAboutCeo(strapi, photoId);
  await seedAboutHistory(strapi);
  await seedTimeline(strapi);
  await seedSiteSettings(strapi);
  await seedAboutIntro(strapi);
  await seedAboutLocation(strapi);
  await seedHomePage(strapi);
  await seedProducts(strapi);
  await seedCaseStudies(strapi);
}
