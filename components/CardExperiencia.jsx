import React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Card } from "@nextui-org/react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardExperiencia() {
  return (
    <div>
      <Card
        className="cardP5"
        bordered
        shadow={false}
        hoverable
        css={{ mw: "400px" }}
      >
        <label className="titulop5">
          {" "}
          PLATAFORMA 5 <img className="imgP5" src="experiencia/p5.jpeg" />{" "}
        </label>
        <label className="cuerpoTexto">I am in charge of: </label>
        <p paragraph className="cuerpoTexto">
          <ul>
            <li>Support the teacher during class hours. </li>
            <li>Answer technical questions.</li>
            <li>Create one quiz per class</li>
            <li>
              Give feedback on possible candidates for the Coding Bootcamp on
              Plataforma 5
            </li>
          </ul>
        </p>
      </Card>
    </div>
  );
}
