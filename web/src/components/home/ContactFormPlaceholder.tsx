"use client";

export function ContactFormPlaceholder({
  locale,
  label,
}: {
  locale: "ko" | "en";
  label: string;
}) {
  return (
    <form
      className="form reveal d2"
      onSubmit={(e) => {
        e.preventDefault();
        alert(locale === "ko" ? "문의가 접수되었습니다." : "Thanks! We will get back to you.");
      }}
    >
      <p style={{ color: "#aeb8c9", marginBottom: 16 }}>
        {locale === "ko"
          ? "CMS POC — 문의 폼은 추후 연동 예정입니다."
          : "CMS POC — contact form integration coming soon."}
      </p>
      <button type="submit" className="btn btn-primary">
        {label}
      </button>
    </form>
  );
}
