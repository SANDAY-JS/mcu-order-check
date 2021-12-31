import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ShowDetail from "./ShowDetail";
import { SHOWS_STATES } from "../utils/reducer";
import InitialShows from "./InitialShows";

import styles from "../styles/scss/DataStatus.module.scss";

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
    switch (state) {
      case SHOWS_STATES.RELEASE_ORDER:
        return showReleaseOrder();

      case SHOWS_STATES.BOX_OFFICE:
        return showBoxOfficeOrder();

      case SHOWS_STATES.PHASE:
        return showPhaseOrder(phaseState);

      case SHOWS_STATES.RESET:
        return setShows(null);

      // case SHOWS_STATES.SEARCH:
      //   return showSearchResult(searchText);

      default:
        return null;
    }
  };

  const filterShowsWithCurrentPhase = () => {
    if (!phaseState.length) {
      setBaseShowsArr(initialShowData);
      return;
    }

    // 表示させる作品
    const showsArr = baseShowsArr.filter((show) =>
      phaseState.includes(show.phase)
    );

    return setBaseShowsArr(showsArr);
  };

  /* Release Order */
  const showReleaseOrder = (fromPhaseFunction?: boolean) => {
    if (!fromPhaseFunction) {
      filterShowsWithCurrentPhase();
    }

    const sortedArr = sortByReleaseDate(baseShowsArr);
    return setShows(sortedArr);
  };
  // Sort Methods
  const sortByReleaseDate = (arr: any[]) => {
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

    // combine both arrays
    const completedArr = withReleaseDates.concat(noReleaseDates);
    return completedArr;
  };

  /* Box Office Order */
  const showBoxOfficeOrder = (fromPhaseFunction?: boolean) => {
    // "showPhaseOrder"から発火された時はスキップ
    if (!fromPhaseFunction) {
      filterShowsWithCurrentPhase();
    }
    // 並べる
    const sortedArr = sortByBoxOffice(baseShowsArr);
    return setShows(sortedArr);
  };
  const sortByBoxOffice = (arr: any[]) => {
    const sortedArr = arr.sort((a, b) => b.box_office - a.box_office);
    return sortedArr;
  };

  /* Phase Order */
  const showPhaseOrder = (phaseState) => {
    console.log(`phase: %c ${phaseState}`, "color: yellow");
    if (isReleaseOrder) {
      showReleaseOrder(true);
    }
    if (isBoxOfficeOrder) {
      showBoxOfficeOrder(true);
    }

    const sortedArr = baseShowsArr.filter((show) =>
      phaseState.includes(show.phase)
    );
    return setShows(sortedArr);
  };

  /* Search Result */
  const showSearchResult = (searchText) => {
    const result = findString(baseShowsArr, searchText);
    return setShows(result);
  };
  const findString = (showsArr: any[], text: string) => {
    // 入力されたテキストに空白が含まれているか
    const isSeveralWords = text.split(" ").length > 1;

    return showsArr.filter((show) => {
      // それぞれの作品タイトルを単語ごとに配列化
      const titleWordsArr = show.title.toLowerCase().split(" ");

      // 配列化されたtitleWordsArrがtextを含むもののみをreturn
      if (!isSeveralWords)
        return titleWordsArr.some((arr: string) => arr.startsWith(text));

      // 複数ある入力テキストの単語と等しいものを選別
      for (let i = 0; i < titleWordsArr.length - 1; i++) {
        let titleWords = `${titleWordsArr[i]} ${titleWordsArr[i + 1]}`;

        // 入力テキストにexcludeWordsが入っている場合,除外
        excludeWords.forEach((word) => {
          if (titleWords.includes(word)) {
            titleWords = titleWords.replace(word, "");
          }
        });

        if (titleWords.includes(searchText)) return true;
      }
    });
  };
  // const sortByName = () => {
  //   const sortedArr = baseShowsArr.sort((a, b) =>
  //     a.title.localeCompare(b.title)
  //   );
  //   return sortedArr;
  // };

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

  return (
    <div className={styles.dataStatus}>
      {shows ? (
        <div className={styles.showContainer}>
          {shows.map((show, i) => (
            <div
              key={i}
              className={`keepShowDetail ${styles.showContainer__showItem}`}
              onClick={() => setSelectedShow(show)}
            >
              <p
                key={show.title}
                className={styles.showContainer__showItem__title}
              >
                {show.title}
              </p>
              <div
                key={show.cover_url}
                className={styles.showContainer__showItem__imageWrap}
              >
                <Image
                  src={show.cover_url ?? noPicture}
                  alt={show.title}
                  width={256}
                  height={379}
                  layout="intrinsic"
                  placeholder="blur"
                  blurDataURL={show.cover_url ?? noPicture}
                />
              </div>
            </div>
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
