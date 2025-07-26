// src/components/ModernAccordion.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiAstro,
  SiReact,
  SiContentful,
  SiFirebase,
  SiNodedotjs,
  SiReactrouter,
  SiMysql,
} from "react-icons/si";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaHandsHelping,
  FaSmile,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import styles from "../../styles/Accordion.module.css";

const projects = [
  {
    id: 1,
    title: "BAOBABS CLUB THEATER",
    subtitle: "Theater Community SPA",
    description:
      "A modern platform for theater enthusiasts to discover performances, workshops, and connect with local theater groups. Features event calendars, ticket booking, and community forums.",
    technologies: [
      { name: "Astro", icon: <SiAstro />, color: "#FF9A3C" },
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Contentful", icon: <SiContentful />, color: "#2478CC" },
      { name: "React Router", icon: <SiReactrouter />, color: "#CA4245" },
    ],
    link: "https://teatro-baobabs.pages.dev",
    repo: "https://github.com/eber-cba/teatro-baobabs",
    accentColor: "#FF6B6B",
  },
  {
    id: 2,
    title: "PLUTO CUSTOM",
    subtitle: "Vintage Clothing E-Commerce",
    description:
      "Curated marketplace for unique vintage fashion pieces. Features real-time inventory management, secure checkout, and personalized recommendations based on user preferences.",
    technologies: [
      { name: "Astro", icon: <SiAstro />, color: "#FF9A3C" },
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
      { name: "Contentful", icon: <SiContentful />, color: "#2478CC" },
      { name: "Node.js", icon: <SiNodedotjs />, color: "#8CC84B" },
    ],
    link: "https://plutocustom.netlify.app",
    repo: "https://github.com/eber-cba/pluto-front",
    accentColor: "#8CC84B",
  },
  {
    id: 3,
    title: "ABRAZAR",
    subtitle: "Community Support Platform",
    description:
      "Non-profit initiative connecting volunteers with homeless individuals. Enables resource coordination, location tracking of assistance points, and real-time needs reporting.",
    technologies: [
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Node.js", icon: <SiNodedotjs />, color: "#8CC84B" },
      { name: "MySQL", icon: <SiMysql />, color: "#00758F" },
      { name: "Community", icon: <FaHandsHelping />, color: "#E68A35" },
    ],
    link: "https://abrazar-app.org",
    repo: "https://github.com/eber-cba/abrazar",
    accentColor: "#61DAFB",
  },
  {
    id: 4,
    title: "CODE Y MATE",
    subtitle: "Programming Academy Platform",
    description:
      "Comprehensive learning platform for coding bootcamps featuring interactive lessons, coding challenges, progress tracking, and mentor matching system for students.",
    technologies: [
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
    ],
    link: "https://codeymate.app",
    repo: "https://github.com/yourusername/code-y-mate",
    accentColor: "#FFCA28",
  },
];

const ModernAccordion = () => {
  const [activeId, setActiveId] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    icon: null,
    position: { x: 0, y: 0 },
  });
  const notificationTimeoutRef = useRef(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const showNotification = (message, icon = <FaSmile />, e) => {
    // Clear any existing timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    // Get position from click event (center bottom of button)
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.bottom;

    // Hide current notification if showing
    setNotification({
      show: false,
      message: "",
      icon: null,
      position: { x, y },
    });

    // Show new notification after a small delay
    setTimeout(() => {
      setNotification({
        show: true,
        message,
        icon,
        position: { x, y },
      });

      // Hide notification after 3 seconds
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification({
          show: false,
          message: "",
          icon: null,
          position: { x, y },
        });
      }, 3000);
    }, 100);
  };

  const handleLinkClick = (e, projectId, linkType) => {
    // Show notification for specific projects/links
    if (projectId === 3 && linkType === "demo") {
      e.preventDefault();
      showNotification(
        "Ups! Esto aún no está disponible 😊",
        <FaSmile className={styles.smileIcon} />,
        e
      );
    } else if (projectId === 4) {
      e.preventDefault();
      if (linkType === "demo") {
        showNotification(
          "El demo de Code y Mate aún no está disponible 😊",
          <FaSmile className={styles.smileIcon} />,
          e
        );
      } else if (linkType === "repo") {
        showNotification(
          "El repositorio de Code y Mate aún no está disponible 😊",
          <FaSmile className={styles.smileIcon} />,
          e
        );
      }
    }
    // Other links will behave normally
  };

  return (
    <div className={styles.container}>
      {/* Notification Overlay */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className={styles.notification}
            style={{
              left: notification.position.x,
              top: notification.position.y,
              transform: "translate(-50%, 8px)",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.5,
            }}
          >
            <div className={styles.notificationContent}>
              <div className={styles.notificationIcon}>{notification.icon}</div>
              <p className={styles.notificationText}>{notification.message}</p>
            </div>
            <motion.button
              className={styles.closeButton}
              onClick={() =>
                setNotification({
                  show: false,
                  message: "",
                  icon: null,
                  position: { x: 0, y: 0 },
                })
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoMdClose />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.headerSection}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.sectionTitle}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={styles.sectionSubtitle}
        >
          Interactive showcase of my recent work
        </motion.p>
      </div>

      <div className={styles.accordion}>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={`${styles.accordionItem} ${
              activeId === project.id ? styles.active : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: project.id * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className={styles.accordionHeader}
              onClick={() => toggleAccordion(project.id)}
              style={{
                background: `linear-gradient(90deg, ${project.accentColor}20, transparent)`,
              }}
            >
              <div className={styles.headerContent}>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
              <motion.div
                className={styles.accordionIcon}
                animate={{ rotate: activeId === project.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" fill="currentColor" />
                </svg>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {activeId === project.id && (
                <motion.div
                  className={styles.accordionContent}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: 0.4, ease: "easeInOut" },
                      opacity: { duration: 0.3, delay: 0.1 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3, ease: "easeInOut" },
                      opacity: { duration: 0.2 },
                    },
                  }}
                >
                  <div className={styles.contentInner}>
                    <p className={styles.description}>{project.description}</p>

                    <div className={styles.techStack}>
                      <h4>Technologies Used</h4>
                      <div className={styles.techIcons}>
                        {project.technologies.map((tech, index) => (
                          <motion.div
                            key={index}
                            className={styles.techItem}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: {
                                delay: 0.1 * index,
                                duration: 0.3,
                              },
                            }}
                            whileHover={{ scale: 1.1, y: -5 }}
                          >
                            <div
                              className={styles.techIcon}
                              style={{
                                color: tech.color,
                                background: `${tech.color}20`,
                              }}
                            >
                              {tech.icon}
                            </div>
                            <span>{tech.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.projectLinks}>
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: project.accentColor }}
                        onClick={(e) => handleLinkClick(e, project.id, "demo")}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </motion.a>
                      <motion.a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.linkButton} ${styles.secondary}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleLinkClick(e, project.id, "repo")}
                      >
                        <FaGithub /> View Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.footerNote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p>
          Hover over technology icons to see details • Click to explore projects
        </p>
      </motion.div>
    </div>
  );
};

export default ModernAccordion;
