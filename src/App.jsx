import { lazy, Suspense } from "react";
import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import ChatBot from "./components/ChatBot/ChatBot";

const About = lazy(() => import("./components/About/About"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contact/Contact"));

const LoadingFallback = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    Loading...
  </div>
);

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <About />
        <Experience />
        <Projects />
        <Contact />
      </Suspense>
      <ChatBot />
    </div>
  );
}

export default App;
