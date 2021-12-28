import styles from "../styles/scss/Selector.module.scss";
import { SHOWS_STATES } from "../utils/reducer";
import { FcSearch } from "react-icons/fc";
import { useEffect, useRef } from "react";

const Selector = ({
  dispatch,
  phaseState,
  setPhaseState,
  isBoxOfficeOrder,
  setIsBoxOfficeOrder,
  isReleaseOrder,
  setIsReleaseOrder,
}) => {
  // checkboxRef in phaseState
  const filterCheckboxRef = useRef([]);

  const addPhaseState = (addedPhase: number) => {
    if (!phaseState) return setPhaseState([addedPhase]);

    // check if a phase state is included
    const isPhaseIncluded = phaseState.some((state) => state === addedPhase);
    // if it is, remove that phase from the array
    if (isPhaseIncluded)
      return setPhaseState(phaseState.filter((state) => state !== addedPhase));
    // if not, add the phase to the array
    return setPhaseState([...phaseState, addedPhase]);
  };

  const showReleaseOrder = () => {
    if (isBoxOfficeOrder) {
      setIsBoxOfficeOrder(false);
    }
    setIsReleaseOrder(!isReleaseOrder);
    return dispatch(SHOWS_STATES.RELEASE_ORDER);
  };

  const showBoxOfficeOrder = () => {
    if (isReleaseOrder) {
      setIsReleaseOrder(false);
    }
    setIsBoxOfficeOrder(!isBoxOfficeOrder);

    return dispatch(SHOWS_STATES.BOX_OFFICE);
  };

  const resetShows = () => {
    // uncheck all checkboxes
    filterCheckboxRef.current.forEach((box) => (box.checked = false));
    // reset phaseState, isBoxOfficeOrder, isReleaseOrder
    setPhaseState([]);
    setIsReleaseOrder(false);
    setIsBoxOfficeOrder(false);

    return dispatch(SHOWS_STATES.RESET);
  };

  return (
    <div className={styles.selector}>
      {/* Search Box */}
      <div
        className={styles.searchContainer}
        // onClick={() => dispatch(SHOWS_STATES.BOX_OFFICE)}
      >
        <FcSearch className={styles.searchIcon} />
        <input type="text" className={styles.textInput} />
      </div>

      {/* Release Order */}
      <div
        className={`${styles.changeOrder} ${isReleaseOrder && styles.active}`}
        onClick={showReleaseOrder}
      >
        Choose from Release Order
      </div>

      {/* Box Office Order */}
      <div
        className={`${styles.changeOrder} ${isBoxOfficeOrder && styles.active}`}
        onClick={showBoxOfficeOrder}
      >
        Choose from Box Office
      </div>

      {/* Phase Order */}
      <div
        className={`${styles.changeOrder} ${styles.phaseSelector}`}
        onClick={() => dispatch(SHOWS_STATES.PHASE)}
      >
        Choose from Phases:
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase1">1</label>
          <input
            ref={(el) => (filterCheckboxRef.current[0] = el)}
            type="checkbox"
            id="phase1"
            onChange={() => addPhaseState(1)}
          />
        </div>
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase2">2</label>
          <input
            ref={(el) => (filterCheckboxRef.current[1] = el)}
            type="checkbox"
            id="phase2"
            onChange={() => addPhaseState(2)}
          />
        </div>
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase3">3</label>
          <input
            ref={(el) => (filterCheckboxRef.current[2] = el)}
            type="checkbox"
            id="phase3"
            onChange={() => addPhaseState(3)}
          />
        </div>
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase4">4</label>
          <input
            ref={(el) => (filterCheckboxRef.current[3] = el)}
            type="checkbox"
            id="phase4"
            onChange={() => addPhaseState(4)}
          />
        </div>
      </div>

      {/* <div
        className={styles.changeOrder}
        onClick={() => dispatch(SHOWS_STATES.RELEASE_ORDER)}
      >
        Choose from Characters
      </div> */}

      {/* <div
        className={styles.changeOrder}
        onClick={() => dispatch(SHOWS_STATES.RELEASE_ORDER)}
      >
        Choose from Categories
      </div> */}

      {/* Reset */}
      <div
        className={`${styles.changeOrder} ${styles.resetButton}`}
        onClick={resetShows}
      >
        Reset
      </div>
    </div>
  );
};

export default Selector;
