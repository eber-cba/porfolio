import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/ExperienceCard.module.css";

const ExperienceCard = ({
  title,
  company,
  period,
  summary,
  details,
  icon,
  gradient,
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.dataPad}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Background glow tied to the gradient prop */}
      <div 
        className={styles.bgGlow} 
        style={{ background: `linear-gradient(${gradient})` }} 
      />

      {/* Spotlight Effect */}
      <div 
        className={styles.spotlight}
        style={{
          background: `linear-gradient(${gradient})`,
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 40%)`,
          maskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 40%)`,
          opacity: isHovered ? 0.3 : 0
        }}
      />

      {/* The actual Glass Panel */}
      <div className={styles.glassPanel}>
        {/* Scan line effect on hover */}
        <div 
          className={`${styles.scanLine} ${isHovered ? styles.active : ""}`}
          style={{
             background: `linear-gradient(${gradient})`,
             WebkitMaskImage: `linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)`,
             maskImage: `linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)`,
             opacity: isHovered ? 1 : 0
          }}
        />

        <div className={styles.header}>
          <div className={styles.iconWrapper} style={{ background: `linear-gradient(${gradient})` }}>
            <span className={styles.icon}>{icon}</span>
          </div>
          <div className={styles.headerText}>
            <div className={styles.period}><span className={styles.sysPrompt}>{"> sys.date:"}</span> {period}</div>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.company} style={{ background: `linear-gradient(${gradient})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              @{company}
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <p className={styles.summary}>{summary}</p>
          {details && (
            <div className={styles.details}>
              <span className={styles.sysPrompt}>{"> log.details:"}</span> 
              <p>{details}</p>
            </div>
          )}
        </div>

        {/* Decorative Tech Corners */}
        <div className={styles.cornerTopLeft} />
        <div className={styles.cornerBottomRight} />
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
