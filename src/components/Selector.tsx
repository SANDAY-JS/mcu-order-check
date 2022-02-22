import styles from "../styles/scss/Selector.module.scss";
import { SHOWS_STATES } from "../utils/reducer";
import { FcSearch } from "react-icons/fc";
import { BsChevronDown } from "react-icons/bs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import SortBox from "./SortBox";

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
  const [foldMenu, setFoldMenu] = useState<boolean>(false);

  const [checkboxAllChecked, setCheckboxAllChecked] = useState<boolean>(true);
  // checkboxRef in phaseState
  const searchInputRef = useRef(null);
  const filterCheckboxRef = useRef([]);
  const foldButtonRef = useRef<HTMLDivElement>(null);
  const foldMenuRef = useRef<HTMLDivElement>(null);

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

  const resetCurrentOrder = () => {
    setIsReleaseOrder(false);
    setIsChronologicalOrder(false);
    setIsBoxOfficeOrder(false);
    setIsDurationOrder(false);
  };

  const handleSearch = (e) => {
    return setSearchText(e.target.value.trim().toLowerCase());
  };

  const resetShows = () => {
    // uncheck all checkboxes
    filterCheckboxRef.current.forEach((box) => (box.checked = false));
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
  useEffect(() => {
    if (phaseState.length === 0) return setCheckboxAllChecked(true);
  }, [phaseState]);

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
      className={`${styles.selector} ${foldMenu ? styles.folded : ""}`}
    >
      <div
        ref={foldButtonRef}
        onClick={() => setFoldMenu(!foldMenu)}
        className={styles.selector__foldingButton}
      >
        <BsChevronDown />
      </div>

      <SortBox
        isReleaseOrder={isReleaseOrder}
        showReleaseOrder={showReleaseOrder}
        isChronologicalOrder={isChronologicalOrder}
        showChronologicalOrder={showChronologicalOrder}
        isBoxOfficeOrder={isBoxOfficeOrder}
        showBoxOfficeOrder={showBoxOfficeOrder}
        isDurationOrder={isDurationOrder}
        showDurationOrder={showDurationOrder}
        foldMenu={foldMenu}
      />

      <div className={styles.selector__itemContainer}>
        <p className={styles.selector__itemContainer__title}>Filter</p>
        {/* Search Box */}
        <div
          className={`${styles.searchContainer} ${
            searchInputRef.current && searchInputRef.current.value.length > 0
              ? styles.textLength
              : ""
          }`}
        >
          <FcSearch className={styles.searchIcon} />
          <input
            ref={searchInputRef}
            type="text"
            onChange={handleSearch}
            className={styles.textInput}
            // defaultValue={searchInput}
          />
        </div>

        {/* Phase Order */}
        <div className={`${styles.changeOrder} ${styles.phaseSelector}`}>
          <p>Phase</p>
          <div
            className={`${styles.phaseSelector__container}`}
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
            <div className={styles.phaseSelector__container__item}>
              <label htmlFor="phase1">1</label>
              <input
                ref={(el) => (filterCheckboxRef.current[0] = el)}
                type="checkbox"
                id="phase1"
                onChange={() => addPhaseState(1)}
              />
            </div>
            <div className={styles.phaseSelector__container__item}>
              <label htmlFor="phase2">2</label>
              <input
                ref={(el) => (filterCheckboxRef.current[1] = el)}
                type="checkbox"
                id="phase2"
                onChange={() => addPhaseState(2)}
              />
            </div>
            <div className={styles.phaseSelector__container__item}>
              <label htmlFor="phase3">3</label>
              <input
                ref={(el) => (filterCheckboxRef.current[2] = el)}
                type="checkbox"
                id="phase3"
                onChange={() => addPhaseState(3)}
              />
            </div>
            <div className={styles.phaseSelector__container__item}>
              <label htmlFor="phase4">4</label>
              <input
                ref={(el) => (filterCheckboxRef.current[3] = el)}
                type="checkbox"
                id="phase4"
                onChange={() => addPhaseState(4)}
              />
            </div>
          </div>
        </div>
      </div>

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
