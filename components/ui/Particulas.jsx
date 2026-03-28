import Particles from "react-tsparticles";

const particlesInit = (main) => {};
const particlesLoaded = (container) => {};

const Particulas = () => {
  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: { value: "#050d18" },
          },
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: { enable: false },
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: false,
            },
            modes: {
              grab: {
                distance: 180,
                links: { opacity: 0.6, color: "#00f3ff" },
              },
            },
          },
          particles: {
            /* ── Node dots ── */
            color: {
              value: ["#ffffff", "#a0e8ff", "#c8f0ff"],
            },
            /* ── Constellation lines ── */
            links: {
              color: "#ffffff",
              distance: 140,
              enable: true,
              opacity: 0.07,
              width: 0.8,
              triangles: { enable: false },
            },
            collisions: { enable: false },
            move: {
              direction: "none",
              enable: true,
              outMode: "out",
              random: true,
              speed: 0.3,
              straight: false,
              attract: { enable: false },
            },
            number: {
              density: { enable: true, area: 900 },
              value: 100,
            },
            /* ── Twinkling opacity ── */
            opacity: {
              value: { min: 0.05, max: 0.7 },
              animation: {
                enable: true,
                speed: 0.8,
                minimumValue: 0.05,
                sync: false,
              },
            },
            shape: { type: "circle" },
            /* ── Star sizes ── */
            size: {
              value: { min: 0.5, max: 2.5 },
              random: true,
              animation: {
                enable: true,
                speed: 1.5,
                minimumValue: 0.3,
                sync: false,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default Particulas;
