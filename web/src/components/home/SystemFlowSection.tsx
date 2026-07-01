"use client";

import { useEffect, useRef } from "react";
import { formatMultiline } from "@/lib/format";
import type { HomePage, Locale } from "@/lib/strapi";
import { prefersReducedMotion, twSplit, twType } from "@/lib/typewriter";

type Props = {
  locale: Locale;
  home: HomePage;
};

type FlowNode = {
  label: string;
  role: "source" | "module" | "hub" | "interface";
  i: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  cx: number;
  cy: number;
  phase: number;
  freq: number;
  amp: number;
};

function flowProblemLead(locale: Locale) {
  return locale === "ko"
    ? "시스템도, 데이터도 이미 충분합니다. 다만 서로 이어져 있지 않을 뿐입니다."
    : "You already have the systems and the data — they're just not connected.";
}

export function SystemFlowSection({ locale, home }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);
  const howLines = formatMultiline(home.howTitle);

  useEffect(() => {
    const cv = canvasRef.current;
    const scene = sceneRef.current;
    const txtProblem = problemRef.current;
    const txtBuild = buildRef.current;
    if (!cv || !scene || !txtProblem || !txtBuild) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = prefersReducedMotion();
    const pCaret = txtProblem.querySelector(".code-caret") as HTMLElement | null;
    const bCaret = txtBuild.querySelector(".code-caret") as HTMLElement | null;
    const pH2 = txtProblem.querySelector("h2");
    const bH2 = txtBuild.querySelector("h2");
    if (!pH2 || !bH2) return;

    const pChars = twSplit(pH2);
    const bChars = twSplit(bH2);
    let typedP = false;
    let typedB = false;

    let W = 0;
    let H = 0;
    let DPR = 1;
    const sources = ["PostgreSQL", "REST API", "ERP", "CRM", "Kafka", "S3", "Webhook", "Sensor"];
    const modules = ["ML Model", "Vector DB", "Auth", "Pipeline"];
    let nodes: FlowNode[] = [];

    const hash = (i: number) => {
      const x = Math.sin(i * 127.1 + 11.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const build = () => {
      nodes = [];
      sources.forEach((label, i) => nodes.push({ label, role: "source", i, sx: 0, sy: 0, tx: 0, ty: 0, cx: 0, cy: 0, phase: 0, freq: 0, amp: 0 }));
      modules.forEach((label, i) => nodes.push({ label, role: "module", i, sx: 0, sy: 0, tx: 0, ty: 0, cx: 0, cy: 0, phase: 0, freq: 0, amp: 0 }));
      nodes.push({ label: "AIAN", role: "hub", i: 0, sx: 0, sy: 0, tx: 0, ty: 0, cx: 0, cy: 0, phase: 0, freq: 0, amp: 0 });
      nodes.push({ label: "Dashboard", role: "interface", i: 0, sx: 0, sy: 0, tx: 0, ty: 0, cx: 0, cy: 0, phase: 0, freq: 0, amp: 0 });

      const narrow = W < 820;
      const hx = narrow ? 0.5 * W : 0.7 * W;
      const hy = narrow ? 0.58 * H : 0.46 * H;
      const ifY = narrow ? 0.9 * H : 0.86 * H;
      const R0 = Math.min(W, H) * (narrow ? 0.085 : 0.105);
      const rot = narrow ? -Math.PI * 0.5 : Math.PI * 0.16;
      const GOLD = 2.399963229;

      nodes.forEach((n, k) => {
        n.sx = (0.06 + hash(k * 3.1) * 0.88) * W;
        n.sy = (0.1 + hash(k * 7.7) * 0.8) * H;
        n.phase = hash(k * 5.5) * Math.PI * 2;
        n.freq = 0.35 + hash(k * 9.3) * 0.5;
        n.amp = 6 + hash(k * 2.2) * 11;

        if (n.role === "hub") {
          n.tx = hx;
          n.ty = hy;
          n.amp = 0;
        } else if (n.role === "interface") {
          n.tx = hx;
          n.ty = ifY;
          n.amp = 0;
        } else {
          const a = k * GOLD + rot + (hash(k * 1.3) - 0.5) * 0.22;
          const r = R0 * Math.sqrt(k + 0.75);
          let x = hx + r * Math.cos(a);
          let y = hy + r * Math.sin(a);
          if (!narrow) x = Math.max(0.5 * W, Math.min(0.97 * W, x));
          y = Math.max(0.1 * H, Math.min(0.8 * H, y));
          n.tx = x;
          n.ty = y;
        }
        n.cx = n.sx;
        n.cy = n.sy;
      });
    };

    const resize = () => {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      document.body.classList.toggle("flow-narrow", W < 820);
      build();
    };

    const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
    const smooth = (t: number, a: number, b: number) => {
      const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
      return x * x * (3 - 2 * x);
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    let progress = 0;
    let time = 0;
    let raf = 0;

    const draw = () => {
      time += 0.016;
      const t = easeInOut(progress);
      const linkA = smooth(progress, 0.42, 0.95);
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255,255,255,0.04)";
      for (let i = 0; i < 60; i += 1) {
        ctx.fillRect(hash(i) * W, hash(i * 1.7) * H, 2, 2);
      }

      const hub = nodes.find((n) => n.role === "hub");
      const iface = nodes.find((n) => n.role === "interface");
      if (!hub || !iface) return;

      nodes.forEach((n) => {
        const wob = reduce ? 0 : Math.sin(time * n.freq + n.phase) * n.amp * (0.14 + 0.86 * (1 - t));
        n.cx = lerp(n.sx, n.tx, t);
        n.cy = lerp(n.sy, n.ty, t) + wob;
      });

      if (linkA > 0) {
        ctx.lineWidth = 1.4;
        nodes.forEach((n) => {
          if (n.role === "source") {
            const g = ctx.createLinearGradient(n.cx, n.cy, hub.cx, hub.cy);
            g.addColorStop(0, `rgba(91,140,255,${0.1 * linkA})`);
            g.addColorStop(1, `rgba(63,224,255,${0.45 * linkA})`);
            ctx.strokeStyle = g;
            ctx.beginPath();
            ctx.moveTo(n.cx, n.cy);
            ctx.lineTo(hub.cx, hub.cy);
            ctx.stroke();
          } else if (n.role === "module") {
            ctx.strokeStyle = `rgba(120,160,255,${0.3 * linkA})`;
            ctx.beginPath();
            ctx.moveTo(n.cx, n.cy);
            ctx.lineTo(hub.cx, hub.cy);
            ctx.stroke();
          }
        });
        ctx.save();
        ctx.strokeStyle = `rgba(63,224,255,${0.6 * linkA})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -time * 30;
        ctx.beginPath();
        ctx.moveTo(hub.cx, hub.cy);
        ctx.lineTo(iface.cx, iface.cy);
        ctx.stroke();
        ctx.restore();
      }

      if (t > 0.15) {
        const gr = ctx.createRadialGradient(hub.cx, hub.cy, 0, hub.cx, hub.cy, 170 * t);
        gr.addColorStop(0, `rgba(47,107,255,${0.2 * t})`);
        gr.addColorStop(1, "rgba(47,107,255,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(hub.cx, hub.cy, 170 * t, 0, 7);
        ctx.fill();
      }

      ctx.textBaseline = "middle";
      nodes.forEach((n) => {
        if (n.role === "hub") {
          const r = lerp(26, 40, t);
          const g = ctx.createLinearGradient(n.cx - r, n.cy - r, n.cx + r, n.cy + r);
          g.addColorStop(0, "#2f6bff");
          g.addColorStop(1, "#18c5ff");
          ctx.save();
          ctx.shadowColor = "rgba(47,107,255,.6)";
          ctx.shadowBlur = lerp(0, 24, t);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.cx, n.cy, r, 0, 7);
          ctx.fill();
          ctx.restore();
          ctx.fillStyle = "#fff";
          ctx.font = '800 16px "IBM Plex Sans", system-ui, sans-serif';
          ctx.textAlign = "center";
          ctx.fillText("AIAN", n.cx, n.cy);
          return;
        }
        if (n.role === "interface") {
          const w = lerp(120, 210, t);
          const h = lerp(40, 86, t);
          const x = n.cx - w / 2;
          const y = n.cy - h / 2;
          ctx.fillStyle = `rgba(255,255,255,${lerp(0.1, 0.96, t)})`;
          rr(x, y, w, h, 14);
          ctx.fill();
          if (t > 0.55) {
            ctx.fillStyle = "rgba(10,16,32,.85)";
            ctx.font = '800 12px "IBM Plex Sans", system-ui, sans-serif';
            ctx.textAlign = "left";
            ctx.fillText("Dashboard", x + 16, y + 18);
            const bw = [0.5, 0.8, 0.62];
            const by = y + 38;
            bw.forEach((b, bi) => {
              ctx.fillStyle = "#2f6bff";
              rr(x + 16, by + bi * 12, (w - 32) * b, 6, 3);
              ctx.fill();
            });
          }
          return;
        }
        ctx.font = '600 13px "IBM Plex Sans", system-ui, sans-serif';
        ctx.textAlign = "left";
        const padX = 12;
        const tw = ctx.measureText(n.label).width;
        const w = tw + padX * 2;
        const h = 30;
        const x = n.cx - w / 2;
        const y = n.cy - h / 2;
        ctx.fillStyle = `rgba(255,255,255,${lerp(0.04, 0.07, t)})`;
        ctx.strokeStyle = `rgba(255,255,255,${lerp(0.14, 0.26, t)})`;
        ctx.lineWidth = 1;
        rr(x, y, w, h, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = n.role === "module" ? "#18c5ff" : "rgba(180,200,230,.7)";
        ctx.beginPath();
        ctx.arc(x + padX, n.cy, 2.5, 0, 7);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${lerp(0.6, 0.92, t)})`;
        ctx.fillText(n.label, x + padX + 8, n.cy);
      });

      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      const rect = scene.getBoundingClientRect();
      const scrollable = scene.offsetHeight - window.innerHeight;
      progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      txtProblem.style.opacity = String(1 - smooth(progress, 0.3, 0.52));
      txtBuild.style.opacity = String(smooth(progress, 0.54, 0.8));
      if (!typedP && rect.top <= 5 && progress < 0.3) {
        typedP = true;
        twType(pChars, pCaret, 42);
      }
      if (!typedB && progress > 0.54) {
        typedB = true;
        twType(bChars, bCaret, 42);
      }
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();
    onScroll();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      document.body.classList.remove("flow-narrow");
    };
  }, [home.howTitle, home.statementLine1, home.statementMuted, locale]);

  return (
    <section className="flow-scene" id="flow" ref={sceneRef}>
      <div className="flow-stage">
        <canvas id="flow-canvas" ref={canvasRef} />
        <div className="flow-overlay">
          <div className="flow-txt" id="flow-problem" ref={problemRef}>
            <h2 className="flow-h2">
              {home.statementLine1}
              <br />
              <span className="muted">{home.statementMuted}</span>
              <span className="code-caret" aria-hidden="true" />
            </h2>
            <p className="flow-lead">{flowProblemLead(locale)}</p>
          </div>
          <div className="flow-txt is-build" id="flow-build" ref={buildRef} style={{ opacity: 0 }}>
            <span className="flow-eyebrow">{home.howLabel}</span>
            <h2 className="flow-h2">
              {howLines[0]}
              {howLines.length > 1 ? (
                <>
                  <br />
                  <span className="flow-grad">{howLines.slice(1).join(" ")}</span>
                </>
              ) : null}
              <span className="code-caret" aria-hidden="true" />
            </h2>
            <p className="flow-lead">{home.howLead}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
