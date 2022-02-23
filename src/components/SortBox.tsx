import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "../styles/scss/SortBox.module.scss";
import { SHOWS_STATES } from "../utils/reducer";

const SortBox = ({
  dispatch,
  isReleaseOrder,
  isChronologicalOrder,
  isBoxOfficeOrder,
  isDurationOrder,
  foldMenu,
  setIsReleaseOrder,
  setIsChronologicalOrder,
  setIsBoxOfficeOrder,
  setIsDurationOrder,
  animateVariables,
}) => {
  const tl = gsap.timeline({});
  const sortMethodRef = useRef([]);

  const [isDispleyNone, setIsDisplayNone] = useState<boolean>(false);

  const resetCurrentOrder = () => {
    setIsReleaseOrder(false);
    setIsChronologicalOrder(false);
    setIsBoxOfficeOrder(false);
    setIsDurationOrder(false);
  };

  const showReleaseOrder = () => {
    resetCurrentOrder();

    setIsReleaseOrder(!isReleaseOrder);
    return dispatch(SHOWS_STATES.RELEASE_ORDER);
  };
  const showBoxOfficeOrder = () => {
    resetCurrentOrder();

    setIsBoxOfficeOrder(!isBoxOfficeOrder);
    return dispatch(SHOWS_STATES.BOX_OFFICE);
  };
  const showChronologicalOrder = () => {
    resetCurrentOrder();

    setIsChronologicalOrder(!isChronologicalOrder);
    return dispatch(SHOWS_STATES.CHRONOLOGY);
  };
  const showDurationOrder = () => {
    resetCurrentOrder();

    setIsDurationOrder(!isDurationOrder);
    return dispatch(SHOWS_STATES.DURATION);
  };

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
    if (sortMethodRef.current[0]?.classList.length !== 4) {
      foldMenu ? setIsDisplayNone(true) : setIsDisplayNone(false);
      return;
    }

    if (isDispleyNone) {
      setIsDisplayNone(false);
    }

    tl.to(sortMethodRef.current, animateVariables.duration, {
      opacity: 1,
      ease: animateVariables.ease,
    });
  }, [foldMenu]);
  return (
    <div
      className={`${styles.selector__itemContainer} ${
        foldMenu ? styles.disablePadding : ""
      } ${isDispleyNone ? styles.displayNone : ""}`}
    >
      {foldMenu ? (
        <>
          {sortMethodRef.current.map((el: HTMLDivElement, i) => {
            if (!el?.classList.contains(styles.active)) return;
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
