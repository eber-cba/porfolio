import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/SobreMi.module.css";

// Registramos los plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

export default function LineaDeTime() {
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Animación de la línea central
    gsap.fromTo(
      timelineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 2,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        ease: "power3.out",
      }
    );

    // Animación de los elementos de la línea de tiempo
    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          ease: "back.out(1.7)",
        }
      );
    });
  }, []);

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timeline} ref={timelineRef}>
        <div className={styles.timelineCenterLine}></div>
        <div className={styles.timelineGlow}></div>
      </div>

      <div className={styles.timelineItems}>
        {/* Item 1 */}
        <div
          className={`${styles.timelineItem} ${styles.timelineItemLeft}`}
          ref={(el) => (itemsRef.current[0] = el)}
        >
          <div className={styles.timelineDot}>
            <div className={styles.timelineDotInner}></div>
            <div className={styles.timelineDotPulse}></div>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.timelineDate}>09/2021 – 12/2021</div>
            <div className={styles.timelineTitle}>Coding Bootcamp</div>
            <div className={styles.timelineDescription}>Plataforma 5</div>
            <div className={styles.timelineIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                <circle cx="12" cy="14" r="3"></circle>
              </svg>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div
          className={`${styles.timelineItem} ${styles.timelineItemRight}`}
          ref={(el) => (itemsRef.current[1] = el)}
        >
          <div className={styles.timelineDot}>
            <div className={styles.timelineDotInner}></div>
            <div className={styles.timelineDotPulse}></div>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.timelineDate}>2016 – 2019</div>
            <div className={styles.timelineTitle}>Bachelor of theater</div>
            <div className={styles.timelineDescription}>
              National University of Cordoba
            </div>
            <div className={styles.timelineIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Item 3 */}
        <div
          className={`${styles.timelineItem} ${styles.timelineItemLeft}`}
          ref={(el) => (itemsRef.current[2] = el)}
        >
          <div className={styles.timelineDot}>
            <div className={styles.timelineDotInner}></div>
            <div className={styles.timelineDotPulse}></div>
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.timelineDate}>2013 – 2016</div>
            <div className={styles.timelineTitle}>Software development</div>
            <div className={styles.timelineDescription}>
              Cordoba Higher Technical Institute
            </div>
            <div className={styles.timelineIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.timelineParticles}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={styles.timelineParticle}
            style={{
              animationDelay: `${i * 0.5}s`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? "#ff9a3c" : i % 3 === 1 ? "#155263" : "#ffffff"
              }, transparent)`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
