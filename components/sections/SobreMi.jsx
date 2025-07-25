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
import ModalExperiencia from "../ui/ModalExperiencia";
const useStyles = makeStyles((theme) => ({
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#155263",
    },
  },
}));
export default function SobreMi() {
  AOS.init({
    duration: 1000,
  });
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <div className="padreSobremi">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          marginBottom: 32,
          flexWrap: "wrap",
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
      <Box className="sobreMi-tab" data-aos="fade-left" sx={{ width: "100%" }}>
        <TabContext value={value}>
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
              onChange={handleChange}
              aria-label="lab API tabs example"
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
              <ModalExperiencia />
            </TabPanel>
            <TabPanel value="5">
              <ModalCv />
              <Button color="gradient" auto shadow className="btonDescargarPDF">
                <a
                  href="./Eber_Coronel_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Eber_Coronel_CV.pdf"
                >
                  Download pdf
                </a>
              </Button>
            </TabPanel>
          </div>
        </TabContext>
      </Box>
    </div>
  );
}
