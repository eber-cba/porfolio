import React from "react";
import aboutCardStyles from "../../styles/AboutCard.module.css";
import skillsStyles from "../../styles/SkillsIcons.module.css";

export default function AboutCardBlock() {
  return (
    <div data-aos="fade-left" className={aboutCardStyles.aboutCard}>
      <div className={aboutCardStyles.cardShine}></div>
      <div className={aboutCardStyles.aboutTitleContainer}>
        <div className={aboutCardStyles.titleLine}></div>
        <h2 className={aboutCardStyles.aboutTitle}>ABOUT ME</h2>
        <div className={aboutCardStyles.titleLine}></div>
      </div>
      <div className={aboutCardStyles.aboutText}>
        <p>
          <span className={aboutCardStyles.highlight}>Frontend enthusiast</span> with solid experience in <span className={aboutCardStyles.highlight}>React</span> and <span className={aboutCardStyles.highlight}>Node.js</span>. Currently a <span className={aboutCardStyles.highlight}>Full Stack Developer</span> (frontend focus), building Astro components and delivering projects for clients like <span className={aboutCardStyles.highlight}>TECHO</span> and <span className={aboutCardStyles.highlight}>Code & Mate</span>.
        </p>
        <p>
          Also experienced as an instructor and tutor, passionate about sharing knowledge and supporting students.
        </p>
      </div>
      <div className={skillsStyles.skillsIcons}>
        <div className={skillsStyles.skillIcon} data-tooltip="JavaScript">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 630 630"
            fill="#F7DF1E"
          >
            <rect width="630" height="630" fill="none" />
            <path d="M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
          </svg>
        </div>
        <div className={skillsStyles.skillIcon} data-tooltip=".NET">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="#512BD4"
          >
            <path d="M6.5 17.5v13l10 5.9v-13.1l-10-5.8zm35 0l-10 5.9v13.1l10-5.9v-13zm-25 0v13.1l10 5.9v-13.1l-10-5.9z" />
            <path
              d="M24 2.2l-21.3 12v23.6l21.3 12.3 21.3-12.3v-23.6l-21.3-12zm17.3 34.2l-17.3 10-17.3-10v-20l17.3-10 17.3 10v20z"
              fill="#512BD4"
            />
          </svg>
        </div>
        <div className={skillsStyles.skillIcon} data-tooltip="Frontend">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#61DAFB"
          >
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
