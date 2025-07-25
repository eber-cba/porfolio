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

// Animaciones personalizadas
import styles from "../../styles/SobreMi.module.css";

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

// Componente de botón personalizado
const HolographicButton = ({ label, onClick, isPrimary, icon }) => {
  const buttonRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [hover, setHover] = useState(false);

  const createParticle = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticle = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 8 + 3,
      color: isPrimary ? "rgba(255, 154, 60, 0.8)" : "rgba(21, 82, 99, 0.8)",
      life: Math.random() * 20 + 10,
    };

    setParticles((prev) => [...prev, newParticle]);
  };

  useEffect(() => {
    if (particles.length === 0) return;

    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 100);

    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div
      className={`${styles.holographicButton} ${
        isPrimary ? styles.primaryButton : styles.secondaryButton
      }`}
      ref={buttonRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={createParticle}
      onClick={onClick}
    >
      <div className={styles.buttonContent}>
        {icon && <div className={styles.buttonIcon}>{icon}</div>}
        <div className={styles.buttonLabel}>{label}</div>
      </div>

      <div
        className={`${styles.holographicEffect} ${hover ? styles.active : ""}`}
      ></div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life / 30,
          }}
        />
      ))}
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

  const handleTab = (_, val) => setTab(val);

  return (
    <div
      className={`padreSobremi ${styles.smoothTransition}`}
      style={{
        background: "linear-gradient(135deg, #ff9a3c 0%, #e68a35 100%)",
        minHeight: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        boxSizing: "border-box",
        padding: "32px 0 64px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowX: "hidden",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          marginBottom: 32,
          flexWrap: "wrap",
          width: "100%",
          maxWidth: 1100,
        }}
      >
        <div className={styles.profilePictureContainer} data-aos="fade-right">
          <div className={styles.profilePictureHalo}></div>
          <img
            src="/yo.jpg"
            alt="Foto de perfil"
            className={styles.profileImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/220x280?text=No+Image";
            }}
          />
        </div>

        <div data-aos="fade-left" className={styles.aboutCard}>
          <div className={styles.cardShine}></div>
          <b className={styles.aboutTitle}>About me</b>
          <div className={styles.aboutText}>
            As a child I was passionate about looking at the world from another
            perspective and I did and continue to do so through photography.
            Then I met the graphic design that allowed me to create new worlds.
            Today I can implement these passions as a Full Stack Developer in
            web programming with JavaScript and object-oriented programming with
            Microsoft .NET (c#). My last challenge was to carry out a Coding
            Bootcamp for more than 800 hours in Platform 5, in which I found an
            affinity for the Front-End.
          </div>
        </div>
      </div>

      <Box
        className="sobreMi-tab"
        data-aos="fade-up"
        sx={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          padding: "0 12px 32px 12px",
          minHeight: 400,
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
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

          <div className="tabSobreMi">
            <TabPanel value="2">
              <LineaDeTime />
            </TabPanel>

            <TabPanel value="3">
              <Acordion />
            </TabPanel>

            <TabPanel value="4">
              <div className={styles.experienceButtonsContainer}>
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
                className={styles.neonDownloadButton}
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
            {modalSection === "desarrollador"
              ? "Experiencias como Desarrollador"
              : "Experiencias como Docente / Académico"}
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

      <div className={styles.floatingParticles}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={styles.particleBg}
            style={{
              "--i": i,
              "--size": `${Math.random() * 20 + 5}px`,
              "--duration": `${Math.random() * 20 + 10}s`,
              "--delay": `${Math.random() * 5}s`,
              "--color": `rgba(21, 82, 99, ${Math.random() * 0.4 + 0.1})`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
