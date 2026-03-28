import styles from "../../styles/AboutMe.module.css";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutMe() {
  const canvasRef = useRef(null);

  /* ── Animated mesh grid on canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
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
          const bx = c * cellW;
          const by = r * cellH + wave;
          const brightness = (Math.sin(c * 0.8 + t) + Math.cos(r * 0.7 + t * 0.5)) * 0.5 + 0.5;

          ctx.beginPath();
          ctx.arc(bx, by, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,243,255,${(0.12 + brightness * 0.25).toFixed(2)})`;
          ctx.fill();

          if (c < COLS) {
            const nx = (c + 1) * cellW;
            const ny = r * cellH + (Math.sin((c + 1) * 0.5 + t) * 10 + Math.cos(r * 0.4 + t * 0.7) * 8);
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(nx, ny);
            ctx.strokeStyle = `rgba(0,243,255,${(0.04 + brightness * 0.06).toFixed(2)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }

          if (r < ROWS) {
            const bx2 = c * cellW;
            const by2 = (r + 1) * cellH + (Math.sin(c * 0.5 + t) * 10 + Math.cos((r + 1) * 0.4 + t * 0.7) * 8);
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(bx2, by2);
            const brightness2 = (Math.sin(c * 0.7 + t * 0.8) + Math.cos((r + 1) * 0.7 + t)) * 0.4 + 0.4;
            ctx.strokeStyle = `rgba(255,154,60,${(0.03 + brightness2 * 0.05).toFixed(2)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── GSAP entrance animations (entrance only, no hover) ── */
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

  return (
    <div className="padreYoSoy" style={{ position: "relative" }}>

      {/* ── Animated mesh canvas ── */}
      <canvas ref={canvasRef} className={styles.meshCanvas} aria-hidden="true" />

      {/* ── Ambient blobs ── */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      {/* ── "I am Eber" — terminal badge (hover via CSS only) ── */}
      <div className="soyEber" id={styles.contenedor}>
        <div id={styles.contenedorLabel1} style={{ cursor: "pointer" }}>
          <div className={`paralelogramo2 ${styles.badgeWrap}`}>
            <div className={styles.badgeDots}>
              <span className={styles.dot1} />
              <span className={styles.dot2} />
              <span className={styles.dot3} />
            </div>
            <label className={styles.soyEber}>
              <span className={styles.promptSign}>&gt;_</span>
              &nbsp;I am Eber
            </label>
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

      {/* ── Developer ── */}
      <div className="developer" id={styles.contenedor3}>
        <div id={styles.contenedorLabel2} style={{ cursor: "pointer" }}>
          <div className={`paralelogramo2 ${styles.devBlock}`}>
            <div className={styles.devGlow} />
            {/* Ripple rings on hover (pure CSS pseudo-elements) */}
            <div className={styles.devRipple} aria-hidden="true" />
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
