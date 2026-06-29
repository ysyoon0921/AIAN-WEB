#!/usr/bin/env python3
"""Generate Solutions / Industry / Customers / About sub-pages with shared layout."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUILD = "20250629-menu-v2"

NAV = [
    {
        "id": "solutions",
        "en": "Solutions",
        "ko": "솔루션",
        "home": "solutions/monitoring.html",
        "side_en": "Solutions",
        "side_ko": "솔루션",
        "items": [
            ("monitoring.html", "실시간 모니터링", "Live Monitoring"),
            ("qms.html", "품질 관리 (QMS)", "Quality (QMS)"),
            ("mes.html", "생산 계획 (MES)", "Production (MES)"),
            ("predictive.html", "설비 예지보전", "Predictive Care"),
        ],
    },
    {
        "id": "industry",
        "en": "Industry",
        "ko": "산업분야",
        "home": "industry/electric.html",
        "side_en": "Industry",
        "side_ko": "산업분야",
        "items": [
            ("electric.html", "전기 · 전자", "Electric · Electronic"),
            ("semiconductor.html", "반도체", "Semiconductor"),
            ("automotive.html", "자동차", "Automotive"),
        ],
    },
    {
        "id": "customers",
        "en": "Customers",
        "ko": "고객사례",
        "home": "customers/clients.html",
        "side_en": "Customers",
        "side_ko": "고객사례",
        "items": [
            ("clients.html", "고객사", "Clients"),
            ("cases.html", "도입 사례", "Case Studies"),
        ],
    },
    {
        "id": "about",
        "en": "About",
        "ko": "회사소개",
        "home": "about/intro.html",
        "side_en": "About",
        "side_ko": "회사소개",
        "items": [
            ("intro.html", "AIAN 소개", "About AIAN"),
            ("ceo.html", "CEO", "CEO", True),
            ("history.html", "회사 연혁", "History"),
            ("location.html", "Location", "Location", True),
        ],
    },
]

PAGES = {
    "solutions/monitoring.html": {
        "section": "solutions",
        "title": "실시간 모니터링",
        "label": "SOLUTIONS",
        "h1_ko": "설비 상태를<br>한눈에 봅니다",
        "h1_en": "See every machine<br>at a glance",
        "lead_ko": "흩어진 센서 데이터를 하나의 화면으로. 이상이 생기기 전에 먼저 알려드립니다.",
        "lead_en": "Scattered sensor data on a single screen. We notify you before problems arise.",
        "body_ko": [
            "라인별 가동률, 설비 상태, 알람 이력을 실시간으로 집계합니다.",
            "현장·사무실·모바일에서 동일한 화면으로 확인할 수 있습니다.",
        ],
        "body_en": [
            "Aggregate uptime, machine status, and alerts in real time.",
            "Same view on the floor, in the office, and on mobile.",
        ],
    },
    "solutions/qms.html": {
        "section": "solutions",
        "title": "품질 관리 (QMS)",
        "label": "SOLUTIONS",
        "h1_ko": "불량을 줄이는<br>품질 관리",
        "h1_en": "Quality management<br>that cuts defects",
        "lead_ko": "검사·불량·시정조치 데이터를 한곳에서 관리합니다.",
        "lead_en": "Manage inspection, defect, and corrective action data in one place.",
        "body_ko": [
            "공정별 품질 지표를 자동으로 수집하고 추적합니다.",
            "반복 불량 패턴을 분석해 근본 원인을 찾습니다.",
        ],
        "body_en": [
            "Automatically collect and track quality metrics by process.",
            "Analyze recurring defect patterns to find root causes.",
        ],
    },
    "solutions/mes.html": {
        "section": "solutions",
        "title": "생산 계획 (MES)",
        "label": "SOLUTIONS",
        "h1_ko": "생산 계획과<br>실적을 연결",
        "h1_en": "Connect production<br>plans to results",
        "lead_ko": "계획·지시·실적·재고를 하나의 흐름으로 이어줍니다.",
        "lead_en": "Link planning, orders, output, and inventory in one flow.",
        "body_ko": [
            "작업 지시부터 완료 보고까지 디지털로 처리합니다.",
            "납기·수율·병목을 한 화면에서 확인합니다.",
        ],
        "body_en": [
            "Handle work orders through completion digitally.",
            "See delivery, yield, and bottlenecks on one screen.",
        ],
    },
    "solutions/predictive.html": {
        "section": "solutions",
        "title": "설비 예지보전",
        "label": "SOLUTIONS",
        "h1_ko": "고장 전에<br>미리 대응",
        "h1_en": "Act before<br>breakdowns",
        "lead_ko": "설비 데이터로 고장 징후를 감지하고 보전 일정을 최적화합니다.",
        "lead_en": "Detect failure signs from machine data and optimize maintenance.",
        "body_ko": [
            "진동·온도·전류 패턴을 분석해 이상을 조기에 탐지합니다.",
            "계획 정비와 긴급 수리 비용을 동시에 줄입니다.",
        ],
        "body_en": [
            "Analyze vibration, temperature, and current to catch anomalies early.",
            "Reduce both planned maintenance and emergency repair costs.",
        ],
    },
    "industry/electric.html": {
        "section": "industry",
        "title": "전기 · 전자",
        "label": "INDUSTRY",
        "h1_ko": "전기 · 전자<br>제조 현장",
        "h1_en": "Electric &amp;<br>electronic manufacturing",
        "lead_ko": "다품종 소량 생산에 맞춘 유연한 현장 관리.",
        "lead_en": "Flexible shop-floor management for high-mix production.",
        "body_ko": [
            "조립·검사·출하 공정의 데이터를 실시간으로 연결합니다.",
            "BOM 변경과 라인 전환에도 빠르게 대응합니다.",
        ],
        "body_en": [
            "Connect assembly, inspection, and shipping data in real time.",
            "Adapt quickly to BOM changes and line switches.",
        ],
    },
    "industry/semiconductor.html": {
        "section": "industry",
        "title": "반도체",
        "label": "INDUSTRY",
        "h1_ko": "반도체<br>제조 솔루션",
        "h1_en": "Semiconductor<br>manufacturing",
        "lead_ko": "정밀 공정에 필요한 추적성과 품질 관리.",
        "lead_en": "Traceability and quality control for precision processes.",
        "body_ko": [
            "Lot·장비·공정 이력을 완전하게 추적합니다.",
            "수율 분석과 이상 공정 탐지를 자동화합니다.",
        ],
        "body_en": [
            "Full traceability across lots, equipment, and processes.",
            "Automate yield analysis and anomaly detection.",
        ],
    },
    "industry/automotive.html": {
        "section": "industry",
        "title": "자동차",
        "label": "INDUSTRY",
        "h1_ko": "자동차<br>부품 · 완성차",
        "h1_en": "Automotive<br>parts &amp; assembly",
        "lead_ko": "엄격한 품질 기준을 충족하는 생산 관리.",
        "lead_en": "Production management that meets strict quality standards.",
        "body_ko": [
            "부품 추적과 조립 이력을 체계적으로 관리합니다.",
            "OEM·Tier 협력사 요구사항에 맞는 리포트를 제공합니다.",
        ],
        "body_en": [
            "Systematically manage part traceability and assembly history.",
            "Reports aligned with OEM and Tier supplier requirements.",
        ],
    },
    "customers/clients.html": {
        "section": "customers",
        "title": "고객사",
        "label": "CUSTOMERS",
        "h1_ko": "함께하는<br>제조 기업",
        "h1_en": "Manufacturers<br>we work with",
        "lead_ko": "120개 이상의 제조 현장이 AIAN과 함께합니다.",
        "lead_en": "120+ manufacturing sites trust AIAN.",
        "body_ko": [
            "전기·전자, 반도체, 자동차, 기계 부품 등 다양한 산업군의 고객사가 있습니다.",
            "중소·중견 제조사부터 글로벌 기업까지 폭넓게 지원합니다.",
        ],
        "body_en": [
            "Clients span electronics, semiconductors, automotive, and machinery.",
            "From SMB manufacturers to global enterprises.",
        ],
    },
    "customers/cases.html": {
        "section": "customers",
        "title": "도입 사례",
        "label": "CUSTOMERS",
        "h1_ko": "현장에서 검증된<br>도입 사례",
        "h1_en": "Proven results<br>on the floor",
        "lead_ko": "실제 제조 현장에서 달성한 성과를 소개합니다.",
        "lead_en": "Results achieved on real factory floors.",
        "body_ko": [
            "가동률 향상, 불량률 감소, 데이터 집계 시간 단축 등 구체적 성과가 있습니다.",
            "도입 과정과 현장 피드백을 함께 공유합니다.",
        ],
        "body_en": [
            "Concrete gains in uptime, defect reduction, and data aggregation speed.",
            "We share the rollout process and on-site feedback.",
        ],
    },
    "about/intro.html": {
        "section": "about",
        "title": "AIAN 소개",
        "label": '<span data-ko>AIAN 소개</span><span data-en>About AIAN</span>',
        "h1_ko": "제조 현장을 잇는<br>가장 쉬운 방법",
        "h1_en": "The easiest way to<br>connect the factory floor",
        "lead_ko": "IT와 제조를 연결해, 누구나 쓸 수 있는 소프트웨어를 만듭니다.",
        "lead_en": "Connecting IT and manufacturing with software anyone can use.",
        "extra": '''<div class="intro-cards">
          <div class="intro-card"><h3><span data-ko>우리가 하는 일</span><span data-en>What we do</span></h3><p><span data-ko>복잡한 제조 현장을, 누구나 쓸 수 있는 소프트웨어로 바꿉니다. 모니터링·품질·생산계획까지 하나의 흐름으로 연결합니다.</span><span data-en>We turn complex factory floors into software anyone can use — connecting monitoring, quality, and planning in one flow.</span></p></div>
          <div class="intro-card"><h3><span data-ko>미션</span><span data-en>Mission</span></h3><p><span data-ko>현장의 언어로 소프트웨어를 만들고, 데이터로 제조 현장이 스스로 개선되게 합니다.</span><span data-en>Build software in the language of the floor, so factories improve themselves with data.</span></p></div>
          <div class="intro-card"><h3><span data-ko>핵심 가치</span><span data-en>Core Values</span></h3><p><span data-ko>현장 우선 · 단순함 · 함께 성장. 기술보다 현장의 변화를 먼저 생각합니다.</span><span data-en>Floor first · Simplicity · Grow together. We measure success by change on the floor.</span></p></div>
          <div class="intro-card"><h3><span data-ko>함께하는 현장</span><span data-en>On the floor</span></h3><p><span data-ko>120개 이상의 제조 현장과 함께하며, 중소·중견 제조사의 디지털 전환을 돕고 있습니다.</span><span data-en>Working with 120+ manufacturing sites to help SMB manufacturers go digital.</span></p></div>
        </div>''',
    },
    "about/ceo.html": {
        "section": "about",
        "title": "CEO",
        "label": '<span data-ko>CEO 메세지</span><span data-en>CEO Message</span>',
        "h1_ko": "현장에서 시작한<br>기술의 힘",
        "h1_en": "Technology born<br>on the factory floor",
        "lead_ko": "제조 현장의 언어로 소프트웨어를 만듭니다.",
        "lead_en": "We build software in the language of the factory floor.",
        "extra": '''<div class="ceo-grid"><div class="ceo-photo"><img src="../assets/ceo-kim.jpg" alt="김순태 CEO" /></div><div>
          <div class="ceo-name"><span data-ko>김순태</span><span data-en>Soon-tae Kim</span></div>
          <div class="ceo-role"><span data-ko>대표이사 / CEO</span><span data-en>Chief Executive Officer</span></div>
          <p><span data-ko>AIAN은 현장에서 일해본 사람들이 만든 회사입니다. 복잡한 기술을 현장 누구나 쓸 수 있는 형태로 바꾸는 것이 우리의 목표입니다.</span><span data-en>AIAN was founded by people from the factory floor. Our goal is to make complex technology usable by everyone on site.</span></p>
          <p><span data-ko>120개 이상의 제조 현장과 함께하며, IT와 제조를 잇는 가장 쉬운 방법을 만들어가고 있습니다.</span><span data-en>Working with 120+ manufacturing sites, we build the easiest way to connect IT and manufacturing.</span></p>
        </div></div>''',
    },
    "about/history.html": {
        "section": "about",
        "title": "회사 연혁",
        "label": "HISTORY",
        "h1_ko": "AIAN의<br>발자취",
        "h1_en": "Our<br>journey",
        "lead_ko": "현장에서 시작해, 제조 소프트웨어로 성장해 왔습니다.",
        "lead_en": "From the factory floor to manufacturing software.",
        "extra": '''<div class="tl">
          <div class="tl-item"><div class="yr">2024</div><h4><span data-ko>120+ 현장 돌파</span><span data-en>120+ sites</span></h4><p><span data-ko>국내 제조 현장 120곳 이상에 솔루션을 도입했습니다.</span><span data-en>Deployed solutions to 120+ domestic manufacturing sites.</span></p></div>
          <div class="tl-item"><div class="yr">2022</div><h4><span data-ko>본격 SaaS 전환</span><span data-en>SaaS launch</span></h4><p><span data-ko>클라우드 기반 MES·QMS 서비스를 출시했습니다.</span><span data-en>Launched cloud-based MES and QMS services.</span></p></div>
          <div class="tl-item"><div class="yr">2020</div><h4><span data-ko>AIAN 설립</span><span data-en>Founded</span></h4><p><span data-ko>제조 현장 IT 연결을 목표로 회사를 설립했습니다.</span><span data-en>Founded to connect IT with the factory floor.</span></p></div>
        </div>''',
    },
    "about/location.html": {
        "section": "about",
        "title": "Location",
        "label": "LOCATION",
        "h1_ko": "오시는 길",
        "h1_en": "Visit AIAN",
        "hide_lead": True,
        "extra": '''<div class="location-map">
          <iframe class="naver-map-embed" title="전북대학교 공과대학 5호관" src="https://map.naver.com/p/embed/place/17473457" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <a class="map-open-link" href="https://map.naver.com/p/entry/place/17473457" target="_blank" rel="noopener noreferrer"><span data-ko>네이버 지도에서 크게 보기</span><span data-en>Open in Naver Map</span></a>''',
    },
}


def span(ko, en, plain=False):
    if plain and ko == en:
        return ko
    return f'<span data-ko>{ko}</span><span data-en>{en}</span>'


def nav_html(active_section):
    parts = ['<ul class="menu">']
    for sec in NAV:
        on = ' on' if sec["id"] == active_section else ""
        parts.append(f'      <li class="nav-item">')
        parts.append(f'        <a class="top{on}" href="../{sec["home"]}"><span class="en">{sec["en"]}</span><span class="ko">{sec["ko"]}</span></a>')
        parts.append('        <div class="drop">')
        for item in sec["items"]:
            fname, ko, en, *rest = item
            plain = rest[0] if rest else False
            parts.append(f'          <a href="../{sec["id"]}/{fname}">{span(ko, en, plain)}</a>')
        parts.append('        </div>')
        parts.append('      </li>')
    parts.append('    </ul>')
    return "\n".join(parts)


def sidebar_html(section_id, current_file):
    sec = next(s for s in NAV if s["id"] == section_id)
    lines = [
        f'      <div class="side-head"><span data-ko>{sec["side_ko"]}</span><span data-en>{sec["side_en"]}</span></div>',
        '      <div class="side-nav">',
    ]
    if section_id == "about":
        lines.append('        <!-- aian-about-menu-v2 -->')
    for item in sec["items"]:
        fname, ko, en, *rest = item
        plain = rest[0] if rest else False
        on = ' class="on"' if fname == current_file else ""
        lines.append(f'        <a href="{fname}"{on}>{span(ko, en, plain)}</a>')
    lines.append('      </div>')
    return "\n".join(lines)


def footer_html():
    cols = []
    for sec in NAV:
        links = "".join(
            f'<a href="../{sec["id"]}/{item[0]}">{span(item[1], item[2], item[3] if len(item) > 3 else False)}</a>'
            for item in sec["items"]
        )
        cols.append(
            f'      <div class="foot-col"><h5>{span(sec["side_ko"], sec["side_en"])}</h5>{links}</div>'
        )
    return f'''<footer><div class="wrap"><div class="foot-grid">
      <div><a class="logo" href="../index.html"><img class="logo-mark" src="../assets/aian-mark.png" alt="" /><img class="logo-wordmark" src="../assets/aian-wordmark.png" alt="AIAN" /></a>
      <p><span data-ko>IT와 제조를 잇는 소프트웨어 파트너.</span><span data-en>The software partner connecting IT and manufacturing.</span></p></div>
{chr(10).join(cols)}
      <div class="foot-col"><h5><span data-ko>문의</span><span data-en>Contact</span></h5><a href="../index.html#contact"><span data-ko>상담 신청</span><span data-en>Get in touch</span></a><a href="mailto:hello@aian.kr">hello@aian.kr</a></div>
    </div><div class="foot-bottom"><span>© 2026 AIAN Inc.</span></div></div></footer>'''


def body_html(page):
    if page.get("extra"):
        return page["extra"]
    paras = []
    for ko, en in zip(page.get("body_ko", []), page.get("body_en", [])):
        paras.append(f'        <p><span data-ko>{ko}</span><span data-en>{en}</span></p>')
    return "\n".join(paras)


def render(rel_path, page):
    section = page["section"]
    fname = Path(rel_path).name
    sec = next(s for s in NAV if s["id"] == section)
    folder = section

    lead_block = ""
    if not page.get("hide_lead"):
        lead_block = f'      <p class="lead"><span data-ko>{page["lead_ko"]}</span><span data-en>{page["lead_en"]}</span></p>\n'

    html = f'''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta name="aian-build" content="{BUILD}" />
<title>{page["title"]} — AIAN</title>
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
<link rel="stylesheet" href="../assets/nav.css?v={BUILD}" />
<link rel="stylesheet" href="../assets/subpage.css?v={BUILD}" />
</head>
<body>
<div id="build-badge" style="position:fixed;bottom:10px;right:10px;z-index:9999;background:#0a1020;color:#fff;font-size:11px;font-weight:700;padding:6px 10px;border-radius:6px;opacity:.85;pointer-events:none;">ABOUT {BUILD}</div>
<nav id="nav" data-theme="light">
  <div class="nav-inner">
    <a class="logo" href="../index.html" aria-label="AIAN">
      <img class="logo-mark" src="../assets/aian-mark.png" alt="" />
      <img class="logo-wordmark" src="../assets/aian-wordmark.png" alt="AIAN" />
    </a>
{nav_html(section)}
    <div class="nav-right">
      <div class="lang">
        <button id="lang-ko" class="on" onclick="setLang('ko')">KO</button>
        <button id="lang-en" onclick="setLang('en')">EN</button>
      </div>
      <a class="nav-cta" href="../index.html#contact"><span data-ko>상담 신청</span><span data-en>CONTACT US</span></a>
    </div>
  </div>
</nav>

<main class="page">
  <div class="page-inner">
    <aside class="side">
{sidebar_html(section, fname)}
    </aside>
    <div class="content">
      <div class="label">{page["label"]}</div>
      <h1><span data-ko>{page["h1_ko"]}</span><span data-en>{page["h1_en"]}</span></h1>
{lead_block}{body_html(page)}
    </div>
  </div>
</main>
{footer_html()}
<script src="../assets/subpage.js?v={BUILD}"></script>
</body>
</html>
'''
    out = ROOT / folder / fname
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print("wrote", out.relative_to(ROOT))


def main():
    for rel, page in PAGES.items():
        render(rel, page)

    for sec in NAV:
        idx = ROOT / sec["id"] / "index.html"
        first = sec["items"][0][0]
        idx.write_text(
            f'<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url={first}"></head><body></body></html>',
            encoding="utf-8",
        )
        print("wrote", idx.relative_to(ROOT))


if __name__ == "__main__":
    main()
