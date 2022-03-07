import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import styles from "../styles/intro.module.css";
import Input from "@mui/material/Input";
import { gsap } from "gsap";
import Navbar from "./Navbar";
export default function Intro() {
  const [open, setOpen] = useState(true);
  const [nombre, setNombre] = useState("");
  const [button, setButton] = useState(false);
  const [inputError, setInputError] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const messageError = "Please enter your real name";
  const messageAdvertencia = "Please enter your name before entering";

  const Timeline = gsap.timeline({
    defaults: { opacity: 0, duration: 1, ease: "back.out(2)" },
  });

  const mensajeError = () => {
    enqueueSnackbar(messageError, {
      variant: "error",
    });
  };
  const mensajeAdvertencia = () => {
    enqueueSnackbar(messageAdvertencia, {
      variant: "warning",
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  useEffect(() => {
    const Hola = document.querySelectorAll(".Hola");
    const bienvenidx = document.querySelectorAll(".bienvenidx");
    const input = document.querySelectorAll(".input");
    const boton = document.querySelectorAll(".boton");

    Timeline.from(bienvenidx, { y: 100, stagger: 0.3 })
      .from(input, { y: 100, stagger: 0.3 })
      .from(boton, { y: 100, stagger: 0.3 })
      .from(Hola, { y: 100, stagger: 0.5 });
  }, []);

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1.5 });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1 });
  };

  let regexName = new RegExp(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/);

  const valid = (e) => {
    let value = e.target.value;
    if (!regexName.test(value) || /^\s/.test(value)) {
      mensajeError();
      setButton(true);
      setInputError(true);
    } else {
      closeSnackbar();
      setInputError(false);

      setButton(false);
    }
  };

  const validarInput = (e) => {
    e.preventDefault()
    if (!nombre) {
      mensajeAdvertencia();
    } else {
      closeSnackbar();
      handleClose();
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <form className={styles.form}>
          <label id={styles.bienvenidx} className="bienvenidx">
            ¡WELCOME!
          </label>

          <Input
            className="input"
            id={styles.input}
            variant="standard"
            onChange={onChangeNombre}
            value={nombre}
            onKeyUp={valid}
            placeholder="Enter your name
            "
            autoComplete="off"
            label={inputError ? "Error" : null}
            color={inputError ? "error" : "warning"}
            autoFocus
            margin="dense"
          />
          <Button
            id={styles.boton}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="boton"
            disabled={button}
            onClick={validarInput}
            type="submit"

          >
            Get in
          </Button>
        </form>
      </Backdrop>

      {open === false ? <Navbar open={open} nombre={nombre} /> : null}

      {/* {open === false ? (
        
      ) : null} */}
    </div>
  );
}
