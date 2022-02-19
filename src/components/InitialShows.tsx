import Image from "next/image";
import { gsap, Linear } from "gsap";

import styles from "../styles/scss/InitialShows.module.scss";
import { useLayoutEffect, useRef } from "react";

const InitialShows = ({ baseShowsArr, noPicture }) => {
  const containerRef = useRef(null);
  const animatedContainerRef = useRef(null);

  const tl = gsap.timeline({ repeat: -1, yoyo: true });

  useLayoutEffect(() => {
    tl.to(".animatedContainer", 20, {
      x: -(animatedContainerRef.current.clientWidth - window.innerWidth),
      ease: Linear.easeNone,
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.initialShowsContainer}>
      <div
        ref={animatedContainerRef}
        className={`animatedContainer ${styles.initialShowContainer}`}
      >
        {baseShowsArr.map((show, i) => (
          <div key={i} className={styles.initialShowContainer__showItem}>
            <div
              key={show.cover_url}
              className={styles.initialShowContainer__showItem__imageWrap}
            >
              <Image
                src={show.cover_url ?? noPicture}
                alt={show.title}
                width={256}
                height={379}
                layout="intrinsic"
              />
              <span
                className={
                  styles.initialShowContainer__showItem__imageWrap__copyright
                }
              >
                @ {show.release_date?.slice(0, 4)} Disney / Marvel
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InitialShows;
