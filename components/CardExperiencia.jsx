import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Card className="cardP5" sx={{ maxWidth: 270 }}>
        <CardHeader
          title="Assistant in classes
          programming"
          subheader={
            <>
              <label className="subheader">March 03, 2022</label>
            </>
          }
        />
        <CardMedia
          component="img"
          height="120"
          image="/experiencia/p5.jpeg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" className="subEncabezado">
            PLATAFORMA 5
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className="cuerpoTexto" paragraph>
              I am in charge of :
            </Typography>
            <p paragraph className="cuerpoTexto">
              <ul>
                <li>Support the teacher during class hours. </li>
                <li>Answer technical questions.</li>
                <li>Create one quiz per class</li>
                <li>
                  Give feedback on possible candidates for the Coding Bootcamp
                  on Plataforma 5
                </li>
              </ul>
            </p>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
