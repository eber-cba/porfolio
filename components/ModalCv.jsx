import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@nextui-org/react";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "50%",
  bgcolor: "#155263",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        color='gradient'
        auto
        shadow
        className='openBoton'
        onClick={handleOpen}
      >
        Open resume 🚀{" "}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <embed
            src='/Fullstack_EberCoronel_cv.pdf'
            frameBorder='0'
            width='100%'
            height='900px'
          />
        </Box>
      </Modal>
    </div>
  );
}
