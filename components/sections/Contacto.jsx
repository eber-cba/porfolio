import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiSend, FiUser, FiAtSign, FiMessageSquare, FiBookOpen, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import styles from "../../styles/Contact.module.css";

emailjs.init("user_FCHrjVYRSSmBraVrkZWJn");

/* ── Particle burst on send ── */
function ParticleBurst({ active }) {
  const particles = Array.from({ length: 18 }, (_, i) => i);
  return (
    <AnimatePresence>
      {active && (
        <div className={styles.burstContainer}>
          {particles.map((i) => {
            const angle = (i / particles.length) * 360;
            const rad = (angle * Math.PI) / 180;
            const dist = 60 + Math.random() * 40;
            return (
              <motion.span
                key={i}
                className={styles.burstParticle}
                style={{ background: i % 3 === 0 ? "#00f3ff" : i % 3 === 1 ? "#ff9a3c" : "#fff" }}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: Math.cos(rad) * dist,
                  y: Math.sin(rad) * dist,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.02 }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}

/* ── Floating neon rings (background deco) ── */
function NeonRings() {
  return (
    <div className={styles.rings}>
      {[1, 2, 3].map((r) => (
        <motion.div
          key={r}
          className={styles[`ring${r}`]}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20 + r * 8, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ── Individual glowing input ── */
function NeonField({ icon: Icon, label, name, type = "text", value, onChange, error, rows }) {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? "textarea" : "input";
  return (
    <motion.div
      className={`${styles.fieldWrapper} ${focused ? styles.focused : ""} ${error ? styles.hasError : ""}`}
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className={styles.fieldIcon}>
        <Icon size={16} />
      </div>
      <div className={styles.fieldInner}>
        <label className={`${styles.floatLabel} ${(focused || value) ? styles.floatUp : ""}`}>
          {label}
        </label>
        <Tag
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={rows}
          className={rows ? styles.textarea : styles.input}
          autoComplete="off"
        />
      </div>
      {/* animated bottom line */}
      <motion.div
        className={styles.fieldLine}
        animate={{ scaleX: focused ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3 }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            className={styles.fieldError}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const form = useRef();
  const [data, setData] = useState({ from_name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: "success", message: "" });
  const [burst, setBurst] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  /* Scanline animation on the card */
  useEffect(() => {
    const id = setInterval(() => setScanLine((v) => (v + 1) % 101), 16);
    return () => clearInterval(id);
  }, []);

  const validate = () => {
    const errs = {};
    if (!data.from_name) errs.from_name = "Name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Valid email needed";
    if (!data.subject) errs.subject = "Subject required";
    if (!data.message) errs.message = "Message required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await emailjs.send("service_5j6ri8j", "template_0h0hiuj", {
        ...data,
        to_email: "ebercoronel29@gmail.com",
      });
      setBurst(true);
      setTimeout(() => setBurst(false), 900);
      setAlert({ visible: true, type: "success", message: "Message sent! I'll be in touch soon 🚀" });
      setData({ from_name: "", email: "", subject: "", message: "" });
    } catch {
      setAlert({ visible: true, type: "error", message: "Something went wrong. Try again!" });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert((a) => ({ ...a, visible: false })), 4000);
    }
  };

  const stagger = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } }),
  };

  const socialLinks = [
    { href: "https://github.com/eber-cba",               icon: FiGithub,   label: "GitHub"   },
    { href: "https://linkedin.com/in/eber-coronel-13536218b/", icon: FiLinkedin, label: "LinkedIn" },
    { href: "mailto:ebercoronel29@gmail.com",             icon: FiMail,     label: "Email"    },
  ];

  return (
    <div id="contacto-section" className={styles.page}>
      <NeonRings />

      {/* Grid: left info panel + right form */}
      <div className={styles.grid}>

        {/* ── LEFT PANEL ── */}
        <motion.div
          className={styles.infoPanel}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className={styles.eyebrow}>Get in touch</p>
          <h2 className={styles.infoTitle}>
            Let's build something<br />
            <span className={styles.infoGradient}>amazing together</span>
          </h2>
          <p className={styles.infoDesc}>
            Open to full-time opportunities, freelance projects and interesting collaborations.
            Drop me a message and I'll reply within 24 hours.
          </p>

          {/* Contact info rows */}
          <div className={styles.infoRows}>
            {[
              { icon: FiMail,   label: "Email",    value: "ebercoronel29@gmail.com" },
              { icon: FiGithub, label: "GitHub",   value: "eber-cba"               },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className={styles.infoRow}>
                <div className={styles.infoRowIcon}><Icon size={16} /></div>
                <div>
                  <p className={styles.infoRowLabel}>{label}</p>
                  <p className={styles.infoRowValue}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div className={styles.socials}>
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialIcon}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Decorative grid dots */}
          <div className={styles.dotGrid} aria-hidden="true">
            {Array.from({ length: 25 }).map((_, i) => (
              <span key={i} className={styles.dot} />
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT FORM ── */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          {/* Scanline shimmer */}
          <div
            className={styles.scanLine}
            style={{ top: `${scanLine}%` }}
            aria-hidden="true"
          />

          <h3 className={styles.formTitle}>Send a Message</h3>

          {/* Alert banner */}
          <AnimatePresence>
            {alert.visible && (
              <motion.div
                key="alert"
                className={`${styles.alert} ${styles[alert.type]}`}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {alert.type === "success"
                  ? <FiCheckCircle size={20} className={styles.alertIcon} />
                  : <FiAlertCircle  size={20} className={styles.alertIcon} />}
                <span>{alert.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form ref={form} onSubmit={sendEmail} className={styles.form} noValidate>
            {[
              { name: "from_name", label: "Your Name",    icon: FiUser,        i: 0 },
              { name: "email",     label: "Your Email",   icon: FiAtSign,      i: 1 },
              { name: "subject",   label: "Subject",      icon: FiBookOpen,    i: 2 },
            ].map(({ name, label, icon, i }) => (
              <motion.div key={name} custom={i} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <NeonField
                  icon={icon}
                  label={label}
                  name={name}
                  value={data[name]}
                  onChange={handleChange}
                  error={errors[name]}
                />
              </motion.div>
            ))}

            <motion.div custom={3} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <NeonField
                icon={FiMessageSquare}
                label="Your Message"
                name="message"
                value={data.message}
                onChange={handleChange}
                error={errors.message}
                rows={5}
              />
            </motion.div>

            {/* Submit button with particle burst */}
            <motion.div className={styles.btnWrapper} style={{ position: "relative" }}>
              <ParticleBurst active={burst} />
              <motion.button
                type="submit"
                disabled={loading}
                className={styles.sendButton}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={styles.btnBg} />
                <span className={styles.btnContent}>
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      <FiSend size={18} />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
