import styles from "../../styles/AboutMe.module.css";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ── Text scramble utility ── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\";
function scrambleText(el, finalText, duration = 1200) {
  let frame = 0;
  const totalFrames = Math.round(duration / 30);
  const orig = finalText.split("");
  const interval = setInterval(() => {
    el.textContent = orig
      .map((ch, i) => {
        if (i < Math.floor((frame / totalFrames) * orig.length)) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");
    frame++;
    if (frame >= totalFrames) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 30);
  return interval;
}

export default function AboutMe() {
  const canvasRef   = useRef(null);
  const devRef      = useRef(null);   // The Developer block wrapper
  const devLightRef = useRef(null);   // Moving light blob inside block
  const badgeLabelRef = useRef(null); // "I am Eber" text node
  const scrambleRef = useRef(null);   // interval ref

  /* ── Animated mesh canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const COLS = 18, ROWS = 10;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cellW = W / COLS, cellH = H / ROWS;
      t += 0.012;
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const wave = Math.sin(c * 0.5 + t) * 10 + Math.cos(r * 0.4 + t * 0.7) * 8;
          const bx = c * cellW, by = r * cellH + wave;
          const brightness = (Math.sin(c * 0.8 + t) + Math.cos(r * 0.7 + t * 0.5)) * 0.5 + 0.5;
          ctx.beginPath(); ctx.arc(bx, by, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,243,255,${(0.12 + brightness * 0.25).toFixed(2)})`; ctx.fill();
          if (c < COLS) {
            const nx = (c+1)*cellW, ny = r*cellH + (Math.sin((c+1)*0.5+t)*10 + Math.cos(r*0.4+t*0.7)*8);
            ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(nx,ny);
            ctx.strokeStyle = `rgba(0,243,255,${(0.04+brightness*0.06).toFixed(2)})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
          if (r < ROWS) {
            const by2 = (r+1)*cellH + (Math.sin(c*0.5+t)*10 + Math.cos((r+1)*0.4+t*0.7)*8);
            ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(c*cellW,by2);
            const b2 = (Math.sin(c*0.7+t*0.8)+Math.cos((r+1)*0.7+t))*0.4+0.4;
            ctx.strokeStyle = `rgba(255,154,60,${(0.03+b2*0.05).toFixed(2)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.1 } });
    tl.from(".soyEber",        { y: 30, opacity: 0, x: -60 }, 0.2)
      .from(".fullstack",      { y: -20, opacity: 0, x: -50 }, 0.5)
      .from(".developer",      { y: -40, opacity: 0, x: 80  }, 0.65)
      .from(".containerStart", { y: -40, opacity: 0          }, 0.9);
  }, []);

  /* ── Bounce chevrons ── */
  useEffect(() => {
    const el = document.querySelector(".LabelScroll");
    if (el) gsap.to(el, { scale: 1.6, yoyo: true, repeat: -1, duration: 0.8 });
  }, []);

  /* ══════════════════════════════════════════
     MAGNETIC 3D TILT — Developer block
     Mouse position within the element drives rotateX/rotateY + a moving
     specular light blob (hotspot).
  ══════════════════════════════════════════ */
  useEffect(() => {
    const el = devRef.current;
    const light = devLightRef.current;
    if (!el || !light) return;

    // GSAP quickTo for butter-smooth tracking
    const xTo = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power2.out" });
    const yTo = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power2.out" });
    const sTo = gsap.quickTo(el, "scale",   { duration: 0.4, ease: "power2.out" });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;   // 0 → width
      const my = e.clientY - rect.top;    // 0 → height
      const px = mx / rect.width;         // 0 → 1
      const py = my / rect.height;        // 0 → 1

      // Tilt: ±15 degrees
      xTo(-(py - 0.5) * 22);
      yTo((px - 0.5) * 28);

      // Move specular light spot
      gsap.to(light, {
        x: mx - rect.width * 0.5,
        y: my - rect.height * 0.5,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    };
    const onEnter = () => {
      sTo(1.06);
      gsap.to(light, { opacity: 1, duration: 0.3 });
    };
    const onLeave = () => {
      xTo(0); yTo(0); sTo(1);
      gsap.to(light, { opacity: 0, duration: 0.4 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ══════════════════════════════════════════
     TEXT SCRAMBLE — "I am Eber" badge
  ══════════════════════════════════════════ */
  useEffect(() => {
    const badge = document.getElementById("badgeText");
    if (!badge) return;

    const onEnter = () => {
      if (scrambleRef.current) clearInterval(scrambleRef.current);
      scrambleRef.current = scrambleText(badge, "I am Eber", 900);
    };
    const badgeWrap = document.getElementById("badgeWrapEl");
    if (badgeWrap) {
      badgeWrap.addEventListener("mouseenter", onEnter);
      return () => badgeWrap.removeEventListener("mouseenter", onEnter);
    }
  }, []);

  return (
    <div className="padreYoSoy" style={{ position: "relative" }}>

      {/* ── Animated mesh canvas ── */}
      <canvas ref={canvasRef} className={styles.meshCanvas} aria-hidden="true" />
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      {/* ── "I am Eber" — terminal badge with scramble ── */}
      <div className="soyEber" id={styles.contenedor}>
        <div id={styles.contenedorLabel1} style={{ cursor: "pointer" }}>
          <div id="badgeWrapEl" className={`paralelogramo2 ${styles.badgeWrap}`}>
            <div className={styles.badgeDots}>
              <span className={styles.dot1} />
              <span className={styles.dot2} />
              <span className={styles.dot3} />
            </div>
            <span className={styles.soyEber}>
              <span className={styles.promptSign}>&gt;_&nbsp;</span>
              <span id="badgeText" className={styles.badgeText}>I am Eber</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Full Stack ── */}
      <div className="fullstack" id={styles.contenedor2}>
        <div className={styles.fullStackWrap}>
          <span className={styles.fsEyebrow}>Full Stack</span>
          <div className={styles.fsBar} />
        </div>
      </div>

      {/* ── Developer — magnetic tilt container ── */}
      <div className="developer" id={styles.contenedor3}>
        <div
          id={styles.contenedorLabel2}
          style={{ cursor: "none", perspective: "600px" }}
        >
          {/* This outer div is used for perspective, inner devRef is what tilts */}
          <div
            ref={devRef}
            className={`paralelogramo2 ${styles.devBlock}`}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {/* Specular hotspot that follows the mouse */}
            <div ref={devLightRef} className={styles.devLight} />
            <div className={styles.devGlow} />
            <label className={styles.Developer}>Developer</label>
          </div>
        </div>
      </div>

      {/* ── Scroll CTA ── */}
      <div className="containerStart">
        <label className={`LabelScroll ${styles.startLabel}`}>START</label>
        <div className="chevron" />
        <div className="chevron" />
        <div className="chevron" />
      </div>
    </div>
  );
}
