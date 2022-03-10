import AOS from "aos";
import { Card } from "@nextui-org/react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import LineaDeTime from "./LineaDeTime";
import Acordion from "./Acordion";
import ModalCv from "./ModalCv";
 
import ModalExperiencia from "./ModalExperiencia";
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
      <div className="kard">
        <Card
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="card"
          animated
          hoverable
          clickable
          cover
        >
          <Card.Image
            src="/yo.jpg"
            height={600}
            width={500}
            alt="Card image background"
          />
        </Card>
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
                label={
                  <>
                    <label className="tituloTab">About me</label>
                  </>
                }
                value="1"
              />
              <Tab
                label={
                  <>
                    <label className="tituloTab">Education</label>
                  </>
                }
                value="2"
              />
              <Tab
                label={
                  <>
                    <label className="tituloTab">Projects</label>
                  </>
                }
                value="3"
              />
              <Tab
                label={
                  <>
                    <label className="tituloTab">Experience</label>
                  </>
                }
                value="4"
              />
              <Tab
                label={
                  <>
                    <label className="tituloTab">Resume</label>
                  </>
                }
                value="5"
              />
            </TabList>
          </Box>
          <div className="tabSobreMi">
            <TabPanel value="1">
              <label className="label-Aboutme">
                {" "}
                As a child I was passionate about looking at the world from
                another perspective and I did and continue to do so through
                photography. Then I met the graphic design that allowed me to
                create new worlds. Today I can implement these passions as a
                Full Stack Developer in web programming with JavaScript and
                object-oriented programming with Microsoft .NET (c#). My last
                challenge was to carry out a Coding Bootcamp for more than 800
                hours in Platform 5, in which I found an affinity for the
                Front-End.
              </label>
            </TabPanel>
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
            </TabPanel>
          </div>
        </TabContext>
      </Box>
    </div>
  );
}
