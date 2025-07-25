import AOS from "aos";
import { Card, Button } from "@nextui-org/react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import LineaDeTime from "../ui/LineaDeTime";
import Acordion from "../ui/Acordion";
import ModalCv from "../ui/ModalCv";
import ExperienceCard from "../ui/ExperienceCard";
import { experiences } from "../../data/experiencesData";
import { Modal } from "@nextui-org/react";
const useStyles = makeStyles((theme) => ({
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#155263",
    },
  },
}));
export default function SobreMi() {
  AOS.init({ duration: 1000 });
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
      className="padreSobremi"
      style={{
        background: "#ffa14a",
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
        <img
          src="/yo.jpg"
          alt="Foto de perfil"
          data-aos="fade-right"
          style={{
            width: 220,
            height: 280,
            objectFit: "cover",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            border: "4px solid #fff",
            background: "#eee",
            transition: "transform 0.4s cubic-bezier(.4,2,.6,1)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/220x280?text=No+Image";
          }}
        />
        <div
          data-aos="fade-left"
          style={{
            maxWidth: 500,
            minWidth: 260,
            background: "rgba(255,255,255,0.85)",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
            padding: 24,
            color: "#155263",
            fontSize: 18,
            fontFamily: "Quicksand, sans-serif",
          }}
        >
          <b style={{ fontSize: 22, color: "#155263" }}>About me</b>
          <div style={{ marginTop: 12 }}>
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
        data-aos="fade-left"
        sx={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}
        style={{
          background: "#ffa14a",
          borderRadius: 24,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "0 12px 32px 12px",
          minHeight: 400,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <TabContext value={tab}>
          <Box
            sx={{
              color: "red",
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
              <div style={{ display: "flex", gap: 24, margin: "32px 0" }}>
                <Button
                  auto
                  color="warning"
                  onClick={() => openModal("desarrollador")}
                >
                  Desarrollador
                </Button>
                <Button
                  auto
                  color="primary"
                  onClick={() => openModal("docente")}
                >
                  Docente / Académico
                </Button>
              </div>
            </TabPanel>
            <TabPanel value="5">
              <ModalCv />
              <a
                href="./Eber_Coronel_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Eber_Coronel_CV.pdf"
                style={{
                  display: "inline-block",
                  padding: "10px 24px",
                  background:
                    "linear-gradient(90deg, #ffb347 60%, #155263 100%)",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: 700,
                  textDecoration: "none",
                  marginTop: 16,
                  boxShadow: "0 2px 8px rgba(21,82,99,0.12)",
                  letterSpacing: 1,
                }}
              >
                Download pdf
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
      >
        <Modal.Header>
          <h2 id="exp-modal-title" style={{ margin: 0 }}>
            {modalSection === "desarrollador"
              ? "Experiencias como Desarrollador"
              : "Experiencias como Docente / Académico"}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
              justifyItems: "center",
              alignItems: "stretch",
              width: "100%",
              maxWidth: 700,
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            {modalSection &&
              experiences[modalSection].map((item, i) => (
                <ExperienceCard
                  key={i}
                  {...item}
                  color={`linear-gradient(${item.gradient})`}
                />
              ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
