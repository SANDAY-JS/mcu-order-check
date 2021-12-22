import { SHOWS_STATES } from "../utils/reducer";
import styles from "../styles/scss/Selector.module.scss";
import { FcSearch } from "react-icons/fc";

const Selector = ({ dispatch, phaseState, setPhaseState }) => {
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

  return (
    <div className={`${styles.selector}`}>
      {/* Search Box */}
      <div
        className={styles.searchContainer}
        // onClick={() => dispatch(SHOWS_STATES.BOX_OFFICE)}
      >
        <FcSearch className={styles.searchIcon} />
        <input type="text" className={styles.textInput} />
      </div>
      <div
        className={styles.changeOrder}
        onClick={() => dispatch(SHOWS_STATES.RELEASE_ORDER)}
      >
        Choose from Release Order
      </div>
      <div
        className={styles.changeOrder}
        onClick={() => dispatch(SHOWS_STATES.BOX_OFFICE)}
      >
        Choose from Box Office
      </div>
      <div
        className={`${styles.changeOrder} ${styles.phaseSelector}`}
        onClick={() => dispatch(SHOWS_STATES.PHASE)}
      >
        Choose from Phases:
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase1">1</label>
          <input
            type="checkbox"
            id="phase1"
            onChange={() => addPhaseState(1)}
          />
        </div>
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase2">2</label>
          <input
            type="checkbox"
            id="phase12"
            onChange={() => addPhaseState(2)}
          />
        </div>
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase3">3</label>
          <input
            type="checkbox"
            id="phase3"
            onChange={() => addPhaseState(3)}
          />
        </div>
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase4">4</label>
          <input
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
      <div
        className={`${styles.changeOrder} ${styles.resetButton}`}
        onClick={() => dispatch(SHOWS_STATES.RESET)}
      >
        Reset
      </div>
    </div>
  );
};

export default Selector;
