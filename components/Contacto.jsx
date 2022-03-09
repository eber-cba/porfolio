import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import { gsap } from "gsap";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
  customTooltip: {
    // I used the rgba color for the standard "secondary" color
    backgroundColor: "#155263",
    borderRadius: "15px",
  },
  customArrow: {
    color: "#155263",
  },
}));

export default function Contacto() {
  const Swal = require("sweetalert2");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const form = useRef();
  const [button, setButton] = useState(false);

  const messageError = "Please enter your real name";
  const mensajeError = () => {
    enqueueSnackbar(messageError, {
      variant: "error",
    });
  };
  let regexName = new RegExp(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/);

  const valid = (e) => {
    let value = e.target.value;
    if (!regexName.test(value) || /^\s/.test(value)) {
      mensajeError();
      setButton(true);
    } else {
      closeSnackbar();

      setButton(false);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5j6ri8j",
        "template_0h0hiuj",
        form.current,
        "user_FCHrjVYRSSmBraVrkZWJn"
      )
      .then(
        Swal.fire({
          icon: "success",
          title: "Message sent",
          text: "Your message has been sent correctly and will be answered as soon as possible",
        })
      )
      .catch((err) => console.log(err));
    e.target.reset();
  };
  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { duration: 0.5, y: -15 });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { duration: 0.5, y: 0 });
  };
  return (
    <div className="padreContacto">
      <form ref={form} onSubmit={sendEmail} className="form">
        <div className="nombre">
          <Input
            className="inputNombre"
            placeholder="Name "
            type="text"
            name="from_name"
            onKeyUp={valid}
          />
        </div>
        <div className="email">
          <Input
            className="inputEmail"
            placeholder=" Email"
            type="email"
            name="email"
          />
        </div>

        <div className="subjet">
          <Input
            className="inputAsunto"
            placeholder=" Subject "
            type="text"
            name="asunto"
          />
        </div>
        <div className="mensaje">
          <Textarea
            rows={19}
            className="textArea"
            placeholder=" Message "
            name="message"
          />
        </div>
        <div className="boton">
          <Button
            disabled={button}
            className="botonEnviar"
            type="submit"
            value="Send"
          >
            Send
          </Button>
        </div>
      </form>
      <div className="contenedor-seguimeEN">
        <div className="divLabelSeguimeEN">
          <h2 className="linea">
            <span>Follow me on ....</span>
          </h2>
        </div>

        <div className="seguimeEnIcon">
          <div>
            <Link href="https://github.com/eber-cba">
              <Tooltip
                classes={{
                  tooltip: classes.customTooltip,
                  arrow: classes.customArrow,
                }}
                arrow
                placement="bottom"
                title={
                  <>
                    <label className="labelTooltipContacto">GitHub</label>
                  </>
                }
              >
                <IconButton
                  className="iconButton"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                  component="span"
                >
                  <Image
                    src={"/contacto/github.svg"}
                    height="100%"
                    width="100%"
                    name="GitHub"
                    type="logo"
                  />
                </IconButton>
              </Tooltip>
            </Link>
          </div>
          <div>
            <Link href="https://www.linkedin.com/in/eber-coronel-13536218b/">
              <Tooltip
                classes={{
                  tooltip: classes.customTooltip,
                  arrow: classes.customArrow,
                }}
                arrow
                placement="bottom"
                title={
                  <>
                    <label className="labelTooltipContacto">LinkedIn</label>
                  </>
                }
              >
                <IconButton
                  className="iconButton"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                  component="span"
                >
                  <Image
                    src={"/contacto/linkedin.svg"}
                    height="100%"
                    width="100%"
                    name="Linkedin"
                    type="logo"
                  />
                </IconButton>
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
