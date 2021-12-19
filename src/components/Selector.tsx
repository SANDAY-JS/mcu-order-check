import { SHOWS_STATES } from "../utils/reducer";
import styles from "../styles/scss/Selector.module.scss";

const Selector = ({ dispatch }) => {
  return (
    <div className={styles.selector}>
      <div
        className={styles.changeOrder}
        onClick={() => dispatch(SHOWS_STATES.RELEASE_ORDER)}
      >
        Choose from Release Order
      </div>
      <div
        className={styles.changeOrder}
        onClick={() => dispatch(SHOWS_STATES.RESET)}
      >
        Reset
      </div>
    </div>
  );
};

export default Selector;
