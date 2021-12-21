import { SHOWS_STATES } from "../utils/reducer";
import styles from "../styles/scss/Selector.module.scss";

const Selector = ({ dispatch }) => {
  return (
    <div className={`need-darMode-status ${styles.selector}`}>
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
          <input type="checkbox" id="phase1" />
        </div>
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase2">2</label>
          <input type="checkbox" id="phase12" />
        </div>
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase3">3</label>
          <input type="checkbox" id="phase3" />
        </div>
        <div className={styles.phaseSelector__item}>
          <label htmlFor="phase4">4</label>
          <input type="checkbox" id="phase4" />
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
