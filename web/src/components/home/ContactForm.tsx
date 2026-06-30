"use client";

import { scrollToId } from "@/components/SiteScripts";
import type { Locale } from "@/lib/strapi";

type Props = {
  locale: Locale;
};

export function ContactForm({ locale }: Props) {
  const t = (ko: string, en: string) => (locale === "ko" ? ko : en);

  return (
    <form
      className="form reveal d2"
      onSubmit={(e) => {
        e.preventDefault();
        alert(t("문의가 접수되었습니다. 곧 연락드릴게요!", "Thanks! We'll get back to you shortly."));
        e.currentTarget.reset();
      }}
    >
      <div className="frow">
        <div className="field">
          <label>{t("이름", "Name")}</label>
          <input type="text" required placeholder={t("홍길동", "John Doe")} />
        </div>
        <div className="field">
          <label>{t("회사명", "Company")}</label>
          <input type="text" placeholder={t("(주)예시", "Acme Inc.")} />
        </div>
      </div>
      <div className="frow">
        <div className="field">
          <label>{t("이메일", "Email")}</label>
          <input type="email" required placeholder="you@company.com" />
        </div>
        <div className="field">
          <label>{t("연락처", "Phone")}</label>
          <input type="tel" placeholder={t("010-0000-0000", "+82 10-0000-0000")} />
        </div>
      </div>
      <div className="field full">
        <label>{t("관심 솔루션", "Interested in")}</label>
        <select defaultValue="monitoring">
          <option value="monitoring">{t("실시간 모니터링", "Live Monitoring")}</option>
          <option value="qms">{t("품질 관리 (QMS)", "Quality (QMS)")}</option>
          <option value="mes">{t("생산 계획 (MES)", "Production (MES)")}</option>
          <option value="predictive">{t("설비 예지보전", "Predictive Care")}</option>
          <option value="other">{t("기타 / 컨설팅", "Other / Consulting")}</option>
        </select>
      </div>
      <div className="field full">
        <label>{t("문의 내용", "Message")}</label>
        <textarea placeholder={t("현재 겪고 계신 문제를 적어주세요.", "Tell us what you're struggling with.")} />
      </div>
      <button type="submit" className="btn btn-primary">
        {t("문의 보내기", "Send message")}
      </button>
      <div className="agree">
        {t(
          "제출 시 개인정보처리방침에 동의하는 것으로 간주됩니다.",
          "By submitting, you agree to our privacy policy.",
        )}
      </div>
    </form>
  );
}

export function HeroCta({ locale, primary, secondary }: { locale: Locale; primary: string; secondary: string }) {
  return (
    <div className="cta-row reveal d3">
      <button type="button" className="btn btn-primary" onClick={() => scrollToId("contact")}>
        {primary}
      </button>
      <button type="button" className="btn btn-ghost" onClick={() => scrollToId("how")}>
        {secondary}
      </button>
    </div>
  );
}
