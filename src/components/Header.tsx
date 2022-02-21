import { useLayoutEffect, useRef } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { ImSun } from "react-icons/im";
import styles from "../styles/scss/Header.module.scss";
import gsap from "gsap";

const Header = ({ darkMode, setDarkMode, animateVariables }) => {
  const firstUpdate = useRef(true);

  const tl = gsap.timeline({});

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    tl.addLabel("start")
      .to(
        ".animatedBox",
        animateVariables.duration,
        {
          color: darkMode ? animateVariables.white : animateVariables.black,
          backgroundColor: darkMode
            ? animateVariables.black
            : animateVariables.white,
          ease: animateVariables.ease,
        },
        "start"
      )
      .to(
        "body",
        animateVariables.duration,
        {
          color: darkMode ? animateVariables.white : animateVariables.black,
          backgroundColor: darkMode
            ? animateVariables.black
            : animateVariables.white,
          ease: animateVariables.ease,
        },
        "start"
      );
  }, [darkMode]);

  return (
    <div className={styles.header}>
      <div className={styles.createdBy}>
        created by{" "}
        <a
          href="https://github.com/SANDAY-JS"
          target="_blank"
          rel="noopener noreferrer"
        >
          SANDAY-JS
        </a>
      </div>

      <h2 className={styles.pageTitle}>MCU ORDER CHECK</h2>

      <div
        className={`animatedBox keepShowDetail ${styles.switchArea} ${
          darkMode && styles.darkMode
        }`}
      >
        <input
          id="switch"
          type="checkbox"
          className={styles.switch}
          onClick={() => setDarkMode(!darkMode)}
        />
        <label htmlFor="switch">
          <ImSun
            className={`${styles.sun} ${
              darkMode ? styles.fadeIn : styles.fadeOut
            }`}
          />
          <MdOutlineDarkMode
            className={`${styles.moon} ${
              darkMode ? styles.fadeOut : styles.fadeIn
            }`}
          />
        </label>
      </div>
    </div>
  );
};

export default Header;
