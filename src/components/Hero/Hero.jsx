/* eslint-disable react/no-unescaped-entities */
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { FaReact, FaAws, FaNodeJs, FaPython } from "react-icons/fa";
import { SiJavascript, SiTypescript } from "react-icons/si";

export const Hero = () => {
  const el = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    // Typing animation
    const typed = new Typed(el.current, {
      strings: ["Hi, I'm Mohit", "I'm a Developer", "I'm an Innovator"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    // Particle animation
    const ctx = canvas.current.getContext("2d");
    let particles = [];

    const init = () => {
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;

      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.current.width,
          y: Math.random() * canvas.current.height,
          radius: Math.random() * 2,
          dx: (Math.random() - 0.5) * 2,
          dy: (Math.random() - 0.5) * 2,
        });
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      particles.forEach((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.current.width)
          particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.current.height)
          particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();

        particles.forEach((p2) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - p2.x, 2) + Math.pow(particle.y - p2.y, 2)
          );
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
    };

    init();
    animate();

    window.addEventListener("resize", init);

    return () => {
      typed.destroy();
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <section className={styles.container}>
      <canvas ref={canvas} className={styles.particles} />
      <div className={styles.techIcons}>
        <FaReact className={styles.floatingIcon} style={{ "--delay": "0s" }} />
        <FaAws className={styles.floatingIcon} style={{ "--delay": "1s" }} />
        <FaNodeJs className={styles.floatingIcon} style={{ "--delay": "2s" }} />
        <FaPython className={styles.floatingIcon} style={{ "--delay": "3s" }} />
        <SiJavascript
          className={styles.floatingIcon}
          style={{ "--delay": "4s" }}
        />
        <SiTypescript
          className={styles.floatingIcon}
          style={{ "--delay": "5s" }}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span ref={el}></span>
        </h1>
        <p className={styles.description}>
          A good learner and regular practitioner of exploring new things.
        </p>
        <div className={styles.cta}>
          <a
            href="https://drive.google.com/file/d/1w4avlazEzyLd9rwhlW1V6tCtBhTaJbGn/view?pli=1"
            className={styles.contactBtn}
          >
            Resume
          </a>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>3+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Projects Completed</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.heroImg} ${styles.glowingEffect}`}>
        <img src={getImageUrl("hero/mohit.jpg")} alt="Hero image of me" />
        <div className={styles.glow}></div>
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
