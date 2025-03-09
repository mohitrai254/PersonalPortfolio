/* eslint-disable react/no-unescaped-entities */
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";
import { memo, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const serviceDetails = {
  "Front-end Developer": {
    description: `Creating exceptional digital experiences through modern web development.

Key Focus Areas:
• Modern Framework Mastery: React, Next.js, Redux
• Performance Optimization: Fast load times, smooth interactions
• UI/UX Excellence: Responsive design, modern animations
• Technical Innovation: PWAs, SSR, modern state management

Recent Projects:
• E-commerce platform with real-time inventory
• Interactive dashboard with data visualization
• Progressive Web App with offline functionality`,
  },
  "AWS Certified Cloud Practitioner": {
    description: `Architecting scalable cloud solutions with AWS expertise.

Key Skills:
• Cloud Architecture: Designing robust, scalable solutions
• Infrastructure: Serverless, containers, high-availability
• Security & Compliance: Data protection, access management
• Cost Optimization: Resource planning and monitoring

Recent Implementations:
• Serverless microservices architecture
• Multi-region disaster recovery
• Automated CI/CD pipelines`,
  },
  "Automation Tester": {
    description: `Ensuring software excellence through comprehensive testing.

Key Expertise:
• Test Automation: Selenium, Cypress, API testing
• Framework Design: BDD, TDD, CI/CD integration
• Performance Testing: Load testing, security testing
• Quality Assurance: Cross-browser compatibility

Achievements:
• 80% reduction in regression testing time
• AI-powered test automation implementation
• Zero critical bugs in production releases`,
  },
};

const About = memo(function About() {
  const [selectedService, setSelectedService] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (selectedService) {
      navbar.style.display = "none";
    } else {
      navbar.style.display = "flex";
    }

    return () => {
      navbar.style.display = "flex";
    };
  }, [selectedService]);

  const handleNextImage = () => {
    if (selectedService) {
      setActiveImageIndex(
        (prev) => (prev + 1) % serviceDetails[selectedService].images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedService) {
      setActiveImageIndex((prev) =>
        prev === 0
          ? serviceDetails[selectedService].images.length - 1
          : prev - 1
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/mohit_about.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>Front-end Developer</h3>
              <p>
                I'm a frontend developer with experience in building responsive
                and optimized websites using React.
              </p>
              <button
                className={styles.knowMoreBtn}
                onClick={() => {
                  setSelectedService("Front-end Developer");
                  setActiveImageIndex(0);
                }}
              >
                Know More
              </button>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>AWS Certified Cloud Practitioner</h3>
              <p>
                Foundational, high-level understanding of AWS Cloud services and
                technology.
              </p>
              <button
                className={styles.knowMoreBtn}
                onClick={() => {
                  setSelectedService("AWS Certified Cloud Practitioner");
                  setActiveImageIndex(0);
                }}
              >
                Know More
              </button>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="UI icon" />
            <div className={styles.aboutItemText}>
              <h3>Automation Tester</h3>
              <p>
                ISTQB certified tester with hands on experience on automation
                testing.
              </p>
              <button
                className={styles.knowMoreBtn}
                onClick={() => {
                  setSelectedService("Automation Tester");
                  setActiveImageIndex(0);
                }}
              >
                Know More
              </button>
            </div>
          </li>
        </ul>
      </div>

      {selectedService && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <div className={styles.modalText}>
              <h3>{selectedService}</h3>
              <p>{serviceDetails[selectedService].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default About;
