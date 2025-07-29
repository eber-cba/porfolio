import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { gsap } from "gsap";
import styles from '../../styles/Navbar.module.scss';
import { animatedScrollTo } from "../../utils/animatedScroll";

function Navbar({ nombre = "Invitado" }) {
  const [scrollmi, setScrollMi] = useState(false);
  const [scrollHabilidades, setScrollHabilidades] = useState(false);
  const [scrollContacto, setScrollContacto] = useState(false);
  const navbarRef = useRef(null);
  const buttonsRef = useRef([]);
  const waveRef = useRef(null);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrollMi(window.scrollY > 0 && window.scrollY <= 1500);
      setScrollHabilidades(window.scrollY > 1500 && window.scrollY <= 2500);
      setScrollContacto(window.scrollY > 2500);

      // Navbar background effect on scroll
      if (navbarRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.min(0.95, scrollY / 300);
        const scale = Math.max(0.9, 1 - scrollY / 2000);
        const borderRadius = Math.max(0, 30 - scrollY / 20);

        gsap.to(navbarRef.current, {
          backgroundColor: `rgba(21, 82, 99, ${opacity})`,
          scale: scale,
          borderRadius: `${borderRadius}px`,
          duration: 0.3,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial animations
  useEffect(() => {
    // Wave animation
    gsap.from(waveRef.current, {
      duration: 1.5,
      rotate: 30,
      y: 20,
      opacity: 0,
      ease: "elastic.out(1, 0.8)",
      delay: 0.3,
    });

    // Text animation
    gsap.from(".Hola", {
      duration: 1.2,
      y: 30,
      opacity: 0,
      ease: "back.out(1.7)",
      delay: 0.5,
    });

    // Button animations
    gsap.from(buttonsRef.current, {
      duration: 0.8,
      y: 40,
      opacity: 0,
      stagger: 0.2,
      ease: "bounce.out",
      delay: 0.7,
    });

    // Floating effect for navbar
    gsap.to(navbarRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });
  }, []);

  function smoothScrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      animatedScrollTo(el);
    }
  }

  function sobremiScroll() {
    smoothScrollToSection("sobremi-section");
  }

  function habilidadesScroll() {
    smoothScrollToSection("skills-section");
  }

  function contactoScroll() {
    smoothScrollToSection("contacto-section");
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        ref={navbarRef}
        className="appbar"
        sx={{
          backgroundColor: "#155263",
          height: "90px",
          borderRadius: "30px 30px 30px 30px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          margin: "10px 20px 0 20px",
          width: "calc(100% - 40px)",
          overflow: "hidden",
          transformOrigin: "center top",
          transition: "all 0.3s ease",
        }}
      >
        <div className={styles.navbarShape}></div>
        <Toolbar
          className={styles.contenedorNavb}
          sx={{ minHeight: "90px", height: "90px" }}
        >
          <div className={`Hola ${styles.Hola}`}>
            <div className={styles.waveContainer}>
              <span ref={waveRef} className={styles.wave}>
                👋
              </span>
            </div>
            <label className={styles.hola}>¡Hi {nombre}!</label>
          </div>
          <div className={styles.botones}>
            <button
              ref={(el) => (buttonsRef.current[0] = el)}
              id="btnsobreMI"
              className={`${styles.liquidButton} ${
                scrollmi ? styles.liquidActive : ""
              }`}
              onClick={sobremiScroll}
            >
              <span className={styles.buttonText}>About me</span>
              <span className={styles.liquid}></span>
            </button>

            <button
              ref={(el) => (buttonsRef.current[1] = el)}
              id="btnHabilidades"
              className={`${styles.liquidButton} ${
                scrollHabilidades ? styles.liquidActive : ""
              }`}
              onClick={habilidadesScroll}
            >
              <span className={styles.buttonText}>Skills</span>
              <span className={styles.liquid}></span>
            </button>

            <button
              ref={(el) => (buttonsRef.current[2] = el)}
              id="btnContacto"
              className={`${styles.liquidButton} ${
                scrollContacto ? styles.liquidActive : ""
              }`}
              onClick={contactoScroll}
            >
              <span className={styles.buttonText}>Contact</span>
              <span className={styles.liquid}></span>
            </button>
          </div>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </React.Fragment>
  );
}

export default Navbar;
