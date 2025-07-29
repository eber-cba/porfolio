import AppBar from "@mui/material/AppBar";
import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { gsap } from "gsap";
import styles from "../../styles/Navbar.module.scss";
import { animatedScrollTo } from "../../utils/animatedScroll";

function Navbar({ nombre = "Invitado" }) {
  const [scrollmi, setScrollMi] = useState(false);
  const [scrollHabilidades, setScrollHabilidades] = useState(false);
  const [scrollContacto, setScrollContacto] = useState(false);

  useEffect(() => {
    const handleScrollMi = () => {
      setScrollMi(window.scrollY > 0 && window.scrollY <= 1500);
    };

    const handleScrollContacto = () => {
      setScrollContacto(window.scrollY > 2500);
    };

    window.addEventListener("scroll", handleScrollMi);
    window.addEventListener("scroll", handleScrollHabilidades);
    window.addEventListener("scroll", handleScrollContacto);

    const handleScrollHabilidades = () => {
      setScrollHabilidades(window.scrollY > 1500 && window.scrollY <= 2500);
    };
    window.addEventListener("scroll", handleScrollContacto);

    // Limpieza de event listeners cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScrollMi);
      window.removeEventListener("scroll", handleScrollHabilidades);
      window.removeEventListener("scroll", handleScrollContacto);
    };
  }, []);

  const Timeline = gsap.timeline({
    defaults: { opacity: 1, y: 0 },
  });

  useEffect(() => {
    const Hola = document.querySelectorAll(".Hola");
    const botonSobreMi = document.querySelectorAll("#btnsobreMI");
    const botonHabilidades = document.querySelectorAll("#btnHabilidades");
    const botonContacto = document.querySelectorAll("#btnContacto");

    // Asegurar que los botones sean visibles antes de animar
    gsap.set([botonSobreMi, botonHabilidades, botonContacto], { opacity: 1 });

    Timeline.from(Hola, { duration: 1, y: 20 })
      .from(botonSobreMi, { duration: 0.5, y: 20, stagger: 0.2 })
      .from(botonHabilidades, { duration: 0.5, y: 20, stagger: 0.2 })
      .from(botonContacto, { duration: 0.5, y: 20, stagger: 0.2 });
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
        className="appbar"
        sx={{ backgroundColor: "#155263", height: "70px" }}
      >
        <Toolbar
          className={styles.contenedorNavb}
          sx={{ minHeight: "70px", height: "70px" }}
        >
          <div className="Hola" id={styles.Hola}>
            <label className={styles.hola}>¡Hi {nombre}!</label>
          </div>
          <div className={styles.botones}>
            <button
              id="btnsobreMI"
              className={scrollmi ? styles.focus : styles.normalButton}
              onClick={sobremiScroll}
            >
              About me
            </button>

            <button
              id="btnHabilidades"
              className={scrollHabilidades ? styles.focus : styles.normalButton}
              onClick={habilidadesScroll}
            >
              Skills
            </button>
            <button
              id="btnContacto"
              className={scrollContacto ? styles.focus : styles.normalButton}
              color="warning"
              size="sm"
              onClick={contactoScroll}
            >
              Contact
            </button>
          </div>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </React.Fragment>
  );
}

export default Navbar;
