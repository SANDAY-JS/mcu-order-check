import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "../styles/scss/PhaseBox.module.scss";
import { SHOWS_STATES } from "../utils/reducer";

const PhaseBox = ({
  dispatch,
  phaseState,
  setPhaseState,
  foldMenu,
  setCheckboxes,
  animateVariables,
}) => {
  const tl = gsap.timeline({});

  const firstCalled = useRef(true);
  const filterBoxRef = useRef(null);
  const filterCheckboxRef = useRef([]);
  const [checkboxAllChecked, setCheckboxAllChecked] = useState<boolean>(true);

  const setAllPhases = () => {
    // uncheck other check boxes
    filterCheckboxRef.current.forEach((box) => (box.checked = false));
    return setPhaseState([]);
  };

  const addPhaseState = (addedPhase: number) => {
    if (checkboxAllChecked) setCheckboxAllChecked(false);
    if (!phaseState) return setPhaseState([addedPhase]);

    // check if given phase is already included
    const isPhaseIncluded = phaseState.some((state) => state === addedPhase);
    // if it is, remove that phase from the array
    if (isPhaseIncluded)
      return setPhaseState(phaseState.filter((state) => state !== addedPhase));
    // if not, add the given phase to the array
    return setPhaseState([...phaseState, addedPhase]);
  };

  useEffect(() => {
    return setCheckboxes(filterCheckboxRef.current);
  }, []);

  useEffect(() => {
    if (phaseState.length === 0) return setCheckboxAllChecked(true);
  }, [phaseState]);

  useLayoutEffect(() => {
    if (firstCalled.current) {
      firstCalled.current = false;
      return;
    }
    tl.to(filterBoxRef.current, 0, { opacity: 0 }, "start").to(
      filterBoxRef.current,
      animateVariables.duration * 0.75 - 0.1,
      {
        opacity: 1,
        margin: foldMenu ? "auto 0" : "unset",
        ease: animateVariables,
      },
      "+=0.2"
    );
  }, [foldMenu]);
  return (
    <div ref={filterBoxRef} className={styles.phaseSelector}>
      <p>Phase</p>
      <div
        className={styles.phaseSelector__container}
        onClick={() => dispatch(SHOWS_STATES.PHASE)}
      >
        <div className={styles.phaseSelector__container__item}>
          <label htmlFor="all">All</label>
          <input
            type="checkbox"
            id="all"
            onChange={setAllPhases}
            checked={checkboxAllChecked}
          />
        </div>

        {Array(4)
          .fill("")
          .map((_, i) => (
            <div className={styles.phaseSelector__container__item} key={i}>
              <label htmlFor={`phase${i + 1}`}>{i + 1}</label>
              <input
                ref={(el) => (filterCheckboxRef.current[i] = el)}
                type="checkbox"
                id={`phase${i + 1}`}
                onChange={() => addPhaseState(i + 1)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhaseBox;
