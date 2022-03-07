 
import styles from "../styles/AboutMe.module.css";
import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function AboutMe() {
  const Timeline = gsap.timeline({
    defaults: { duration: 1.5, opacity: 0 },
  });

  useEffect(() => {
    const fullstack = document.querySelectorAll(".fullstack");
    const soyEber = document.querySelectorAll(".soyEber");
    const developer = document.querySelectorAll(".developer");
    const container = document.querySelectorAll(".container");
   
    Timeline.from(soyEber, { y: 20, x: -300 })
      .from(fullstack, { y: -10, x: -70, scale: 1 })
      .from(developer, { y: -50, x: 150, scale: 1 }, "-=1")
      .from(container, { y: -100, ease: "power4.out" });
  }, []);

  useEffect(() => {
    const LabelScroll = document.querySelector(".LabelScroll");
    gsap.from(LabelScroll, {
      scale: 1.8,
      yoyo: true,
      repeat: -1,
      duration: 0.9,
    });
  }, []);

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { duration: 1.5, rotateX: 180 });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { duration: 1.5, rotateX: 360 });
  };

  function efectoEnter() {
    const paralelogramo2 = document.querySelectorAll(".paralelogramo2");
    gsap.to(paralelogramo2, { duration: 1.5, rotateX: 180 });
  }
  function efectoLeave() {
    const paralelogramo2 = document.querySelectorAll(".paralelogramo2");
    gsap.to(paralelogramo2, { duration: 1.5, rotateX: 360 });
  }

  return (
    <section>
      <div className={styles.contenedor}>
        <div className="soyEber" id={styles.contenedorLabel1}>
          <div
            onMouseEnter={onEnter ? efectoEnter : onEnter}
            onMouseLeave={onLeave ? efectoLeave : onLeave}
            className="paralelogramo2"
            id={styles.paralelogramo}
          ></div>
          <label className={styles.soyEber}> I am Eber </label>
        </div>
      </div>
      <div className={styles.contenedor2}>
        <div className={styles.cajaTexto1}>
          <div className="fullstack">
            <label className={styles.fullStack}>Full Stack</label>
          </div>
        </div>
        <div id={styles.contenedorLabel2} className={styles.cajaTexto2}>
          <div className="developer">
            <div
              onMouseEnter={onEnter ? efectoEnter : onEnter}
              onMouseLeave={onLeave ? efectoLeave : onLeave}
              className="paralelogramo2"
              id={styles.paralelogramo3}
            ></div>
            <label className={styles.Developer}>Developer</label>
          </div>
        </div>
      </div>
      <div className="container">
        <label className="LabelScroll">Start</label>
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
      </div>
    </section>
  );
}
