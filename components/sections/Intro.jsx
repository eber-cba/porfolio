import React from "react";
import Navbar from "../layout/Navbar";
import AboutMe from "./AboutMe";
import SobreMi from "./SobreMi";
import Habilidades from "../Habilidades";
import Contacto from "./Contacto";

export default function Intro() {
  return (
    <div className="padreIntro">
      <Navbar nombre="" />
      <AboutMe />
      <SobreMi />
      <Habilidades />
      <Contacto />
    </div>
  );
}
