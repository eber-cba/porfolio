import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Textarea, Input, Button, Loading } from "@nextui-org/react";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
import { FiSend, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaRegPaperPlane } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import styles from "../../styles/Contact.module.css";

// Inicializar EmailJS
emailjs.init("user_FCHrjVYRSSmBraVrkZWJn");
const useStyles = makeStyles((theme) => ({
  customTooltip: {
    backgroundColor: "#155263",
    borderRadius: "15px",
    padding: "10px 15px",
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    email: "",
    asunto: "",
    message: ""
  });
  const [errors, setErrors] = useState({});

  // Validación de formulario
  const validateForm = () => {
    const newErrors = {};
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.from_name.trim() || !regexName.test(formData.from_name)) {
      newErrors.from_name = "Por favor ingresa un nombre válido";
    }

    if (!formData.email.trim() || !regexEmail.test(formData.email)) {
      newErrors.email = "Por favor ingresa un email válido";
    }

    if (!formData.asunto.trim()) {
      newErrors.asunto = "Por favor ingresa un asunto";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor ingresa un mensaje";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      enqueueSnackbar("Por favor completa todos los campos correctamente", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    try {
      // Configurar los parámetros para el envío de email
      const templateParams = {
        from_name: formData.from_name,
        email: formData.email,
        asunto: formData.asunto,
        message: formData.message,
        to_email: "ebercoronel29@gmail.com"
      };
      
      // Usar sendForm para enviar el formulario directamente
      await emailjs.send(
        "service_5j6ri8j",
        "template_0h0hiuj",
        templateParams,
        "user_FCHrjVYRSSmBraVrkZWJn"
      );
      
      Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado!",
        text: "Tu mensaje ha sido enviado correctamente y será respondido lo antes posible",
        confirmButtonColor: "#155263",
      });
      
      setFormData({
        from_name: "",
        email: "",
        asunto: "",
        message: ""
      });
      e.target.reset();
    } catch (error) {
      console.error("Error al enviar el email:", error);
      Swal.fire({
        icon: "error",
        title: "Error al enviar",
        text: "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.",
        confirmButtonColor: "#155263",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Animaciones para los iconos sociales
  const socialIconVariants = {
    hover: {
      y: -15,
      transition: { duration: 0.3 }
    }
  };
  return (
    <motion.div 
      id="contacto-section" 
      className={styles.padreContacto}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        className={styles.contactTitle}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Contáctame
      </motion.h1>
      
      <div className={styles.contactContainer}>
        <motion.div 
          className={styles.contactFormContainer}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <Input
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Nombre"
                aria-label="Nombre"
                name="from_name"
                value={formData.from_name}
                onChange={handleInputChange}
                status={errors.from_name ? "error" : "default"}
                helperText={errors.from_name}
                helperColor="error"
                contentLeft={<FiSend />}
                className={styles.contactInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <Input
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Email"
                aria-label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                status={errors.email ? "error" : "default"}
                helperText={errors.email}
                helperColor="error"
                contentLeft={<IoMailOutline />}
                className={styles.contactInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <Input
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Asunto"
                aria-label="Asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleInputChange}
                status={errors.asunto ? "error" : "default"}
                helperText={errors.asunto}
                helperColor="error"
                className={styles.contactInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <Textarea
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Mensaje"
                aria-label="Mensaje"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                status={errors.message ? "error" : "default"}
                helperText={errors.message}
                helperColor="error"
                className={styles.contactTextarea}
              />
            </div>
            
            <motion.div 
              className={styles.submitButtonContainer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                shadow
                color="primary"
                auto
                type="submit"
                disabled={loading}
                className={styles.submitButton}
                icon={loading ? null : <FaRegPaperPlane />}
              >
                {loading ? (
                  <Loading color="currentColor" size="sm" />
                ) : (
                  "Enviar mensaje"
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
        
        <motion.div 
          className={styles.contactInfoContainer}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className={styles.contactInfo}>
            <h3 className={styles.contactInfoTitle}>Conectemos</h3>
            <p className={styles.contactInfoText}>
              ¿Tienes alguna pregunta o propuesta? ¡No dudes en contactarme! Estoy disponible para colaboraciones, proyectos freelance o simplemente para charlar sobre tecnología.  
            </p>
            
            <div className={styles.socialLinks}>
              <motion.div
                variants={socialIconVariants}
                whileHover="hover"
                className={styles.socialIconWrapper}
              >
                <Link href="https://github.com/eber-cba">
                  <Tooltip
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customArrow,
                    }}
                    arrow
                    placement="top"
                    title="GitHub"
                  >
                    <IconButton className={`${styles.socialIcon} ${styles.github}`}>
                      <FiGithub size={24} />
                    </IconButton>
                  </Tooltip>
                </Link>
              </motion.div>
              
              <motion.div
                variants={socialIconVariants}
                whileHover="hover"
                className={styles.socialIconWrapper}
              >
                <Link href="https://www.linkedin.com/in/eber-coronel-13536218b/">
                  <Tooltip
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customArrow,
                    }}
                    arrow
                    placement="top"
                    title="LinkedIn"
                  >
                    <IconButton className={`${styles.socialIcon} ${styles.linkedin}`}>
                      <FiLinkedin size={24} />
                    </IconButton>
                  </Tooltip>
                </Link>
              </motion.div>
              
              <motion.div
                variants={socialIconVariants}
                whileHover="hover"
                className={styles.socialIconWrapper}
              >
                <Link href="mailto:ebercoronel29@gmail.com">
                  <Tooltip
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customArrow,
                    }}
                    arrow
                    placement="top"
                    title="Email"
                  >
                    <IconButton className={`${styles.socialIcon} ${styles.email}`}>
                      <FiMail size={24} />
                    </IconButton>
                  </Tooltip>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
