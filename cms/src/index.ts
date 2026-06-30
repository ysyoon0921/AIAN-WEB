import type { Core } from '@strapi/strapi';

const PUBLIC_ACTIONS = [
  'api::about-ceo.about-ceo.find',
  'api::about-history.about-history.find',
  'api::timeline-item.timeline-item.find',
  'api::timeline-item.timeline-item.findOne',
  'api::site-setting.site-setting.find',
];

async function enablePublicPermissions(strapi: Core.Strapi) {
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

async function ensureLocales(strapi: Core.Strapi) {
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

async function seedContent(strapi: Core.Strapi) {
  const existingCeo = await strapi.documents('api::about-ceo.about-ceo').findFirst({
    locale: 'ko',
  });
  if (existingCeo) return;

  await strapi.documents('api::about-ceo.about-ceo').create({
    data: {
      label: 'CEO 메세지',
      title: '현장에서 시작한\n기술의 힘',
      lead: '제조 현장의 언어로 소프트웨어를 만듭니다.',
      name: '김순태',
      role: '대표이사 / CEO',
      body: '<p>AIAN은 현장에서 일해본 사람들이 만든 회사입니다. 복잡한 기술을 현장 누구나 쓸 수 있는 형태로 바꾸는 것이 우리의 목표입니다.</p><p>120개 이상의 제조 현장과 함께하며, IT와 제조를 잇는 가장 쉬운 방법을 만들어가고 있습니다.</p>',
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

  await strapi.documents('api::about-history.about-history').create({
    data: {
      label: 'HISTORY',
      title: 'AIAN의\n발자취',
      lead: '현장에서 시작해, 제조 소프트웨어로 성장해 왔습니다.',
    },
    locale: 'ko',
    status: 'published',
  });

  await strapi.documents('api::about-history.about-history').create({
    data: {
      label: 'HISTORY',
      title: 'Our\njourney',
      lead: 'From the factory floor to manufacturing software.',
    },
    locale: 'en',
    status: 'published',
  });

  const timelineItems = [
    {
      year: '2024',
      sortOrder: 1,
      ko: { title: '120+ 현장 돌파', description: '국내 제조 현장 120곳 이상에 솔루션을 도입했습니다.' },
      en: { title: '120+ sites', description: 'Deployed solutions to 120+ domestic manufacturing sites.' },
    },
    {
      year: '2022',
      sortOrder: 2,
      ko: { title: '본격 SaaS 전환', description: '클라우드 기반 MES·QMS 서비스를 출시했습니다.' },
      en: { title: 'SaaS launch', description: 'Launched cloud-based MES and QMS services.' },
    },
    {
      year: '2020',
      sortOrder: 3,
      ko: { title: 'AIAN 설립', description: '제조 현장 IT 연결을 목표로 회사를 설립했습니다.' },
      en: { title: 'Founded', description: 'Founded to connect IT with the factory floor.' },
    },
  ];

  for (const item of timelineItems) {
    const doc = await strapi.documents('api::timeline-item.timeline-item').create({
      data: {
        year: item.year,
        title: item.ko.title,
        description: item.ko.description,
        sortOrder: item.sortOrder,
      },
      locale: 'ko',
      status: 'published',
    });

    await strapi.documents('api::timeline-item.timeline-item').update({
      documentId: doc.documentId,
      locale: 'en',
      data: {
        title: item.en.title,
        description: item.en.description,
      },
      status: 'published',
    });
  }

  const siteSetting = await strapi.documents('api::site-setting.site-setting').create({
    data: {
      siteName: 'AIAN',
      email: 'hello@aian.kr',
      footerTagline: 'IT와 제조를 잇는 소프트웨어 파트너.',
      navCtaLabel: '상담 신청',
    },
    locale: 'ko',
  });

  await strapi.documents('api::site-setting.site-setting').update({
    documentId: siteSetting.documentId,
    locale: 'en',
    data: {
      footerTagline: 'The software partner connecting IT and manufacturing.',
      navCtaLabel: 'CONTACT US',
    },
  });
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureLocales(strapi);
    await enablePublicPermissions(strapi);
    await seedContent(strapi);
  },
};
