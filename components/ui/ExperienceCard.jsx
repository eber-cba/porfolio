import React, { useState, useEffect, useRef } from "react";

const ExperienceCard = ({
  title,
  company,
  period,
  summary,
  details,
  icon,
  color,
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      return () => card.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Calcular rotación basada en la posición del mouse
  const rotateX = isHovered ? (mousePosition.y - 150) / 15 : 0;
  const rotateY = isHovered ? -(mousePosition.x - 150) / 15 : 0;

  return (
    <div
      className="card-3d-container"
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transition: "transform 0.2s",
      }}
    >
      <div
        className="experience-card"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: "25px",
          minWidth: "250px",
          minHeight: "250px",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          boxShadow: isHovered
            ? "0 20px 40px rgba(0,0,0,0.25)"
            : "0 10px 30px rgba(0,0,0,0.15)",
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1,
        }}
      >
        {/* Efecto de borde luminoso */}
        <div className="card-glow" />

        {/* Icono con efecto holográfico */}
        <div
          className="card-icon"
          style={{
            fontSize: "32px",
            marginBottom: "15px",
            transform: `translateZ(30px)`,
            transition: "all 0.4s ease",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </div>

        {/* Contenido de la tarjeta */}
        <h3
          className="card-title"
          style={{
            fontWeight: 700,
            fontSize: "18px",
            color: "#fff",
            marginBottom: "5px",
            transform: `translateZ(30px)`,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {title}
        </h3>

        <div
          className="card-company"
          style={{
            fontWeight: 500,
            fontSize: "15px",
            color: "#ff9a3c",
            marginBottom: "5px",
            transform: `translateZ(20px)`,
          }}
        >
          {company}
        </div>

        <div
          className="card-period"
          style={{
            fontSize: "13px",
            color: "#aaa",
            marginBottom: "10px",
            transform: `translateZ(15px)`,
          }}
        >
          {period}
        </div>

        <div
          className="card-summary"
          style={{
            fontSize: "14px",
            color: "#ddd",
            marginBottom: "10px",
            transform: `translateZ(10px)`,
          }}
        >
          {summary}
        </div>

        {details && (
          <div
            className="card-details"
            style={{
              fontSize: "13px",
              color: "#bbb",
              opacity: 0.8,
              transform: `translateZ(5px)`,
            }}
          >
            {details}
          </div>
        )}

        {/* Efecto de partículas */}
        <div className="card-particles">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                position: "absolute",
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                background: `radial-gradient(circle, rgba(255,154,60,0.8), transparent)`,
                borderRadius: "50%",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle ${
                  Math.random() * 10 + 10
                }s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.6 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Efecto de fondo holográfico */}
        <div
          className="card-hologram"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,154,60,0.15), transparent 70%)`,
            opacity: isHovered ? 1 : 0.3,
            zIndex: -1,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Sombra proyectada */}
      <div
        className="card-shadow"
        style={{
          position: "absolute",
          bottom: "-15px",
          left: "10%",
          width: "80%",
          height: "30px",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "50%",
          filter: "blur(15px)",
          transform: `translateZ(-30px) scale(${isHovered ? 1.1 : 1})`,
          transition: "all 0.4s ease",
          zIndex: 0,
        }}
      />

      <style jsx>{`
        .card-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            45deg,
            #ff9a3c,
            #155263,
            #ff9a3c,
            #155263
          );
          background-size: 400% 400%;
          border-radius: 25px;
          z-index: -1;
          animation: glowBorder 8s linear infinite;
          filter: blur(3px);
          opacity: 0.7;
        }

        @keyframes glowBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .card-icon {
          animation: floatIcon 4s ease-in-out infinite;
        }

        @keyframes floatIcon {
          0%,
          100% {
            transform: translateZ(30px) translateY(0) rotate(0deg);
          }
          50% {
            transform: translateZ(30px) translateY(-5px) rotate(5deg);
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: ${Math.random() * 0.6 + 0.2};
          }
          25% {
            transform: translate(${Math.random() * 40 - 20}px, -20px) scale(1.2);
            opacity: ${Math.random() * 0.8 + 0.2};
          }
          50% {
            transform: translate(${Math.random() * 40 - 20}px, -40px) scale(1.3);
            opacity: ${Math.random() * 0.4 + 0.1};
          }
          75% {
            transform: translate(${Math.random() * 40 - 20}px, -60px) scale(1.1);
            opacity: ${Math.random() * 0.2 + 0.1};
          }
          100% {
            transform: translate(${Math.random() * 40 - 20}px, -80px) scale(0.8);
            opacity: 0;
          }
        }

        .experience-card:hover .card-icon {
          animation: spinIcon 0.8s ease-in-out;
        }

        @keyframes spinIcon {
          0% {
            transform: translateZ(30px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateZ(30px) rotate(180deg) scale(1.2);
          }
          100% {
            transform: translateZ(30px) rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ExperienceCard;
