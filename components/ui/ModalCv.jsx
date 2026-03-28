import * as React from "react";
import Modal from "@mui/material/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX, FiExternalLink, FiCode, FiLayers, FiStar, FiBriefcase } from "react-icons/fi";
import styles from "../../styles/ModalCv.module.css";

/* ── Mini skill pill ── */
const Pill = ({ label, color = "cyan" }) => (
  <span className={`${styles.pill} ${color === "orange" ? styles.pillOrange : ""}`}>{label}</span>
);

/* ── Stat card ── */
const Stat = ({ icon: Icon, value, label }) => (
  <motion.div
    className={styles.stat}
    whileHover={{ y: -4, scale: 1.04 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className={styles.statIcon}><Icon size={18} /></div>
    <div className={styles.statValue}>{value}</div>
    <div className={styles.statLabel}>{label}</div>
  </motion.div>
);

export default function ModalCv() {
  const [open, setOpen] = React.useState(false);

  const techSkills = ["React", "Next.js", "Node.js", "TypeScript", "Firebase", "MongoDB", "Redux", "Tailwind"];
  const designSkills = ["Figma", "Material UI", "Framer Motion", "GSAP", "Astro"];

  return (
    <div className={styles.resumeWrapper}>

      {/* ═══════════════════════════
          RESUME CARD
      ═══════════════════════════ */}
      <motion.div
        className={styles.resumeCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Neon top bar */}
        <div className={styles.cardTopBar} />

        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.avatarRing}>
              <div className={styles.avatarInitials}>EC</div>
            </div>
            <div>
              <h3 className={styles.cardName}>Eber Coronel</h3>
              <p className={styles.cardRole}>
                <span className={styles.roleChip}>Full Stack Developer</span>
              </p>
            </div>
          </div>
          <div className={styles.headerBadge}>
            <span className={styles.badgeDot} />
            Available for hire
          </div>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          <Stat icon={FiCode}     value="3+"  label="Years Exp."   />
          <Stat icon={FiLayers}   value="15+" label="Projects"     />
          <Stat icon={FiStar}     value="10+" label="Technologies" />
          <Stat icon={FiBriefcase} value="3"  label="Companies"    />
        </div>

        {/* Skills */}
        <div className={styles.skillsSection}>
          <p className={styles.skillsLabel}>Tech Stack</p>
          <div className={styles.pillRow}>
            {techSkills.map((s) => <Pill key={s} label={s} />)}
          </div>
          <p className={styles.skillsLabel} style={{ marginTop: "10px" }}>Tools & Design</p>
          <div className={styles.pillRow}>
            {designSkills.map((s) => <Pill key={s} label={s} color="orange" />)}
          </div>
        </div>

        {/* Mini timeline */}
        <div className={styles.miniTimeline}>
          {[
            { year: "2023–Now",  role: "Senior Instructor",    place: "Desafío Latam" },
            { year: "2022–Now",  role: "Full Stack Dev",       place: "Code & Mate / Abstract" },
            { year: "2021–2023", role: "Tutor & Developer",    place: "Plataforma 5 / Coderhouse" },
          ].map((item, i) => (
            <div key={i} className={styles.timelineRow}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <span className={styles.timelineYear}>{item.year}</span>
                <span className={styles.timelineRole}>{item.role}</span>
                <span className={styles.timelinePlace}>{item.place}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className={styles.actions}>
          <motion.button
            className={styles.previewBtn}
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiEye size={16} />
            Preview CV
          </motion.button>

          <motion.a
            href="/cv-EberCoronel-FullstackDeveloper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="EberCoronel-FullstackDeveloper.pdf"
            className={styles.downloadBtn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className={styles.downloadBg} />
            <span className={styles.downloadContent}>
              <FiDownload size={16} />
              Download PDF
            </span>
          </motion.a>
        </div>
      </motion.div>

      {/* ═══════════════════════════
          PDF PREVIEW MODAL
      ═══════════════════════════ */}
      <AnimatePresence>
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="cv-preview-modal"
          >
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={styles.modalBox}
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{ scale: 1,   opacity: 1, y: 0  }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                {/* Modal header */}
                <div className={styles.modalHeader}>
                  <div className={styles.modalTitle}>
                    <FiExternalLink size={16} />
                    Eber Coronel — CV
                  </div>
                  <button className={styles.closeBtn} onClick={() => setOpen(false)}>
                    <FiX size={20} />
                  </button>
                </div>
                {/* PDF embed */}
                <div className={styles.pdfWrapper}>
                  <embed
                    src="/cv-EberCoronel-FullstackDeveloper.pdf"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  />
                </div>
                {/* Modal footer */}
                <div className={styles.modalFooter}>
                  <a
                    href="/cv-EberCoronel-FullstackDeveloper.pdf"
                    download="EberCoronel-FullstackDeveloper.pdf"
                    className={styles.modalDownload}
                  >
                    <FiDownload size={14} /> Download a copy
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
