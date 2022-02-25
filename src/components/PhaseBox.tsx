import gsap from "gsap";
import { NextPage } from "next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "../styles/scss/PhaseBox.module.scss";
import { SHOWS_STATES } from "../utils/reducer";

interface Props {
  dispatch: Function;
  phaseState: number[];
  setPhaseState: Function;
  setCheckboxes: Function;
  foldMenu: boolean;
  animateVariables: any;
}

const PhaseBox: NextPage<Props> = ({
  dispatch,
  phaseState,
  setPhaseState,
  foldMenu,
  setCheckboxes,
  animateVariables,
}) => {
  const tl = gsap.timeline({});
  const phaseLength = 4;

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

    if (!foldMenu) return;

    tl.set(filterBoxRef.current, { opacity: 0 });
    tl.to(filterBoxRef.current, animateVariables.duration * 3.3, {
      opacity: 1,
      ease: animateVariables.ease,
    });
  }, [foldMenu]);
  return (
    <div
      ref={filterBoxRef}
      className={`${styles.phaseSelector} ${foldMenu ? styles.foldMenu : ""}`}
    >
      <p>Phase</p>
      <div
        className={styles.phaseSelector__container}
        onClick={() => dispatch(SHOWS_STATES.PHASE)}
      >
        <div className={styles.phaseSelector__container__item}>
          <label htmlFor="all">
            <span
              className={
                foldMenu && phaseState.length === 0 ? styles.currentPhase : ""
              }
            >
              All
            </span>
            <input
              type="checkbox"
              id="all"
              onChange={setAllPhases}
              checked={checkboxAllChecked}
              disabled={foldMenu}
            />
          </label>
        </div>

        {Array(phaseLength)
          .fill("")
          .map((_, i) => (
            <div className={styles.phaseSelector__container__item} key={i}>
              <label htmlFor={`phase${i + 1}`}>
                <span
                  className={
                    foldMenu && phaseState.includes(i + 1)
                      ? styles.currentPhase
                      : ""
                  }
                >
                  {i + 1}
                </span>
                <input
                  ref={(el) => (filterCheckboxRef.current[i] = el)}
                  type="checkbox"
                  id={`phase${i + 1}`}
                  onChange={() => addPhaseState(i + 1)}
                  disabled={foldMenu}
                />
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhaseBox;
