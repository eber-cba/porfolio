import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "../../styles/AboutMe.module.css";
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { animatedScrollTo } from "../../utils/smoothScroll";

export default function Navbar({ nombre }) {
  const [scrollmi, setScroll] = useState(false);
  const [scrollHabilidades, setScrollHabilidades] = useState(false);
  const [scrollContacto, setScrollContacto] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 920 && window.scrollY <= 1500);
    });
    window.addEventListener("scroll", () => {
      setScrollHabilidades(window.scrollY > 1500 && window.scrollY <= 2500);
    });
    window.addEventListener("scroll", () => {
      setScrollContacto(window.scrollY > 2900 && window.scrollY <= 3800);
    });
  }, []);

  const Timeline = gsap.timeline({
    defaults: { opacity: 0, y: -40 },
  });

  useEffect(() => {
    const Hola = document.querySelectorAll(".Hola");
    const botonSobreMi = document.querySelectorAll("#btnsobreMI");
    const botonHabilidades = document.querySelectorAll("#btnHabilidades");
    const botonContacto = document.querySelectorAll("#btnContacto");
    Timeline.from(Hola, { duration: 1 })
      .from(botonSobreMi, { duration: 0.5, stagger: 0.3 })
      .from(botonHabilidades, { duration: 0.5, stagger: 0.3 })
      .from(botonContacto, { duration: 0.5, stagger: 0.3 });
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

      <AppBar className="appbar" sx={{ backgroundColor: "#155263" }}>
        <Toolbar className={styles.contenedorNavb}>
          <div className="Hola" id={styles.Hola}>
            <label className={styles.hola}>¡Hi {nombre}!</label>
          </div>
          <div className={styles.botones}>
            <button
              id="btnsobreMI"
              className={scrollmi ? "focus" : "normalButton"}
              onClick={sobremiScroll}
            >
              About me
            </button>

            <button
              id="btnHabilidades"
              className={scrollHabilidades ? "focus" : "normalButton"}
              onClick={habilidadesScroll}
            >
              Skills
            </button>
            <button
              id="btnContacto"
              className={scrollContacto ? "focus" : "normalButton"}
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
