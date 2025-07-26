import React, { useRef } from "react";
import profileStyles from "../../styles/ProfileSection.module.css";

export default function ProfileBlock() {
  const profileRef = useRef(null);
  return (
    <div className={profileStyles.profileSection}>
      <div className={profileStyles.decorativeCircles}></div>
      <div
        className={profileStyles.profilePictureContainer}
        data-aos="fade-right"
        ref={profileRef}
      >
        <div className={profileStyles.profileHaloOuter}></div>
        <div className={profileStyles.profileHaloInner}></div>
        <div className={profileStyles.profileFrame}>
          <img
            src="/yo.jpg"
            alt="Profile"
            className={profileStyles.profileImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x400?text=Profile+Image";
            }}
          />
        </div>
        <div className={profileStyles.profileParticles}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={profileStyles.profileParticle}
              style={{
                animationDuration: `${Math.random() * 6 + 4}s`,
                animationDelay: `${Math.random() * 2}s`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                background: `radial-gradient(circle, ${
                  i % 2 === 0 ? "#ff9a3c" : "#155263"
                }, transparent)`,
              }}
            />
          ))}
        </div>
        <div className={profileStyles.nameTag}>
          <div className={profileStyles.nameTagInner}>
            <span className={profileStyles.nameFirst}>EBER</span>
            <span className={profileStyles.nameLast}>CORONEL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
