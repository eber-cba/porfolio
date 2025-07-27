import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../styles/ModernSkills.module.css";

export default function ModernSkills() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { root: null, rootMargin: "-20% 0px", threshold: 0 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, []);

  // Categorías de habilidades
  const categories = [
    {
      id: "web",
      name: "Web Development",
      skills: [
        { name: "React.js", icon: "/habilidades/react.svg" },
        { name: "Next.js", icon: "/habilidades/next-js.svg" },
        { name: "Material UI", icon: "/habilidades/material-ui-1.svg" },
        { name: "Node.js", icon: "/habilidades/nodejs.svg" },
        { name: "PostgreSQL", icon: "/habilidades/postgresql.svg" },
        { name: "Express", icon: "/habilidades/express-109.svg" },
      ],
    },
    {
      id: "oop",
      name: "Object-Oriented Programming",
      skills: [
        { name: "C Sharp", icon: "/habilidades/c--4.svg" },
        {
          name: "SQL Server",
          icon: "/habilidades/microsoft-sql-serverl--logo.svg",
        },
        { name: "My SQL", icon: "/habilidades/mysql.svg" },
      ],
    },
    {
      id: "design",
      name: "Graphic Design",
      skills: [
        { name: "Adobe Photoshop", icon: "/habilidades/adobe-photoshop-2.svg" },
        {
          name: "Adobe Lightroom",
          icon: "/habilidades/adobe-photoshop-lightroom-cc-icon.svg",
        },
        {
          name: "Adobe Illustrator",
          icon: "/habilidades/adobe-illustrator-cc-icon.svg",
        },
        {
          name: "Adobe Indesign",
          icon: "/habilidades/adobe-indesign-cc-icon.svg",
        },
        { name: "Corel Draw", icon: "/habilidades/corel-3.svg" },
      ],
    },
    {
      id: "agile",
      name: "Agile Methodologies",
      skills: [
        {
          name: "Pair Programming",
          icon: "/habilidades/Pairprogramming-rafiki.svg",
        },
        { name: "Scrum", icon: "/habilidades/scrumorg-1.svg" },
        { name: "Trello", icon: "/habilidades/trello.svg" },
      ],
    },
  ];

  // Calcular transformación basada en posición del mouse
  const calculateTransform = (depth = 0.1) => {
    return {
      transform: `translate3d(${mousePosition.x * depth * 100}px, ${
        mousePosition.y * depth * 100
      }px, 0)`,
    };
  };

  return (
    <div
      ref={containerRef}
      id="skills-section"
      className={styles.skillsSection}
    >
      {/* Partículas de fondo */}
      <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={calculateTransform(0.05)}
          ></div>
        ))}
      </div>

      {/* Formas geométricas de fondo */}
      <div className={styles.backgroundShapes}>
        <div
          className={`${styles.shape} ${styles.triangle}`}
          style={calculateTransform(0.03)}
        ></div>
        <div
          className={`${styles.shape} ${styles.circle}`}
          style={calculateTransform(0.02)}
        ></div>
        <div
          className={`${styles.shape} ${styles.square}`}
          style={calculateTransform(0.04)}
        ></div>
      </div>

      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        style={calculateTransform(0.01)}
      >
        <h2 className={styles.title}>
          <span className={styles.titleHighlight}>Skills</span> & Expertise
        </h2>
        <div className={styles.divider} />
        <p className={styles.subtitle}>
          Technologies I master and design tools I love
        </p>
      </motion.div>

      <div className={styles.categoriesContainer}>
        {categories.map((category, catIndex) => (
          <motion.div
            key={category.id}
            className={styles.categorySection}
            initial={{ opacity: 0, y: 60 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: catIndex * 0.2 + 0.3,
                      duration: 0.7,
                      ease: "easeOut",
                    },
                  }
                : { opacity: 0, y: 60 }
            }
          >
            <motion.h3
              className={styles.categoryTitle}
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 10px rgba(255, 154, 158, 0.7)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className={styles.categoryTitleAccent}>
                {category.name}
              </span>
            </motion.h3>

            <div className={styles.skillsGrid}>
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className={styles.skillIcon}
                  initial={{ opacity: 0, scale: 0.7, rotate: 15 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                          transition: {
                            delay: catIndex * 0.3 + skillIndex * 0.1 + 0.5,
                            type: "spring",
                            stiffness: 300,
                            damping: 12,
                          },
                        }
                      : { opacity: 0, scale: 0.7, rotate: 15 }
                  }
                  whileHover={{
                    y: -15,
                    scale: 1.1,
                    rotate: [0, -3, 0, 3, 0],
                    transition: {
                      duration: 0.5,
                      y: { type: "spring", stiffness: 300, damping: 10 },
                    },
                  }}
                >
                  <div className={styles.hexagonContainer}>
                    <div className={styles.hexagon}>
                      <div className={styles.hexagonInner}>
                        <div className={styles.hexagonContent}>
                          <div className={styles.hexagonHoverEffect}></div>
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            width={42}
                            height={42}
                            className={styles.iconImg}
                          />
                          <div className={styles.hexagonGlow}></div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.hexagonShadow}></div>
                  </div>
                  <span className={styles.skillName}>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
