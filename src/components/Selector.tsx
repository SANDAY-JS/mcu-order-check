import styles from "../styles/scss/Selector.module.scss";
import { SHOWS_STATES } from "../utils/reducer";
import { BsChevronDown } from "react-icons/bs";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import SortBox from "./SortBox";
import PhaseBox from "./PhaseBox";
import SearchBox from "./SearchBox";

const Selector = ({
  dispatch,
  phaseState,
  setPhaseState,
  isBoxOfficeOrder,
  setIsBoxOfficeOrder,
  isReleaseOrder,
  setIsReleaseOrder,
  isChronologicalOrder,
  setIsChronologicalOrder,
  isDurationOrder,
  setIsDurationOrder,
  searchText,
  setSearchText,
  animateVariables,
}) => {
  const tl = gsap.timeline({});
  const [checkboxes, setCheckboxes] = useState([]);
  const [foldMenu, setFoldMenu] = useState<boolean>(false);

  const searchInputRef = useRef(null);
  const foldButtonRef = useRef<HTMLDivElement>(null);
  const foldMenuRef = useRef<HTMLDivElement>(null);

  const resetShows = () => {
    // uncheck all checkboxes
    checkboxes.forEach((box) => (box.checked = false));
    // reset phaseState, isBoxOfficeOrder, isReleaseOrder
    setPhaseState([]);
    setSearchText("");
    setIsReleaseOrder(false);
    setIsDurationOrder(false);
    setIsBoxOfficeOrder(false);
    setIsChronologicalOrder(false);
    searchInputRef.current.value = "";

    return dispatch(SHOWS_STATES.RESET);
  };

  useLayoutEffect(() => {
    tl.addLabel("start")
      .to(
        foldButtonRef.current,
        animateVariables.duration * 0.75,
        {
          rotate: foldMenu ? 540 : 0,
          ease: animateVariables.ease,
        },
        "start"
      )
      .to(
        foldMenuRef.current,
        animateVariables.duration * 0.75,
        { height: foldMenu ? 80 : "auto", ease: animateVariables.ease },
        "start"
      );
  }, [foldMenu]);

  return (
    <div
      ref={foldMenuRef}
      className={`${styles.selector} ${foldMenu ? styles.alignCenter : ""}`}
    >
      <div
        ref={foldButtonRef}
        onClick={() => setFoldMenu(!foldMenu)}
        className={styles.selector__foldingButton}
      >
        <BsChevronDown />
      </div>

      <SortBox
        dispatch={dispatch}
        isReleaseOrder={isReleaseOrder}
        isChronologicalOrder={isChronologicalOrder}
        isBoxOfficeOrder={isBoxOfficeOrder}
        isDurationOrder={isDurationOrder}
        foldMenu={foldMenu}
        setIsReleaseOrder={setIsReleaseOrder}
        setIsChronologicalOrder={setIsChronologicalOrder}
        setIsBoxOfficeOrder={setIsBoxOfficeOrder}
        setIsDurationOrder={setIsDurationOrder}
        animateVariables={animateVariables}
      />

      <div className={styles.selector__itemContainer}>
        <SearchBox
          setSearchText={setSearchText}
          searchInputRef={searchInputRef}
          foldMenu={foldMenu}
          animateVariables={animateVariables}
        />
        <PhaseBox
          dispatch={dispatch}
          phaseState={phaseState}
          setPhaseState={setPhaseState}
          foldMenu={foldMenu}
          setCheckboxes={setCheckboxes}
          animateVariables={animateVariables}
        />
      </div>

      {/* Reset */}
      {!foldMenu && (
        <div
          className={`${styles.changeOrder} ${styles.resetButton}`}
          onClick={resetShows}
        >
          Reset
        </div>
      )}
    </div>
  );
};

export default Selector;
