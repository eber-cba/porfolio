import React, { useState, useEffect } from "react";
import AOS from "aos";
import { makeStyles } from "@mui/styles";
import sobreMiContainerStyles from "../../styles/SobreMiContainer.module.css";
import ProfileBlock from "./ProfileBlock";
import AboutCardBlock from "./AboutCardBlock";
import TabsSobreMi from "./TabsSobreMi";
import ExperienceCard from "../ui/ExperienceCard";
import { experiences } from "../../data/experiencesData";
import { motion, AnimatePresence } from "framer-motion";
import experienceStyles from "../../styles/ExperienceSection.module.css";

const useStyles = makeStyles(() => ({
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#00f3ff",
      height: 3,
      borderRadius: 3,
      boxShadow: "0 0 10px rgba(0,243,255,0.8), 0 0 20px rgba(0,243,255,0.4)",
    },
    "& .MuiTabs-scrollButtons": {
      color: "rgba(0,243,255,0.5)",
      "&.Mui-disabled": {
        opacity: 0.2,
      },
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
      "@media (max-width: 600px)": {
        fontSize: "0.7rem",
        letterSpacing: "1px",
        padding: "8px 12px",
        minWidth: "auto",
      },
    },
  },
}));

const SciFiTab = ({ label, onClick, isActive, icon }) => {
  return (
    <motion.button
      className={`${experienceStyles.scifiTab} ${isActive ? experienceStyles.activeTab : ""}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow border effect */}
      <div className={experienceStyles.tabGlow} />
      <div className={experienceStyles.tabInner}>
        <div className={experienceStyles.tabIcon}>{icon}</div>
        <span>{label}</span>
      </div>
      {isActive && (
        <motion.div
          className={experienceStyles.activeIndicator}
          layoutId="activeTabIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

export default function SobreMi() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [activeExpTab, setActiveExpTab] = useState("developer");
  const [tab, setTab] = useState("2");
  const classes = useStyles();

  // Renderiza todo el contenido de Experiencia
  const renderExperienceContent = () => (
    <div className={experienceStyles.expContainer}>
      <div className={experienceStyles.tabsRow}>
        <SciFiTab
          label="Developer"
          isActive={activeExpTab === "developer"}
          onClick={() => setActiveExpTab("developer")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
        <SciFiTab
          label="Academic / Teacher"
          isActive={activeExpTab === "academic"}
          onClick={() => setActiveExpTab("academic")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
      </div>

      <div className={experienceStyles.expGrid}>
        <AnimatePresence mode="popLayout">
          {experiences[activeExpTab].map((item, i) => (
            <motion.div
              key={`${activeExpTab}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <ExperienceCard {...item} gradient={item.gradient} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
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
        renderExperienceContent={renderExperienceContent}
      />
    </div>
  );
}
