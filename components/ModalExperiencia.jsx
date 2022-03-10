import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BotonExperiencia from "./BotonExperiencia";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#155263",

  boxShadow: 14,
  p: 4,
};

export default function ModalExperiencia() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <BotonExperiencia handleOpen={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modalExperiencia">
          <Typography className="titulo" id="modal-modal-title" variant="h6" component="h2">
            {" "}
            PLATAFORMA 5
          </Typography>
          <Typography  variant="body2"  className="subtitulo">
            March 2022 - Present
          </Typography>
          <label className="subtitulo">
            I am in charge of :
          </label>
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
        </Box>
      </Modal>
    </div>
  );
}
