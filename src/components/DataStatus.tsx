import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ShowDetail from "./ShowDetail";
import { SHOWS_STATES } from "../utils/reducer";
import InitialShows from "./InitialShows";

import styles from "../styles/scss/DataStatus.module.scss";
import ShowItem from "./ShowItem";

const DataStatus = ({
  data,
  state,
  phaseState,
  isReleaseOrder,
  isBoxOfficeOrder,
  searchText,
  excludeWords,
}) => {
  const firstUpdate1 = useRef(true);
  const firstUpdate2 = useRef(true);

  const noPicture = "/images/noimage.png";
  const initialShowData = data.movies.data.concat(data.tvShows.data);

  /* ----------- States ----------- */
  // 表示されている作品
  const [shows, setShows] = useState(null);
  // クリックされた作品
  const [selectedShow, setSelectedShow] = useState(null);
  // Showsの基本となるArray
  const [baseShowsArr, setBaseShowsArr] = useState(initialShowData);

  /* --------- Methods --------- */
  /* 適当な関数をinvokeする */
  const invokeShowFunc = () => {
    filterShowsWithCurrentPhase();

    switch (state) {
      case SHOWS_STATES.RELEASE_ORDER:
        return showReleaseOrder();

      case SHOWS_STATES.BOX_OFFICE:
        return showBoxOfficeOrder();

      case SHOWS_STATES.PHASE:
        return showPhaseOrder(phaseState);

      case SHOWS_STATES.RESET:
        setBaseShowsArr(initialShowData);
        return setShows(null);

      default:
        return null;
    }
  };
  /* Sort Methods */

  const sortMethods = {
    releaseDate(arr: any[]) {
      // sort the entire array
      const sortedArr = arr.sort((a, b) => {
        const dateA: any = new Date(a.release_date);
        const dateB: any = new Date(b.release_date);

        return dateA - dateB;
      });

      // get the shows which have release dates
      const withReleaseDates = sortedArr.filter(
        (show) => show.release_date !== null
      );
      // get the shows which don't have release dates
      const noReleaseDates = sortedArr.filter(
        (show) => show.release_date === null
      );

      // combine both arrays (so that the shows which don't have a release date go to the bottom)
      return withReleaseDates.concat(noReleaseDates);
    },

    boxOffice(arr: any[]) {
      const sortedArr = arr.sort((a, b) => b.box_office - a.box_office);
      return sortedArr;
    },

    titleName() {
      const sortedArr = baseShowsArr.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      return sortedArr;
    },
  };

  /* フェーズが指定されている場合、"baseShows"をfilterする */
  const filterShowsWithCurrentPhase = () => {
    if (!phaseState.length) {
      return setBaseShowsArr(initialShowData);
    }
    // フェーズが指定されている場合
    const showsArr = initialShowData.filter((show) =>
      phaseState.includes(show.phase)
    );

    return setBaseShowsArr(showsArr);
  };

  /* --------------------------------------
    Release Order
    ------------------------------------- */
  const showReleaseOrder = (phaseState?: number[]) => {
    console.count("showReleaseOrder()");
    if (phaseState?.length) {
      // from checkbox click
      filterShowsWithCurrentPhase();
    }
    const sortedArr = sortMethods.releaseDate(baseShowsArr);
    return setShows(sortedArr);
  };

  /* --------------------------------------
    Box Office Order
    ------------------------------------- */
  const showBoxOfficeOrder = (phaseState?: number[]) => {
    if (phaseState?.length) {
      // from checkbox click
      filterShowsWithCurrentPhase();
    }
    const sortedArr = sortMethods.boxOffice(baseShowsArr);
    return setShows(sortedArr);
  };

  /* --------------------------------------
    Phase Order (When a check box clicked)
    ------------------------------------- */
  const showPhaseOrder = (phaseState) => {
    // 何も設定されていないとき->初期状態に戻す
    if (
      !searchText.length &&
      !isReleaseOrder &&
      !isBoxOfficeOrder &&
      !phaseState.length
    ) {
      return setShows(null);
    }

    // Search Text がない場合
    if (!searchText.length) {
      const hasAnyState = detectCurrentState(phaseState);
      if (hasAnyState === undefined) return;

      // Sort Option が無い場合
      const sortedArr = initialShowData.filter((show) =>
        phaseState.includes(show.phase)
      );

      return setShows(sortedArr);
    }

    // Search Text がある場合
    const sortedArr = initialShowData.filter((show) =>
      phaseState.includes(show.phase)
    );
    filterShowsWithCurrentPhase();
    return showSearchResult(searchText, sortedArr);
  };

  const detectCurrentState = (phaseState?: number[]) => {
    if (isReleaseOrder) {
      return showReleaseOrder(phaseState);
    }
    if (isBoxOfficeOrder) {
      return showBoxOfficeOrder(phaseState);
    }
    return false;
  };

  /* -------------------------
    Search Result
    ----------------------- */
  const showSearchResult = (searchText: string, sortedArr?: object[]) => {
    if (!searchText) return;
    filterShowsWithCurrentPhase();

    const result = findString(sortedArr ?? baseShowsArr, searchText);
    return setShows(result);
  };
  const findString = (showsArr: any[], inputText: string) => {
    // 入力テキストが複数の単語か = 入力されたテキストに空白が含まれているか
    const isSeveralWords = inputText.split(" ").length > 1;

    return showsArr.filter((show) => {
      // それぞれの作品タイトルを単語ごとに配列化
      const titleWordsArr = show.title.toLowerCase().split(" ");

      // 配列化されたtitleWordsArrが"inputText"を含むもののみをreturn
      if (!isSeveralWords)
        return titleWordsArr.some((arr: string) => arr.startsWith(inputText));

      // 複数ある入力テキストの単語と等しいものを選別
      for (let i = 0; i < titleWordsArr.length - 1; i++) {
        let titleWords = "";
        for (let j = 0; j < titleWordsArr.length; j++) {
          titleWords += `${titleWordsArr[j]} `;
        }

        // 入力テキストにexcludeWordsが入っている場合,除外
        if (excludeWords.some((word) => titleWords.includes(word))) {
          excludeWords.forEach((word) => {
            if (titleWords.includes(word)) {
              titleWords = titleWords.replace(word, "");
            }
          });
        }

        // returns true for "filter"
        if (titleWords.includes(searchText)) return true;
      }
    });
  };

  /*
   * useEffects
   */
  useEffect(() => {
    invokeShowFunc();
  }, [state]);

  useEffect(() => {
    // avoid initial call
    if (firstUpdate1.current) {
      firstUpdate1.current = false;
      return;
    }
    invokeShowFunc();
  }, [phaseState]);

  useEffect(() => {
    // avoid initial call
    if (firstUpdate2.current) {
      firstUpdate2.current = false;
      return;
    }
    showSearchResult(searchText);
  }, [searchText]);

  useEffect(() => {
    console.log("%c baseShowsArr has changed", "color: skyblue;", baseShowsArr);
    detectCurrentState();
  }, [baseShowsArr]);

  useEffect(() => {
    console.log("%c shows has changed", "color: red;", shows);
  }, [shows]);

  return (
    <div className={styles.dataStatus}>
      {shows ? (
        <div className={styles.showContainer}>
          {shows.map((show, i) => (
            <ShowItem show={show} setSelectedShow={setSelectedShow} key={i} />
          ))}
        </div>
      ) : (
        <InitialShows baseShowsArr={baseShowsArr} noPicture={noPicture} />
      )}

      {selectedShow && (
        <ShowDetail show={selectedShow} setSelectedShow={setSelectedShow} />
      )}
    </div>
  );
};

export default DataStatus;
