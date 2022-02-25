import styles from "../styles/scss/Selector.module.scss";
import { SHOWS_STATES } from "../utils/reducer";
import { BsChevronDown } from "react-icons/bs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import SortBox from "./SortBox";
import PhaseBox from "./PhaseBox";
import SearchBox from "./SearchBox";
import useWindowSize from "../utils/useWidnowSize";
import { NextPage } from "next";

interface Props {
  dispatch: Function;
  phaseState: number[];
  setPhaseState: Function;
  isBoxOfficeOrder: boolean;
  setIsBoxOfficeOrder: Function;
  isReleaseOrder: boolean;
  setIsReleaseOrder: Function;
  isChronologicalOrder: boolean;
  setIsChronologicalOrder: Function;
  isDurationOrder: boolean;
  setIsDurationOrder: Function;
  searchText: string;
  setSearchText: Function;
  animateVariables: any;
}

const Selector: NextPage<Props> = ({
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
  const [width, height] = useWindowSize();

  const tl = gsap.timeline({});

  const [checkboxes, setCheckboxes] = useState([]);
  const [containerHeight, setContainerHeight] = useState<number>();
  const [foldMenu, setFoldMenu] = useState<boolean>(false);

  const firstUpdate = useRef<boolean>(true);
  const searchInputRef = useRef(null);
  const filterContainerRef = useRef(null);
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

  const checkContainerHeight = () => {
    if (containerHeight === undefined) {
      return foldMenu ? 80 : width > 440 ? 250 : 380;
    }
    return foldMenu ? 80 : containerHeight;
  };

  useEffect(() => {
    width > 440
      ? setContainerHeight(foldMenuRef.current.clientHeight + 24)
      : setContainerHeight(foldMenuRef.current.clientHeight);
  }, [width]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    tl.addLabel("start")
      .to(
        foldButtonRef.current,
        animateVariables.duration,
        {
          rotate: foldMenu ? 180 : 0,
          ease: animateVariables.ease,
        },
        "start"
      )
      .to(
        foldMenuRef.current,
        animateVariables.duration,
        {
          height: checkContainerHeight,
          ease: animateVariables.ease,
        },
        "start"
      );
  }, [foldMenu]);

  return (
    <div
      ref={foldMenuRef}
      style={{ height: width > 440 ? containerHeight : "auto" }}
      className={`${styles.selector} ${foldMenu ? styles.foldMenu : ""}`}
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
        setIsReleaseOrder={setIsReleaseOrder}
        setIsChronologicalOrder={setIsChronologicalOrder}
        setIsBoxOfficeOrder={setIsBoxOfficeOrder}
        setIsDurationOrder={setIsDurationOrder}
        foldMenu={foldMenu}
        animateVariables={animateVariables}
        // ref={sortBoxRef}
      />

      <div
        ref={filterContainerRef}
        className={`${styles.selector__itemContainer} ${
          foldMenu && searchInputRef.current.value.length > 0
            ? styles.horizon
            : ""
        }`}
      >
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
