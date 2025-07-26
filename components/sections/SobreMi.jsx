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

const useStyles = makeStyles((theme) => ({
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#155263",
      height: 4,
      borderRadius: 4,
    },
    "& .MuiTab-root": {
      color: "#155263",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "1.1rem",
      textTransform: "none",
      padding: "12px 24px",
      transition: "all 0.3s ease",
      "&:hover": {
        color: "#ff9a3c",
        transform: "translateY(-2px)",
      },
      "&.Mui-selected": {
        color: "#155263",
        fontWeight: 700,
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
  const profileRef = useRef(null);
  const textRef = useRef(null);

  const openModal = (section) => {
    setModalSection(section);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalSection(null);
  };

  const handleTab = (_, val) => setTab(val);

  return (
    <div
      className={`${sobreMiContainerStyles.padreSobremi} ${sobreMiContainerStyles.smoothTransition}`}
    >
      <div className={profileStyles.profileSection}>
        <div className={profileStyles.decorativeCircles}></div>

        <div
          className={profileStyles.profilePictureContainer}
          data-aos="fade-right"
          ref={profileRef}
        >
          <div className={profileStyles.profileHaloOuter}></div>
          <div className={profileStyles.profileHaloInner}></div>

          <div className={profileStyles.profileFrame}>
            <img
              src="/yo.jpg"
              alt="Profile"
              className={profileStyles.profileImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x400?text=Profile+Image";
              }}
            />
          </div>

          <div className={profileStyles.profileParticles}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={profileStyles.profileParticle}
                style={{
                  animationDuration: `${Math.random() * 6 + 4}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  width: `${Math.random() * 20 + 10}px`,
                  height: `${Math.random() * 20 + 10}px`,
                  background: `radial-gradient(circle, ${
                    i % 2 === 0 ? "#ff9a3c" : "#155263"
                  }, transparent)`,
                }}
              />
            ))}
          </div>

          <div className={profileStyles.nameTag}>
            <div className={profileStyles.nameTagInner}>
              <span className={profileStyles.nameFirst}>EBER</span>
              <span className={profileStyles.nameLast}>CORONEL</span>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-left"
          className={aboutCardStyles.aboutCard}
          ref={textRef}
        >
          <div className={aboutCardStyles.cardShine}></div>

          <div className={aboutCardStyles.aboutTitleContainer}>
            <div className={aboutCardStyles.titleLine}></div>
            <h2 className={aboutCardStyles.aboutTitle}>ABOUT ME</h2>
            <div className={aboutCardStyles.titleLine}></div>
          </div>

          <div className={aboutCardStyles.aboutText}>
            <p>
              <span className={aboutCardStyles.highlight}>
                My graphic design knowledge
              </span>{" "}
              and passion for learning new technologies led me to become a{" "}
              <span className={aboutCardStyles.highlight}>
                Full Stack Developer
              </span>{" "}
              with expertise in web programming with{" "}
              <span className={aboutCardStyles.highlight}>JavaScript</span> and
              object-oriented programming with{" "}
              <span className={aboutCardStyles.highlight}>
                Microsoft .NET (C#)
              </span>
              .
            </p>
            <p>
              My latest challenge was completing an{" "}
              <span className={aboutCardStyles.highlight}>
                800+ hour Coding Bootcamp
              </span>
              , where I discovered my affinity for{" "}
              <span className={aboutCardStyles.highlight}>Front-End</span>{" "}
              development.
            </p>
          </div>

          <div className={skillsStyles.skillsIcons}>
            <div className={skillsStyles.skillIcon} data-tooltip="JavaScript">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 630 630"
                fill="#F7DF1E"
              >
                <rect width="630" height="630" fill="none" />
                <path d="M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
              </svg>
            </div>
            <div className={skillsStyles.skillIcon} data-tooltip=".NET">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                fill="#512BD4"
              >
                <path d="M6.5 17.5v13l10 5.9v-13.1l-10-5.8zm35 0l-10 5.9v13.1l10-5.9v-13zm-25 0v13.1l10 5.9v-13.1l-10-5.9z" />
                <path
                  d="M24 2.2l-21.3 12v23.6l21.3 12.3 21.3-12.3v-23.6l-21.3-12zm17.3 34.2l-17.3 10-17.3-10v-20l17.3-10 17.3 10v20z"
                  fill="#512BD4"
                />
              </svg>
            </div>
            <div className={skillsStyles.skillIcon} data-tooltip="Frontend">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#61DAFB"
              >
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Box
        className={sobreMiTabStyles.sobreMiTab}
        data-aos="fade-up"
        sx={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}
      >
        <TabContext value={tab}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TabList
              id="tabList"
              className={classes.tabs}
              onChange={handleTab}
              aria-label="lab API tabs example"
              centered
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50px",
                padding: "8px",
                margin: "0 auto",
                maxWidth: "90%",
              }}
            >
              <Tab
                label={<label className="tituloTab">Education</label>}
                value="2"
              />
              <Tab
                label={<label className="tituloTab">Projects</label>}
                value="3"
              />
              <Tab
                label={<label className="tituloTab">Experience</label>}
                value="4"
              />
              <Tab
                label={<label className="tituloTab">Resume</label>}
                value="5"
              />
            </TabList>
          </Box>

          <div className={sobreMiTabStyles.tabSobreMi}>
            <TabPanel value="2">
              <LineaDeTime />
            </TabPanel>

            <TabPanel value="3">
              <Acordion />
            </TabPanel>

            <TabPanel value="4">
              <div
                className={experienceButtonsStyles.experienceButtonsContainer}
              >
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
              </div>
            </TabPanel>

            <TabPanel value="5">
              <ModalCv />
              <a
                href="./Eber_Coronel_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Eber_Coronel_CV.pdf"
                className={downloadButtonStyles.neonDownloadButton}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Download PDF
              </a>
            </TabPanel>
          </div>
        </TabContext>
      </Box>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        width={800}
        closeButton
        aria-labelledby="exp-modal-title"
        className="custom-modal"
        css={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Modal.Header>
          <h2
            id="exp-modal-title"
            style={{
              margin: 0,
              background: "linear-gradient(90deg, #ff9a3c, #155263)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              fontSize: "2rem",
            }}
          >
            {modalSection === "developer"
              ? "Development Experience"
              : "Academic Experience"}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
              width: "100%",
              maxWidth: 700,
              boxSizing: "border-box",
              padding: "12px",
            }}
          >
            {modalSection &&
              experiences[modalSection].map((item, i) => (
                <ExperienceCard
                  key={i}
                  {...item}
                  color={`linear-gradient(${item.gradient})`}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                />
              ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
