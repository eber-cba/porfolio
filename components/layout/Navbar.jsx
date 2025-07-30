import React, { useState, useEffect, useRef, createContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { gsap } from "gsap";
import styles from "../../styles/Navbar.module.scss";
import { animatedScrollTo } from "../../utils/animatedScroll";

export const ScrollContext = createContext();

function Navbar({ nombre = "Invitado" }) {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef({
    sobremi: useRef(null),
    skills: useRef(null),
    contacto: useRef(null),
    skin: useRef(null),
  });
  const navbarRef = useRef(null);
  const buttonsRef = useRef([]);
  const waveRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const offset = 100;

      Object.entries(sectionRefs.current).forEach(([sectionName, ref]) => {
        if (ref.current) {
          const { top, bottom } = ref.current.getBoundingClientRect();
          const sectionTop = top + window.scrollY - offset;
          const sectionBottom = bottom + window.scrollY - offset;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionName);
          }
        }
      });

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

  // Mobile menu animations
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isMobileMenuOpen]);

  function smoothScrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      animatedScrollTo(el);
      // Close mobile menu after clicking a link
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        ref={navbarRef}
        className="appbar"
        sx={{
          backgroundColor: "#155263",
          height: isMobile ? "70px" : "90px",
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
          sx={{
            minHeight: isMobile ? "70px" : "90px",
            height: isMobile ? "70px" : "90px",
          }}
        >
          <div className={`Hola ${styles.Hola}`}>
            <div className={styles.waveContainer}>
              <span ref={waveRef} className={styles.wave}>
                👋
              </span>
            </div>
            <label className={styles.hola}>¡Hi {nombre}!</label>
          </div>

          {!isMobile ? (
            <div className={styles.botones}>
              <button
                ref={(el) => (buttonsRef.current[0] = el)}
                id="btnsobreMI"
                className={`${styles.liquidButton} ${
                  activeSection === "sobremi" ? styles.liquidActive : ""
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
                  activeSection === "skills" ? styles.liquidActive : ""
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
                  activeSection === "contacto" ? styles.liquidActive : ""
                }`}
                onClick={contactoScroll}
              >
                <span className={styles.buttonText}>Contact</span>
                <span className={styles.liquid}></span>
              </button>
            </div>
          ) : (
            <div className={styles.mobileMenuContainer}>
              <button
                className={`${styles.hamburgerButton} ${
                  isMobileMenuOpen ? styles.hamburgerActive : ""
                }`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
              </button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div
          ref={mobileMenuRef}
          className={`${styles.mobileMenuOverlay} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileMenuHeader}>
              <span className={styles.mobileMenuTitle}>Menu</span>
            </div>
            <div className={styles.mobileMenuItems}>
              <button
                className={`${styles.mobileMenuItem} ${
                  activeSection === "sobremi" ? styles.mobileMenuItemActive : ""
                }`}
                onClick={sobremiScroll}
              >
                <span className={styles.mobileMenuItemText}>About me</span>
                <span className={styles.mobileMenuItemIcon}>👤</span>
              </button>

              <button
                className={`${styles.mobileMenuItem} ${
                  activeSection === "skills" ? styles.mobileMenuItemActive : ""
                }`}
                onClick={habilidadesScroll}
              >
                <span className={styles.mobileMenuItemText}>Skills</span>
                <span className={styles.mobileMenuItemIcon}>💻</span>
              </button>

              <button
                className={`${styles.mobileMenuItem} ${
                  activeSection === "contacto"
                    ? styles.mobileMenuItemActive
                    : ""
                }`}
                onClick={contactoScroll}
              >
                <span className={styles.mobileMenuItemText}>Contact</span>
                <span className={styles.mobileMenuItemIcon}>📧</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Toolbar />
    </React.Fragment>
  );
}

export default Navbar;
