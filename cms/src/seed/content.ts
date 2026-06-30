export const PRODUCTS = [
  {
    slug: 'factorylens',
    cardId: 'FL-01',
    sortOrder: 1,
    theme: 'default' as const,
    linkUrl: '/solutions/monitoring.html',
    ko: {
      badge: '실시간 모니터링',
      name: 'FactoryLens',
      headline: '흩어진 데이터를 한 화면으로',
      description:
        '설비·센서·생산 데이터를 실시간으로 모아 보여주는 모니터링 OS. 이상이 생기기 전에 먼저 알려드립니다.',
      tags: ['# 실시간 대시보드', '# 이상 알림'],
    },
    en: {
      badge: 'Live Monitoring',
      name: 'FactoryLens',
      headline: 'All your data, on one screen',
      description:
        'A monitoring OS that gathers equipment, sensor, and production data in real time — and alerts you before problems happen.',
      tags: ['# Live dashboard', '# Alerts'],
    },
  },
  {
    slug: 'qualityai',
    cardId: 'QA-02',
    sortOrder: 2,
    theme: 'dark' as const,
    linkUrl: '/solutions/qms.html',
    ko: {
      badge: 'AI 품질 분석',
      name: 'QualityAI',
      headline: '불량 원인을 스스로 찾아냅니다',
      description:
        '언제·어디서·왜 불량이 났는지 AI가 자동으로 분석하는 품질 에이전트. 사람이 놓치는 패턴까지 잡아냅니다.',
      tags: ['# 원인 자동분석', '# 예측 경보'],
    },
    en: {
      badge: 'AI Quality',
      name: 'QualityAI',
      headline: 'It finds the defect cause itself',
      description:
        'A quality agent where AI automatically analyzes when, where, and why defects occur — catching patterns people miss.',
      tags: ['# Root-cause AI', '# Prediction'],
    },
  },
  {
    slug: 'planflow',
    cardId: 'PF-03',
    sortOrder: 3,
    theme: 'default' as const,
    linkUrl: '/solutions/mes.html',
    ko: {
      badge: '생산계획 자동화',
      name: 'PlanFlow',
      headline: '주문부터 실적까지 자동으로 흐릅니다',
      description:
        '주문이 들어오면 생산계획이 자동으로 서고, 현장 실적이 실시간으로 반영되는 생산관리(MES) 솔루션.',
      tags: ['# 계획 자동생성', '# 실적 연동'],
    },
    en: {
      badge: 'Planning',
      name: 'PlanFlow',
      headline: 'Order to output, flows automatically',
      description:
        'An MES solution where orders auto-generate plans and floor results sync back in real time.',
      tags: ['# Auto-planning', '# Live sync'],
    },
  },
];

export const CASE_STUDIES = [
  {
    slug: 'hansung',
    sortOrder: 1,
    ko: {
      tabLabel: '한성전자',
      category: 'MES',
      title: '생산 계획과 실적을\n하나의 흐름으로 연결',
      description:
        '다품종 조립 라인의 작업 지시·실적·재고를 디지털로 통합했습니다. 엑셀 기반 수기 관리를 줄이고 납기 준수율을 높였습니다.',
      bullets: ['납기 준수율 18%p 향상', '실적 집계 시간 70% 단축'],
      mockTitle: '생산 현황',
      mockStats: [
        { value: '94%', label: '가동률' },
        { value: '1,284', label: '생산량' },
      ],
      links: [
        { label: '생산 계획 (MES)', url: '/solutions/mes.html' },
        { label: '실시간 모니터링', url: '/solutions/monitoring.html' },
        { label: '도입 사례 더보기', url: '/customers/cases.html' },
        { label: '상담 신청', url: '#contact' },
      ],
    },
    en: {
      tabLabel: 'Hansung',
      category: 'MES',
      title: 'Production plans and results\nin one connected flow',
      description:
        'Digitally integrated work orders, output, and inventory on a high-mix assembly line — reducing spreadsheets and improving on-time delivery.',
      bullets: ['On-time delivery up 18 points', '70% faster output reporting'],
      mockTitle: 'Production',
      mockStats: [
        { value: '94%', label: 'Uptime' },
        { value: '1,284', label: 'Output' },
      ],
      links: [
        { label: 'Production (MES)', url: '/solutions/mes.html' },
        { label: 'Live Monitoring', url: '/solutions/monitoring.html' },
        { label: 'More case studies', url: '/customers/cases.html' },
        { label: 'Contact us', url: '#contact' },
      ],
    },
  },
  {
    slug: 'daeyang',
    sortOrder: 2,
    ko: {
      tabLabel: '대양정밀',
      category: 'QMS',
      title: '불량 데이터를\n추적 가능한 품질 관리로',
      description:
        '검사·불량·시정조치 이력을 공정별로 연결했습니다. 반복 불량 패턴을 분석해 근본 원인을 빠르게 찾습니다.',
      bullets: ['불량률 42% 감소', '품질 리포트 작성 시간 80% 단축'],
      mockTitle: '품질 분석',
      mockStats: [
        { value: '0.8%', label: '불량률' },
        { value: '78%', label: '수율' },
      ],
      links: [
        { label: '품질 관리 (QMS)', url: '/solutions/qms.html' },
        { label: '전기 · 전자', url: '/industry/electric.html' },
        { label: '도입 사례 더보기', url: '/customers/cases.html' },
        { label: '상담 신청', url: '#contact' },
      ],
    },
    en: {
      tabLabel: 'Daeyang',
      category: 'QMS',
      title: 'Traceable quality management\nfor every defect',
      description:
        'Linked inspection, defect, and corrective action history by process — analyzing recurring patterns to find root causes faster.',
      bullets: ['42% defect reduction', '80% faster quality reporting'],
      mockTitle: 'Quality',
      mockStats: [
        { value: '0.8%', label: 'Defects' },
        { value: '78%', label: 'Yield' },
      ],
      links: [
        { label: 'Quality (QMS)', url: '/solutions/qms.html' },
        { label: 'Electric', url: '/industry/electric.html' },
        { label: 'More case studies', url: '/customers/cases.html' },
        { label: 'Contact us', url: '#contact' },
      ],
    },
  },
  {
    slug: 'jinwoo',
    sortOrder: 3,
    ko: {
      tabLabel: '진우테크',
      category: 'MONITORING',
      title: '설비 상태를\n실시간으로 한 화면에',
      description:
        '흩어진 PLC·센서 데이터를 통합 대시보드로 모았습니다. 이상 발생 전 알람으로 다운타임을 줄였습니다.',
      bullets: ['비계획 정지 35% 감소', '현장·사무실 동일 화면 제공'],
      mockTitle: '설비 모니터링',
      mockStats: [
        { value: 'LIVE', label: '실시간' },
        { value: '12', label: '라인' },
      ],
      links: [
        { label: '실시간 모니터링', url: '/solutions/monitoring.html' },
        { label: '설비 예지보전', url: '/solutions/predictive.html' },
        { label: '도입 사례 더보기', url: '/customers/cases.html' },
        { label: '상담 신청', url: '#contact' },
      ],
    },
    en: {
      tabLabel: 'Jinwoo',
      category: 'MONITORING',
      title: 'Every machine status\non one live screen',
      description:
        'Unified scattered PLC and sensor data into one dashboard — reducing downtime with pre-failure alerts.',
      bullets: ['35% fewer unplanned stops', 'Same view on floor and office'],
      mockTitle: 'Monitoring',
      mockStats: [
        { value: 'LIVE', label: 'Live' },
        { value: '12', label: 'Lines' },
      ],
      links: [
        { label: 'Live Monitoring', url: '/solutions/monitoring.html' },
        { label: 'Predictive Care', url: '/solutions/predictive.html' },
        { label: 'More case studies', url: '/customers/cases.html' },
        { label: 'Contact us', url: '#contact' },
      ],
    },
  },
  {
    slug: 'kmetal',
    sortOrder: 4,
    ko: {
      tabLabel: 'K-METAL',
      category: 'PREDICTIVE',
      title: '고장 전에\n미리 대응하는 예지보전',
      description:
        '진동·온도·전류 패턴을 분석해 설비 이상을 조기에 탐지합니다. 긴급 수리와 계획 정비 비용을 동시에 줄였습니다.',
      bullets: ['긴급 수리 건수 50% 감소', '설비 가동률 12%p 향상'],
      mockTitle: '예지보전',
      mockStats: [
        { value: '3', label: '경보' },
        { value: '96%', label: '정확도' },
      ],
      links: [
        { label: '설비 예지보전', url: '/solutions/predictive.html' },
        { label: '자동차', url: '/industry/automotive.html' },
        { label: '도입 사례 더보기', url: '/customers/cases.html' },
        { label: '상담 신청', url: '#contact' },
      ],
    },
    en: {
      tabLabel: 'K-METAL',
      category: 'PREDICTIVE',
      title: 'Predictive maintenance\nbefore breakdowns',
      description:
        'Early anomaly detection from vibration, temperature, and current patterns — cutting both emergency and planned maintenance costs.',
      bullets: ['50% fewer emergency repairs', 'Uptime up 12 points'],
      mockTitle: 'Predictive',
      mockStats: [
        { value: '3', label: 'Alerts' },
        { value: '96%', label: 'Accuracy' },
      ],
      links: [
        { label: 'Predictive Care', url: '/solutions/predictive.html' },
        { label: 'Automotive', url: '/industry/automotive.html' },
        { label: 'More case studies', url: '/customers/cases.html' },
        { label: 'Contact us', url: '#contact' },
      ],
    },
  },
  {
    slug: 'seojin',
    sortOrder: 5,
    ko: {
      tabLabel: '서진산업',
      category: 'SEMICONDUCTOR',
      title: '정밀 공정의\n추적성과 품질 관리',
      description:
        'Lot·장비·공정 이력을 완전하게 추적하고 수율 분석을 자동화했습니다. 이상 공정 탐지 시간을 크게 줄였습니다.',
      bullets: ['이상 공정 탐지 3.5배 빨라짐', '감사 대응 문서 자동 생성'],
      mockTitle: 'Lot 추적',
      mockStats: [
        { value: '100%', label: '추적' },
        { value: '92%', label: '수율' },
      ],
      links: [
        { label: '반도체', url: '/industry/semiconductor.html' },
        { label: '품질 관리 (QMS)', url: '/solutions/qms.html' },
        { label: '도입 사례 더보기', url: '/customers/cases.html' },
        { label: '상담 신청', url: '#contact' },
      ],
    },
    en: {
      tabLabel: 'Seojin',
      category: 'SEMICONDUCTOR',
      title: 'Traceability and quality\nfor precision processes',
      description:
        'Full lot, equipment, and process traceability with automated yield analysis — dramatically faster anomaly detection.',
      bullets: ['3.5x faster anomaly detection', 'Automated audit documentation'],
      mockTitle: 'Traceability',
      mockStats: [
        { value: '100%', label: 'Track' },
        { value: '92%', label: 'Yield' },
      ],
      links: [
        { label: 'Semiconductor', url: '/industry/semiconductor.html' },
        { label: 'Quality (QMS)', url: '/solutions/qms.html' },
        { label: 'More case studies', url: '/customers/cases.html' },
        { label: 'Contact us', url: '#contact' },
      ],
    },
  },
  {
    slug: 'nexonm',
    sortOrder: 6,
    ko: {
      tabLabel: '넥슨-M',
      category: 'INTEGRATION',
      title: '기존 ERP와\n현장 데이터 연결',
      description:
        'ERP·MES·설비 데이터를 API로 연결해 이중 입력을 없앴습니다. 경영진과 현장이 같은 숫자를 봅니다.',
      bullets: ['수기 입력 90% 제거', '데이터 집계 속도 3.5배 향상'],
      mockTitle: '데이터 통합',
      mockStats: [
        { value: 'ERP', label: '연동' },
        { value: 'MES', label: '연동' },
      ],
      links: [
        { label: '생산 계획 (MES)', url: '/solutions/mes.html' },
        { label: '실시간 모니터링', url: '/solutions/monitoring.html' },
        { label: '도입 사례 더보기', url: '/customers/cases.html' },
        { label: '상담 신청', url: '#contact' },
      ],
    },
    en: {
      tabLabel: 'Nexon-M',
      category: 'INTEGRATION',
      title: 'Connecting legacy ERP\nwith shop-floor data',
      description:
        'Connected ERP, MES, and machine data via API — eliminating double entry so management and the floor see the same numbers.',
      bullets: ['90% less manual entry', '3.5x faster data aggregation'],
      mockTitle: 'Integration',
      mockStats: [
        { value: 'ERP', label: 'Sync' },
        { value: 'MES', label: 'Sync' },
      ],
      links: [
        { label: 'Production (MES)', url: '/solutions/mes.html' },
        { label: 'Live Monitoring', url: '/solutions/monitoring.html' },
        { label: 'More case studies', url: '/customers/cases.html' },
        { label: 'Contact us', url: '#contact' },
      ],
    },
  },
  {
    slug: 'samhwa',
    sortOrder: 7,
    ko: {
      tabLabel: '삼화기계',
      category: 'MACHINERY',
      title: '기계 부품 생산\n전 과정 디지털화',
      description:
        '가공·조립·검사 공정의 데이터를 실시간으로 연결했습니다. BOM 변경과 라인 전환에도 빠르게 대응합니다.',
      bullets: ['라인 전환 시간 40% 단축', '부품 추적성 100% 확보'],
      mockTitle: '공정 관리',
      mockStats: [
        { value: '5', label: '공정' },
        { value: '88%', label: '효율' },
      ],
      links: [
        { label: '전기 · 전자', url: '/industry/electric.html' },
        { label: '생산 계획 (MES)', url: '/solutions/mes.html' },
        { label: '도입 사례 더보기', url: '/customers/cases.html' },
        { label: '상담 신청', url: '#contact' },
      ],
    },
    en: {
      tabLabel: 'Samhwa',
      category: 'MACHINERY',
      title: 'Digitalizing the full\nparts production cycle',
      description:
        'Connected machining, assembly, and inspection data in real time — adapting quickly to BOM changes and line switches.',
      bullets: ['40% faster line changeovers', '100% part traceability'],
      mockTitle: 'Process',
      mockStats: [
        { value: '5', label: 'Steps' },
        { value: '88%', label: 'Efficiency' },
      ],
      links: [
        { label: 'Electric', url: '/industry/electric.html' },
        { label: 'Production (MES)', url: '/solutions/mes.html' },
        { label: 'More case studies', url: '/customers/cases.html' },
        { label: 'Contact us', url: '#contact' },
      ],
    },
  },
  {
    slug: 'kparts',
    sortOrder: 8,
    ko: {
      tabLabel: '한국부품',
      category: 'AUTOMOTIVE',
      title: '자동차 부품\n품질 기준 충족',
      description:
        '부품 추적과 조립 이력을 체계적으로 관리합니다. OEM·Tier 협력사 요구사항에 맞는 리포트를 자동으로 제공합니다.',
      bullets: ['OEM 감사 대응 시간 60% 단축', '조립 이력 100% 디지털화'],
      mockTitle: '부품 추적',
      mockStats: [
        { value: 'ISO', label: '인증' },
        { value: '0', label: '리콜' },
      ],
      links: [
        { label: '자동차', url: '/industry/automotive.html' },
        { label: '품질 관리 (QMS)', url: '/solutions/qms.html' },
        { label: '도입 사례 더보기', url: '/customers/cases.html' },
        { label: '상담 신청', url: '#contact' },
      ],
    },
    en: {
      tabLabel: 'K-Parts',
      category: 'AUTOMOTIVE',
      title: 'Meeting automotive\nquality standards',
      description:
        'Systematic part traceability and assembly history — with automated reports aligned to OEM and Tier supplier requirements.',
      bullets: ['60% faster OEM audit prep', '100% digital assembly history'],
      mockTitle: 'Traceability',
      mockStats: [
        { value: 'ISO', label: 'Cert' },
        { value: '0', label: 'Recall' },
      ],
      links: [
        { label: 'Automotive', url: '/industry/automotive.html' },
        { label: 'Quality (QMS)', url: '/solutions/qms.html' },
        { label: 'More case studies', url: '/customers/cases.html' },
        { label: 'Contact us', url: '#contact' },
      ],
    },
  },
];

export const HOME = {
  ko: {
    eyebrow: 'IT × 제조 소프트웨어 파트너',
    heroTitle: '복잡한 제조 현장을,\n누구나 쓸 수 있게',
    heroSubtitle: '어려운 기술은 우리가 다룹니다.\n현장은 그저, 더 쉽게 일하면 됩니다.',
    heroTrust: '이미 120+ 제조 현장이 AIAN과 함께합니다',
    ctaPrimary: '무료로 시작하기',
    ctaSecondary: '어떻게 작동하나요?',
    statementLine1: '현장의 데이터는 넘쳐나는데,',
    statementMuted: '정작 쓸 수 있는 건 없습니다.',
    howLabel: 'WHAT WE BUILD',
    howTitle: '어려운 기술,\n쉬운 화면 하나로',
    howLead: '제조에 필요한 소프트웨어를 한 곳에서. 쓰지 않을 기능은 만들지 않습니다.',
    productsLabel: 'PRODUCTS',
    productsTitle: '3가지 핵심 제품',
    productsLead: '현장에 바로 적용하는 AIAN의 대표 솔루션입니다.',
    showcaseTitle: 'AIAN의 솔루션으로 이뤄낸\n성과를 보여드립니다',
    contactTitle: '현장의 문제,\n같이 풀어요',
    contactLead: '30분 무료 진단으로 시작하세요. 부담은 0, 인사이트는 가득.',
    features: [
      {
        tag: '실시간 모니터링',
        title: '설비 상태를\n한눈에 봅니다',
        description: '흩어진 센서 데이터를 하나의 화면으로. 이상이 생기기 전에 먼저 알려드립니다.',
        bullets: ['설비별 가동률 실시간 집계', '이상 발생 시 즉시 알림', '모바일에서도 동일하게'],
        visual: 'pills',
      },
      {
        tag: '품질 관리',
        title: '불량을\n데이터로 잡습니다',
        description: '언제, 어디서, 왜 불량이 났는지. 원인을 추적해 다음 불량을 막습니다.',
        bullets: ['불량 원인 자동 분석', '공정별 품질 리포트'],
        visual: 'gauge',
      },
      {
        tag: '생산 계획',
        title: '계획부터 실적까지\n끊김 없이',
        description: '주문이 들어오면 자동으로 계획이 섭니다. 현장 실적은 실시간으로 반영됩니다.',
        bullets: ['주문 → 계획 자동 생성', '실적 실시간 반영'],
        visual: 'bars',
      },
    ],
  },
  en: {
    eyebrow: 'IT × Manufacturing Software Partner',
    heroTitle: 'Complex factories,\nmade simple for everyone',
    heroSubtitle: 'We handle the hard technology.\nYour team just works, more easily.',
    heroTrust: 'Already trusted by 120+ factories',
    ctaPrimary: 'Start for free',
    ctaSecondary: 'How it works',
    statementLine1: 'Data piles up on the floor,',
    statementMuted: 'yet none of it is usable.',
    howLabel: 'WHAT WE BUILD',
    howTitle: 'Hard tech,\none simple screen',
    howLead: 'Every tool your factory needs, in one place. We never build features you won\'t use.',
    productsLabel: 'PRODUCTS',
    productsTitle: 'Three core products',
    productsLead: 'AIAN\'s flagship solutions, ready for your factory floor.',
    showcaseTitle: 'Results achieved with\nAIAN solutions',
    contactTitle: 'Let\'s solve it,\ntogether',
    contactLead: 'Start with a free 30-minute diagnosis. Zero pressure, full insight.',
    features: [
      {
        tag: 'Live Monitoring',
        title: 'See every machine\nat a glance',
        description: 'Scattered sensor data on a single screen. We notify you before problems arise.',
        bullets: ['Real-time uptime per machine', 'Instant anomaly alerts', 'Same view on mobile'],
        visual: 'pills',
      },
      {
        tag: 'Quality',
        title: 'Catch defects\nwith data',
        description: 'When, where, and why defects happen. We trace the cause to prevent the next.',
        bullets: ['Automated root-cause analysis', 'Per-process quality reports'],
        visual: 'gauge',
      },
      {
        tag: 'Planning',
        title: 'From plan to output,\nwithout gaps',
        description: 'Orders generate plans automatically. Floor results sync in real time.',
        bullets: ['Order → plan automation', 'Live results sync'],
        visual: 'bars',
      },
    ],
  },
};

export const MARQUEE = [
  'NEXON-M',
  'HANSUNG',
  'DAEYANG',
  'JINWOO',
  'K-METAL',
  'SEOJIN',
];

export const ABOUT_INTRO = {
  ko: {
    label: 'AIAN 소개',
    title: '제조 현장을 잇는\n가장 쉬운 방법',
    lead: 'IT와 제조를 연결해, 누구나 쓸 수 있는 소프트웨어를 만듭니다.',
    cards: [
      {
        title: '우리가 하는 일',
        body: '복잡한 제조 현장을, 누구나 쓸 수 있는 소프트웨어로 바꿉니다. 모니터링·품질·생산계획까지 하나의 흐름으로 연결합니다.',
      },
      {
        title: '미션',
        body: '현장의 언어로 소프트웨어를 만들고, 데이터로 제조 현장이 스스로 개선되게 합니다.',
      },
      {
        title: '핵심 가치',
        body: '현장 우선 · 단순함 · 함께 성장. 기술보다 현장의 변화를 먼저 생각합니다.',
      },
      {
        title: '함께하는 현장',
        body: '120개 이상의 제조 현장과 함께하며, 중소·중견 제조사의 디지털 전환을 돕고 있습니다.',
      },
    ],
  },
  en: {
    label: 'About AIAN',
    title: 'The easiest way to\nconnect the factory floor',
    lead: 'Connecting IT and manufacturing with software anyone can use.',
    cards: [
      {
        title: 'What we do',
        body: 'We turn complex factory floors into software anyone can use — connecting monitoring, quality, and planning in one flow.',
      },
      {
        title: 'Mission',
        body: 'Build software in the language of the floor, so factories improve themselves with data.',
      },
      {
        title: 'Core Values',
        body: 'Floor first · Simplicity · Grow together. We measure success by change on the floor.',
      },
      {
        title: 'On the floor',
        body: 'Working with 120+ manufacturing sites to help SMB manufacturers go digital.',
      },
    ],
  },
};

export const ABOUT_LOCATION = {
  ko: {
    label: 'LOCATION',
    title: '오시는 길',
    mapLinkLabel: '네이버 지도에서 크게 보기',
  },
  en: {
    label: 'LOCATION',
    title: 'Visit AIAN',
    mapLinkLabel: 'Open in Naver Map',
  },
  mapEmbedUrl: 'https://map.naver.com/p/embed/place/17473457',
  mapLinkUrl: 'https://map.naver.com/p/entry/place/17473457',
};
