import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LineaDeTime from "../ui/LineaDeTime";
import Acordion from "../ui/Acordion";
import ModalCv from "../ui/ModalCv";
import ExperienceCard from "../ui/ExperienceCard";
import sobreMiTabStyles from "../../styles/SobreMiTab.module.css";
import experienceButtonsStyles from "../../styles/ExperienceButtons.module.css";
import downloadButtonStyles from "../../styles/DownloadButton.module.css";

export default function TabsSobreMi({
  tab,
  setTab,
  classes,
  openModal,
  experiences,
  modalSection,
  modalOpen,
  closeModal,
}) {
  const handleTab = (_, val) => setTab(val);
  return (
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
            aria-label="About me tabs"
            centered
            style={{
              background: "rgba(5, 13, 24, 0.7)",
              backdropFilter: "blur(16px)",
              borderRadius: "50px",
              padding: "6px 8px",
              margin: "0 auto",
              maxWidth: "90%",
              border: "1px solid rgba(0, 243, 255, 0.12)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 20px rgba(0,243,255,0.06)",
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
            <div className={experienceButtonsStyles.experienceButtonsContainer}>
              {/* Los botones de experiencia se pasan desde el padre */}
              {typeof openModal === "function" && openModal("renderButtons")}
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
  );
}
