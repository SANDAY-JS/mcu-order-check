import Image from "next/image";
import { gsap, Linear } from "gsap";

import styles from "../styles/scss/InitialShows.module.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

  // 画像URL
  const [imageSrces, setImageSrces] = useState<string[]>(baseShowsArr.map((show) => show.cover_url || noPicture))
  useEffect(() => {
    (async() => {
      // 同期で画像URLセット
      const cover_urls = baseShowsArr.map((show) => show.cover_url || noPicture)
      setImageSrces(cover_urls)

      // 非同期で画像のバリデーションチェックｰ>セット
      const validImagesSrc = cover_urls.map(async(url) => {
        const result = await urlExists(url)
        if(result) return url;
        return noPicture;
      })
      console.log("🚀 ~ file: InitialShows.tsx:34 ~ validImagesSrc ~ validImagesSrc:", validImagesSrc)
      setImageSrces(validImagesSrc)
    })()
  }, [baseShowsArr])

  // 画像URLが存在するか否か
  const urlExists = async (url: string) => {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !=404;
  }


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
                src={imageSrces[i]}
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
