import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";
import { ScrollReveal } from "../ScrollReveal";
import "../../animations.css";

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send the form data to your email
      await emailjs.sendForm(
        "service_3cbnma4",
        "template_4d00l29",
        form.current,
        "5y6SgvIU5PYGwjg_n"
      );

      setSubmitStatus("success");
      form.current.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={styles.container} id="contact">
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out - let's create something amazing together!</p>
      </div>
      <div className={styles.contentWrapper}>
        <ScrollReveal>
          <form
            ref={form}
            onSubmit={sendEmail}
            className={`${styles.form} animate-slideIn`}
          >
            <input type="hidden" name="to_name" value="Mohit" />
            <div className={`${styles.formGroup} hover-lift`}>
              <input
                type="text"
                name="user_name"
                placeholder="Your Name *"
                required
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} hover-lift`}>
              <input
                type="email"
                name="user_email"
                placeholder="Your Email *"
                required
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} hover-lift`}>
              <input
                type="tel"
                name="user_phone"
                placeholder="Your Phone Number"
                pattern="[0-9]{10}"
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} hover-lift`}>
              <textarea
                name="message"
                placeholder="Your Message *"
                required
                className={styles.textarea}
              />
            </div>
            <button
              type="submit"
              className={`${styles.submitButton} hover-scale`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus === "success" && (
              <p className={`${styles.successMessage} animate-fadeIn`}>
                Thank you for your message! I&apos;ll get back to you shortly.
              </p>
            )}
            {submitStatus === "error" && (
              <p className={`${styles.errorMessage} animate-fadeIn`}>
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </form>
        </ScrollReveal>

        <ScrollReveal>
          <ul className={`${styles.links} stagger-children`}>
            <li className={`${styles.link} hover-lift`}>
              <img
                src={getImageUrl("contact/emailIcon.png")}
                alt="Email icon"
              />
              <a href="mailto:mohitrai254@gmail.com">mohitrai254@gmail.com</a>
            </li>
            <li className={`${styles.link} hover-lift`}>
              <img
                src={getImageUrl("contact/linkedinIcon.png")}
                alt="LinkedIn icon"
              />
              <a href="https://www.linkedin.com/in/mohitrai254">
                linkedin.com/in/mohitrai254
              </a>
            </li>
            <li className={`${styles.link} hover-lift`}>
              <img
                src={getImageUrl("contact/githubIcon.png")}
                alt="Github icon"
              />
              <a href="https://github.com/mohitrai254">
                github.com/mohitrai254
              </a>
            </li>
          </ul>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Contact;
