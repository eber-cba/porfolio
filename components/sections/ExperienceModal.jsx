import React from "react";
import { Modal } from "@nextui-org/react";
import ExperienceCard from "../ui/ExperienceCard";

export default function ExperienceModal({
  modalOpen,
  closeModal,
  modalSection,
  experiences,
}) {
  return (
    <Modal
      open={modalOpen}
      onClose={closeModal}
      width={800}
      closeButton
      aria-labelledby="exp-modal-title"
      className="custom-modal"
      css={{
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Modal.Header>
        <h2
          id="exp-modal-title"
          style={{
            margin: 0,
            background: "linear-gradient(90deg, #ff9a3c, #155263)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
            fontSize: "2rem",
          }}
        >
          {modalSection === "developer"
            ? "Development Experience"
            : "Academic Experience"}
        </h2>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            width: "100%",
            maxWidth: 700,
            boxSizing: "border-box",
            padding: "12px",
          }}
        >
          {modalSection &&
            experiences[modalSection].map((item, i) => (
              <ExperienceCard
                key={i}
                {...item}
                color={`linear-gradient(${item.gradient})`}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              />
            ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
