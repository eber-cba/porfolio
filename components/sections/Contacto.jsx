import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Input, Textarea, Button, Loading } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import styles from "../../styles/Contact.module.css";

emailjs.init("user_FCHrjVYRSSmBraVrkZWJn");

export default function Contact() {
  const form = useRef();
  const [data, setData] = useState({
    from_name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: "success", message: "" });

  const validate = () => {
    const errs = {};
    if (!data.from_name) errs.from_name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = "Valid email needed";
    if (!data.subject) errs.subject = "Subject is required";
    if (!data.message) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await emailjs.send("service_5j6ri8j", "template_0h0hiuj", {
        ...data,
        to_email: "ebercoronel29@gmail.com",
      });
      setAlert({ visible: true, type: "success", message: "¡Tu mensaje ha sido enviado!" });
      setData({ from_name: "", email: "", subject: "", message: "" });
    } catch {
      setAlert({ visible: true, type: "error", message: "¡Ups! Algo salió mal." });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert({ ...alert, visible: false }), 3500);
    }
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 10, 0],
      transition: { duration: 8, repeat: Infinity },
    },
  };

  return (
    <div id="contacto-section" className={styles.page}>
      <motion.div
        className={styles.blob1}
        variants={blobVariants}
        animate="animate"
      />
      <motion.div
        className={styles.blob2}
        variants={blobVariants}
        animate="animate"
      />

      <motion.div
        className={styles.card}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <h1>Contact Me</h1>
        <form ref={form} onSubmit={sendEmail} className={styles.form}>
          {alert.visible && (
            <div className={`${styles.alert} ${styles[alert.type]}`}>{alert.message}</div>
          )}
          <Input
            fullWidth
            clearable
            size="lg"
            name="from_name"
            placeholder="Your Name"
            value={data.from_name}
            onChange={handleChange}
            status={errors.from_name ? "error" : "default"}
            helperText={errors.from_name}
            className={styles.input}
          />
          <Input
            fullWidth
            clearable
            size="lg"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={handleChange}
            status={errors.email ? "error" : "default"}
            helperText={errors.email}
            className={styles.input}
          />
          <Input
            fullWidth
            clearable
            size="lg"
            name="subject"
            placeholder="Subject"
            value={data.subject}
            onChange={handleChange}
            status={errors.subject ? "error" : "default"}
            helperText={errors.subject}
            className={styles.input}
          />
          <Textarea
            fullWidth
            size="lg"
            name="message"
            placeholder="Your Message"
            rows={6}
            value={data.message}
            onChange={handleChange}
            status={errors.message ? "error" : "default"}
            helperText={errors.message}
            className={styles.textarea}
          />
          <Button
            size="lg"
            disabled={loading}
            className={styles.button}
            type="submit"
          >
            {loading ? <Loading size="sm" /> : "Send Message"}
          </Button>
        </form>
        <div className={styles.socials}>
          <a href="https://github.com/eber-cba">
            <FiGithub size={28} />
          </a>
          <a href="https://linkedin.com/in/eber-coronel-13536218b/">
            <FiLinkedin size={28} />
          </a>
          <a href="mailto:ebercoronel29@gmail.com">
            <FiMail size={28} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
