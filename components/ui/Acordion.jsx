import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
    title: "BAOBABS CLUB",
    subtitle: "Theater Community SPA",
    description:
      "A modern platform for theater enthusiasts to discover performances, workshops, and connect with local theater groups. Features event calendars, ticket booking, and community forums.",
    technologies: [
      { name: "Astro", icon: <SiAstro />, color: "#FF9A3C" },
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Contentful", icon: <SiContentful />, color: "#2478CC" },
      { name: "Router", icon: <SiReactrouter />, color: "#CA4245" },
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
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
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
    ],
    link: "https://abrazar-app.org",
    repo: "https://github.com/eber-cba/abrazar",
    accentColor: "#00f3ff",
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

// --- Magnetic & 3D Tilt Card Component ---
const ProjectCard = ({ project, showNotification }) => {
  const cardRef = useRef(null);
  
  // Spotlight coordinates state
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the motion values setting stiffness and damping to prevent jitter
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  // Transform x,y to rotation values for the tilt effect (max 8 degrees tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Detect mobile devices to disable the 3D hover completely (performance/UX)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position within the card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to [-0.5, 0.5] for the 3D tilt
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    // Spotlight effect percentage
    const spotX = (mouseX / width) * 100;
    const spotY = (mouseY / height) * 100;
    setMousePos({ x: spotX, y: spotY });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    // Reset spring to center
    x.set(0);
    y.set(0);
    setMousePos({ x: 50, y: 50 });
  };

  const handleLinkClick = (e, linkType) => {
    if (project.title === "ABRAZAR" && linkType === "demo") {
      e.preventDefault();
      showNotification("Ups! Esto aún no está disponible 😊", <FaSmile />, e);
    } else if (project.title === "CODE Y MATE") {
      e.preventDefault();
      if (linkType === "demo") {
        showNotification("El demo de Code y Mate aún no está disponible 😊", <FaSmile />, e);
      } else if (linkType === "repo") {
        showNotification("El repositorio de Code y Mate es privado 😊", <FaSmile />, e);
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.cardWrapper}
      style={{
        rotateX: isHovered && !isMobile ? rotateX : 0,
        rotateY: isHovered && !isMobile ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={styles.cardInner}
        style={{
          "--mouse-x": `${mousePos.x}%`,
          "--mouse-y": `${mousePos.y}%`,
        }}
      >
        {/* Blurry background accent matched to project color */}
        <div 
          className={styles.accentGlow} 
          style={{ background: project.accentColor }} 
        />

        <div className={styles.cardContent} style={{ transform: "translateZ(30px)" }}>
          <div className={styles.cardHeader}>
            <p className={styles.suptitle} style={{ color: project.accentColor }}>
              {project.subtitle}
            </p>
            <h3 className={styles.title}>{project.title}</h3>
          </div>

          <div className={styles.hiddenContent}>
            <p className={styles.description}>{project.description}</p>
            
            <div className={styles.techRow}>
              {project.technologies.map((tech, i) => (
                <div key={i} className={styles.techPill}>
                  <span className={styles.techIcon} style={{ color: tech.color }}>
                    {tech.icon}
                  </span>
                  {tech.name}
                </div>
              ))}
            </div>

            <div className={styles.projectLinks}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.linkButton} ${styles.primary}`}
                style={{ backgroundColor: project.accentColor }}
                onClick={(e) => handleLinkClick(e, "demo")}
              >
                <FaExternalLinkAlt size={14} /> View Project
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.linkButton} ${styles.secondary}`}
                onClick={(e) => handleLinkClick(e, "repo")}
              >
                <FaGithub size={16} /> Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Container Component ---
const ModernAccordion = () => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    icon: null,
    position: { x: 0, y: 0 },
  });
  const notificationTimeoutRef = useRef(null);

  const showNotification = (message, icon = <FaSmile />, e) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    // Default position (fallback)
    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;

    // Center notification visually near the click location
    if (e && e.target) {
      const rect = e.target.getBoundingClientRect();
      px = rect.left + rect.width / 2;
      py = rect.bottom + 20; 
    }

    setNotification({ show: false, message: "", icon: null, position: { x: px, y: py } });

    setTimeout(() => {
      setNotification({ show: true, message, icon, position: { x: px, y: py } });
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification({ show: false, message: "", icon: null, position: { x: px, y: py } });
      }, 3500);
    }, 50);
  };

  return (
    <div className={styles.container}>
      {/* Dynamic Notifications */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className={styles.notification}
            initial={{ opacity: 0, scale: 0.8, y: -20, left: notification.position.x, top: notification.position.y }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{ transform: "translateX(-50%)" }}
          >
            <div className={styles.notificationIcon}>{notification.icon}</div>
            <p className={styles.notificationText}>{notification.message}</p>
            <button className={styles.closeButton} onClick={() => setNotification({ ...notification, show: false })}>
              <IoMdClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.headerSection}>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionTitle}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={styles.sectionSubtitle}
        >
          An interactive gallery of selected works exploring technology, design, and communities.
        </motion.p>
      </div>

      <div className={styles.bentoGrid}>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            showNotification={showNotification} 
          />
        ))}
      </div>
    </div>
  );
};

export default ModernAccordion;
