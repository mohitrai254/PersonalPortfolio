/* eslint-disable react/no-unescaped-entities */
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";
import { memo, useState } from "react";
import { FaTimes } from "react-icons/fa";

const serviceDetails = {
  "Front-end Developer": {
    images: [
      "about/frontend-1.jpg",
      "about/frontend-2.jpg",
      "about/frontend-3.jpg",
    ],
    description: `Creating exceptional digital experiences through modern web development.

I transform ideas into interactive realities using cutting-edge technologies and best practices in frontend development. My approach combines aesthetic design with technical excellence.

Key Focus Areas:
Modern Framework Mastery
Leveraging React and Next.js to build dynamic, responsive applications that provide seamless user experiences across all devices.

Performance Optimization
Implementing advanced optimization techniques to ensure lightning-fast load times and smooth interactions, resulting in improved user engagement and conversion rates.

UI/UX Excellence
Creating intuitive interfaces with modern design patterns and smooth animations that delight users while maintaining accessibility standards.

Technical Innovation
Staying at the forefront of web technologies, implementing features like:
- Progressive Web Apps for offline capabilities
- Server-Side Rendering for optimal performance
- Modern state management for complex applications
- Responsive layouts using modern CSS techniques

Recent Projects Highlight:
✦ E-commerce platform with real-time inventory
✦ Interactive dashboard with data visualization
✦ Progressive Web App with offline functionality`,
  },
  "AWS Certified Cloud Practitioner": {
    images: ["about/aws-1.jpg", "about/aws-2.jpg", "about/aws-3.jpg"],
    description: `Architecting scalable cloud solutions with AWS expertise.

My AWS certification reflects my commitment to cloud excellence and ability to design robust, scalable solutions for modern applications.

Cloud Architecture Excellence:
I specialize in designing and implementing cloud-native solutions that leverage AWS's powerful service ecosystem.

Infrastructure Innovation:
Creating flexible and resilient infrastructure using:
- Serverless computing with AWS Lambda
- Containerization with ECS and EKS
- High-availability architectures
- Auto-scaling solutions

Security & Compliance:
Implementing industry best practices for:
- Data protection and encryption
- Access management and security
- Compliance frameworks
- Network security

Cost Optimization:
Strategic resource planning and implementation of:
- Pay-as-you-go models
- Resource scaling strategies
- Cost monitoring and optimization
- Budget management tools

Recent Implementations:
✦ Serverless microservices architecture
✦ Multi-region disaster recovery solution
✦ Automated CI/CD pipelines with AWS`,
  },
  "Automation Tester": {
    images: [
      "about/testing-1.jpg",
      "about/testing-2.jpg",
      "about/testing-3.jpg",
    ],
    description: `Ensuring software excellence through comprehensive testing strategies.

As an ISTQB certified tester, I bring a systematic approach to quality assurance, combining technical expertise with strategic testing methodologies.

Testing Excellence:
Implementing comprehensive testing strategies that ensure robust and reliable software delivery.

Automation Framework Design:
Creating scalable and maintainable test automation frameworks using:
- Selenium WebDriver for web applications
- Cypress for modern web testing
- API testing with Postman and REST Assured
- Performance testing with JMeter

Quality Assurance Innovation:
Advanced testing methodologies including:
- Behavior Driven Development (BDD)
- Test Driven Development (TDD)
- Continuous Testing in CI/CD
- Mobile application testing

Performance Optimization:
Specialized in:
- Load testing and performance analysis
- Scalability testing
- Security testing
- Cross-browser compatibility

Recent Achievements:
✦ 80% reduction in regression testing time
✦ Implementation of AI-powered test automation
✦ Zero critical bugs in production releases`,
  },
};

const About = memo(function About() {
  const [selectedService, setSelectedService] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
        <div className={styles.modal} onClick={() => setSelectedService(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedService(null)}
            >
              <FaTimes />
            </button>
            <div className={styles.modalBody}>
              <div className={styles.modalImageSlider}>
                <button
                  className={`${styles.sliderBtn} ${styles.prevBtn}`}
                  onClick={handlePrevImage}
                >
                  ‹
                </button>
                <div className={styles.modalImage}>
                  <img
                    src={getImageUrl(
                      serviceDetails[selectedService].images[activeImageIndex]
                    )}
                    alt={`${selectedService} ${activeImageIndex + 1}`}
                  />
                  <div className={styles.imageDots}>
                    {serviceDetails[selectedService].images.map((_, index) => (
                      <span
                        key={index}
                        className={`${styles.dot} ${
                          index === activeImageIndex ? styles.activeDot : ""
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                <button
                  className={`${styles.sliderBtn} ${styles.nextBtn}`}
                  onClick={handleNextImage}
                >
                  ›
                </button>
              </div>
              <div className={styles.modalText}>
                <h3>{selectedService}</h3>
                <p>{serviceDetails[selectedService].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default About;
