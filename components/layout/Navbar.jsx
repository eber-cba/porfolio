import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { gsap } from "gsap";
import styles from "../../styles/Navbar.module.scss";
import { animatedScrollTo } from "../../utils/animatedScroll";

export const ScrollContext = React.createContext();

function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navbarRef = useRef(null);
  const buttonsRef = useRef([]);
  const logoRef = useRef(null);

  const sectionRefs = useRef({
    sobremi: useRef(null),
    skills: useRef(null),
    contacto: useRef(null),
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll: section detection + navbar style + progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);

      // Section detection
      const scrollPosition = scrollY + window.innerHeight / 2;
      const offset = 100;
      Object.entries(sectionRefs.current).forEach(([name, ref]) => {
        if (ref.current) {
          const { top, bottom } = ref.current.getBoundingClientRect();
          const sectionTop = top + scrollY - offset;
          const sectionBottom = bottom + scrollY - offset;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(name);
          }
        }
      });

      // Navbar background deepens on scroll
      if (navbarRef.current) {
        const opacity = Math.min(0.95, 0.6 + scrollY / 600);
        const glowOpacity = Math.min(0.3, scrollY / 1000);
        gsap.to(navbarRef.current, {
          backgroundColor: `rgba(5, 13, 24, ${opacity})`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.8), 0 0 30px rgba(0,243,255,${glowOpacity})`,
          duration: 0.3,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entry animations
  useEffect(() => {
    gsap.from(logoRef.current, {
      duration: 1.2,
      x: -40,
      opacity: 0,
      ease: "back.out(1.7)",
      delay: 0.2,
    });
    gsap.from(buttonsRef.current, {
      duration: 0.8,
      y: -20,
      opacity: 0,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.5,
    });
  }, []);

  function smoothScrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      animatedScrollTo(el);
      if (isMobile) setIsMobileMenuOpen(false);
    }
  }

  const navItems = [
    { label: "About me", id: "sobremi-section", key: "sobremi", icon: "👤" },
    { label: "Skills",   id: "skills-section",  key: "skills",   icon: "💻" },
    { label: "Contact",  id: "contacto-section", key: "contacto", icon: "📧", isCta: true },
  ];

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        ref={navbarRef}
        className="appbar"
        sx={{
          backgroundColor: "rgba(5, 13, 24, 0.6)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          margin: "12px 20px 0 20px",
          width: "calc(100% - 40px)",
          overflow: "visible",
          border: "1px solid rgba(0, 243, 255, 0.08)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div className={styles.navbarShape} />

        <Toolbar
          className={styles.contenedorNavb}
          sx={{
            minHeight: isMobile ? "64px" : "72px",
            height: isMobile ? "64px" : "72px",
            px: 0,
          }}
        >
          {/* ── LOGO MARK ── */}
          <div ref={logoRef} className={styles.logoWrapper} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className={styles.logoMonogram}>
              <span className={styles.logoBracket}>{"<>"}</span>
              <span className={styles.logoInitials}>EC</span>
            </div>
            {!isMobile && (
              <div className={styles.logoText}>
                <span className={styles.logoName}>Eber Coronel</span>
                <span className={styles.logoRole}>Full Stack Dev</span>
              </div>
            )}
            <span className={styles.logoDot} />
          </div>

          {/* ── DESKTOP NAV ── */}
          {!isMobile ? (
            <div className={styles.botones}>
              {navItems.map((item, i) => (
                <button
                  key={item.key}
                  ref={(el) => (buttonsRef.current[i] = el)}
                  className={`${styles.navLink} ${
                    item.isCta ? styles.navLinkCta : ""
                  } ${activeSection === item.key ? styles.navLinkActive : ""}`}
                  onClick={() => smoothScrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}

              {/* Scroll progress mini-pill */}
              <div className={styles.scrollPill}>
                <div
                  className={styles.scrollPillFill}
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>
          ) : (
            /* ── HAMBURGER ── */
            <button
              ref={(el) => (buttonsRef.current[0] = el)}
              className={`${styles.hamburgerButton} ${isMobileMenuOpen ? styles.hamburgerActive : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          )}
        </Toolbar>
      </AppBar>

      {/* ── MOBILE MENU ── */}
      {isMobile && (
        <div
          className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileMenuHeader}>
              <span className={styles.mobileMenuTitle}>Navigation</span>
            </div>
            <div className={styles.mobileMenuItems}>
              {navItems.map((item) => (
                <button
                  key={item.key}
                  className={`${styles.mobileMenuItem} ${activeSection === item.key ? styles.mobileMenuItemActive : ""}`}
                  onClick={() => smoothScrollToSection(item.id)}
                >
                  <span className={styles.mobileMenuItemText}>{item.label}</span>
                  <span className={styles.mobileMenuItemIcon}>{item.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Toolbar sx={{ minHeight: isMobile ? "64px" : "72px" }} />
    </React.Fragment>
  );
}

export default Navbar;
