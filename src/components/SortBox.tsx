import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import styles from "../styles/scss/SortBox.module.scss";

const SortBox = ({
  isReleaseOrder,
  showReleaseOrder,
  isChronologicalOrder,
  showChronologicalOrder,
  isBoxOfficeOrder,
  showBoxOfficeOrder,
  isDurationOrder,
  showDurationOrder,
  foldMenu,
}) => {
  const tl = gsap.timeline({});
  const sortMethodRef = useRef([]);
  const sortMethodElements = [
    <div
      ref={(el) => (sortMethodRef.current[0] = el)}
      key={"ReleaseOrder"}
      className={`${styles.changeOrder} ${styles.unvisible} ${
        isReleaseOrder && styles.active
      } ${styles.chosenMenu}`}
      onClick={showReleaseOrder}
    >
      <span>Release Date</span>
    </div>,
    <div
      ref={(el) => (sortMethodRef.current[0] = el)}
      key={"ChronologicalOrder"}
      className={`${styles.changeOrder} ${styles.unvisible} ${
        isChronologicalOrder && styles.active
      } ${styles.chosenMenu}`}
      onClick={showChronologicalOrder}
    >
      <span>Chronology</span>
    </div>,

    <div
      ref={(el) => (sortMethodRef.current[0] = el)}
      key={"BoxOfficeOrder"}
      className={`${styles.changeOrder} ${styles.unvisible} ${
        isBoxOfficeOrder && styles.active
      } ${styles.chosenMenu}`}
      onClick={showBoxOfficeOrder}
    >
      <span>Box Office</span>
    </div>,

    <div
      ref={(el) => (sortMethodRef.current[0] = el)}
      key={"DurationOrder"}
      className={`${styles.changeOrder} ${styles.unvisible} ${
        isDurationOrder && styles.active
      } ${styles.chosenMenu}`}
      onClick={showDurationOrder}
    >
      <span>Duration</span>
    </div>,
  ];

  useLayoutEffect(() => {
    if (sortMethodRef.current[0]?.classList.length !== 4) return;
    tl.to(
      sortMethodRef.current,
      0.3,
      { opacity: 1, position: "absolute", y: "-50%", top: "25%" },
      0.2
    );
  }, [foldMenu]);
  return (
    <div className={styles.selector__itemContainer}>
      {foldMenu ? (
        <>
          {sortMethodRef.current.map((el: HTMLDivElement, i) => {
            if (!el.classList.contains(styles.active)) return;
            return sortMethodElements[i];
          })}
        </>
      ) : (
        <>
          <p
            className={`${styles.selector__itemContainer__title} ${
              foldMenu ? styles.unvisible : ""
            }`}
          >
            Sort
          </p>

          {/* Release Order */}
          <div
            ref={(el) => (sortMethodRef.current[0] = el)}
            className={`${styles.changeOrder} ${
              foldMenu ? styles.unvisible : ""
            } ${isReleaseOrder && styles.active}`}
            onClick={showReleaseOrder}
          >
            <span>Release Date</span>
          </div>

          {/* Chronology Order */}
          <div
            ref={(el) => (sortMethodRef.current[1] = el)}
            className={`${styles.changeOrder} ${
              foldMenu ? styles.unvisible : ""
            } ${isChronologicalOrder && styles.active}`}
            onClick={showChronologicalOrder}
          >
            <span>Chronology</span>
          </div>

          {/* Box Office Order */}
          <div
            ref={(el) => (sortMethodRef.current[2] = el)}
            className={`${styles.changeOrder} ${
              foldMenu ? styles.unvisible : ""
            } ${isBoxOfficeOrder && styles.active}`}
            onClick={showBoxOfficeOrder}
          >
            <span>Box Office</span>
          </div>

          {/* Box Office Order */}
          <div
            ref={(el) => (sortMethodRef.current[3] = el)}
            className={`${styles.changeOrder} ${
              foldMenu ? styles.unvisible : ""
            } ${isDurationOrder && styles.active}`}
            onClick={showDurationOrder}
          >
            <span>Duration</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SortBox;
