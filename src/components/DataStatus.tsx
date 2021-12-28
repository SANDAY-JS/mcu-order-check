import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SHOWS_STATES } from "../utils/reducer";
import styles from "../styles/scss/DataStatus.module.scss";
import ShowDetail from "./ShowDetail";

const DataStatus = ({ data, state, phaseState }: any) => {
  const firstUpdate = useRef(true);
  const noPicture = "/images/noimage.png";
  const initialShowData = data.movies.data.concat(data.tvShows.data);

  /* ----------- States ----------- */
  // 表示されている作品
  const [shows, setShows] = useState(null);
  // クリックされた作品
  const [selectedShow, setSelectedShow] = useState(null);
  // Showsの基本となるArray
  const [baseShowsArr, setBaseShowsArr] = useState(initialShowData);
  // "Box Office"のonとoffをチェック
  const [isBoxOfficeOrder, setIsBoxOfficeorder] = useState(false);

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
        setIsBoxOfficeorder(false);
        return setShows(null);

      default:
        return null;
    }
  };

  const filterShowsWithCurrentPhase = () => {
    if (!phaseState.length) {
      console.log("phase is not set");
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
  const showReleaseOrder = () => {
    if (isBoxOfficeOrder) {
      setIsBoxOfficeorder(false);
    }

    // Checks if some of phase checkboxes are checked
    filterShowsWithCurrentPhase();

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
    // Set "isBoxOfficeOrder"
    if (!isBoxOfficeOrder) {
      setIsBoxOfficeorder(true);
    }
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
    if (isBoxOfficeOrder) {
      showBoxOfficeOrder(true);
    }

    const sortedArr = baseShowsArr.filter((show) =>
      phaseState.includes(show.phase)
    );
    return setShows(sortedArr);
  };

  useEffect(() => {
    invokeShowFunc();
  }, [state]);

  useEffect(() => {
    // avoid initial call
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    invokeShowFunc();
  }, [phaseState]);

  return (
    <div className={styles.dataStatus}>
      {shows &&
        shows.map((show, i) => (
          <div
            key={i}
            className={`keepShowDetail ${styles.showContainer}`}
            onClick={() => setSelectedShow(show)}
          >
            <p key={show.title} className={styles.showContainer__title}>
              {show.title}
            </p>
            <div
              key={show.cover_url}
              className={styles.showContainer__imageWrap}
            >
              <Image
                src={show.cover_url ?? noPicture}
                alt={show.title}
                width={256}
                height={379}
                layout="intrinsic"
              />
            </div>
          </div>
        ))}

      {selectedShow && (
        <ShowDetail show={selectedShow} setSelectedShow={setSelectedShow} />
      )}
    </div>
  );
};

export default DataStatus;
