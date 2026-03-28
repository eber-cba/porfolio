import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import { Card, Button } from "@nextui-org/react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { makeStyles } from "@mui/styles";
import LineaDeTime from "../ui/LineaDeTime";
import Acordion from "../ui/Acordion";
import ModalCv from "../ui/ModalCv";
import ExperienceCard from "../ui/ExperienceCard";
import { experiences } from "../../data/experiencesData";
import { Modal } from "@nextui-org/react";
import sobreMiContainerStyles from "../../styles/SobreMiContainer.module.css";
import profileStyles from "../../styles/ProfileSection.module.css";
import aboutCardStyles from "../../styles/AboutCard.module.css";
import skillsStyles from "../../styles/SkillsIcons.module.css";
import sobreMiTabStyles from "../../styles/SobreMiTab.module.css";
import experienceButtonsStyles from "../../styles/ExperienceButtons.module.css";
import downloadButtonStyles from "../../styles/DownloadButton.module.css";
import styles from "../../styles/ExperienceButtons.module.css";
import ProfileBlock from "./ProfileBlock";
import AboutCardBlock from "./AboutCardBlock";
import TabsSobreMi from "./TabsSobreMi";
import ExperienceModal from "./ExperienceModal";

const useStyles = makeStyles(() => ({
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#00f3ff",
      height: 3,
      borderRadius: 3,
      boxShadow: "0 0 10px rgba(0,243,255,0.8), 0 0 20px rgba(0,243,255,0.4)",
    },
    "& .MuiTab-root": {
      color: "rgba(255,255,255,0.5)",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 500,
      fontSize: "0.85rem",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      padding: "10px 20px",
      minWidth: "auto",
      transition: "all 0.3s ease",
      "&:hover": {
        color: "rgba(255,255,255,0.9)",
      },
      "&.Mui-selected": {
        color: "#00f3ff",
        fontWeight: 700,
        textShadow: "0 0 10px rgba(0,243,255,0.6)",
      },
    },
  },
}));

const HolographicButton = ({ label, onClick, isPrimary, icon }) => {
  const buttonRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Crear partículas iniciales
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: isPrimary ? "rgba(255, 154, 60, 0.8)" : "rgba(21, 82, 99, 0.8)",
      opacity: Math.random() * 0.6 + 0.2,
    }));

    setParticles(initialParticles);

    // Animación de flotación
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;
          let newSpeedX = p.speedX;
          let newSpeedY = p.speedY;

          // Rebotar en los bordes
          if (newX <= 0 || newX >= 100) newSpeedX = -newSpeedX;
          if (newY <= 0 || newY >= 100) newSpeedY = -newSpeedY;

          return {
            ...p,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isPrimary]);

  return (
    <div
      className={`${styles.holographicButton} ${
        isPrimary ? styles.primaryButton : styles.secondaryButton
      }`}
      ref={buttonRef}
      onClick={onClick}
    >
      <div className={styles.buttonContent}>
        {icon && <div className={styles.buttonIcon}>{icon}</div>}
        <div className={styles.buttonLabel}>{label}</div>
      </div>

      <div className={styles.floatingParticlesContainer}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.floatingParticle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function SobreMi() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState(null);
  const [tab, setTab] = useState("2");
  const classes = useStyles();

  const openModal = (section) => {
    setModalSection(section);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalSection(null);
  };

  // Renderiza los botones de experiencia para el tab de experiencia
  const renderExperienceButtons = () => (
    <>
      <HolographicButton
        label="Developer"
        onClick={() => openModal("developer")}
        isPrimary={true}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        }
      />
      <HolographicButton
        label="Academic / Teacher"
        onClick={() => openModal("academic")}
        isPrimary={false}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
        }
      />
    </>
  );

  return (
    <div
      id="sobremi-section"
      className={`${sobreMiContainerStyles.padreSobremi} ${sobreMiContainerStyles.smoothTransition}`}
    >
      {/* Section Header */}
      <div data-aos="fade-up" style={{
        textAlign: "center",
        marginBottom: "2.5rem",
        padding: "40px 20px 0",
      }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "rgba(0,243,255,0.6)",
          marginBottom: "10px",
        }}>My journey</p>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 800,
          color: "#fff",
          margin: 0,
          lineHeight: 1.1,
        }}>
          About{" "}
          <span style={{
            background: "linear-gradient(90deg, #00f3ff, #ff9a3c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 12px rgba(0,243,255,0.4))",
          }}>Me</span>
        </h2>
        <div style={{
          width: "60px",
          height: "3px",
          background: "linear-gradient(90deg, #00f3ff, #ff9a3c)",
          borderRadius: "3px",
          margin: "14px auto 0",
          boxShadow: "0 0 12px rgba(0,243,255,0.5)",
        }} />
      </div>

      <div className={sobreMiContainerStyles.profileAboutRow}>
        <ProfileBlock />
        <AboutCardBlock />
      </div>
      <TabsSobreMi
        tab={tab}
        setTab={setTab}
        classes={classes}
        openModal={renderExperienceButtons}
        experiences={experiences}
        modalSection={modalSection}
        modalOpen={modalOpen}
        closeModal={closeModal}
      />
      <ExperienceModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        modalSection={modalSection}
        experiences={experiences}
      />
    </div>
  );
}
