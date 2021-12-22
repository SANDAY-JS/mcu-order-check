import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SHOWS_STATES } from "../utils/reducer";
import styles from "../styles/scss/DataStatus.module.scss";
import ShowDetail from "./ShowDetail";

const DataStatus = ({ data, state, phaseState }: any) => {
  const initialShowData = data.movies.data.concat(data.tvShows.data);

  const [shows, setShows] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [combinedArr, setCombinedArr] = useState(initialShowData);
  const noPicture = "/images/noimage.png";

  const firstUpdate = useRef(true);

  /* Methods */
  const invokeShowFunc = () => {
    switch (state) {
      case SHOWS_STATES.RELEASE_ORDER:
        filterShowsWithPhase();
        return showReleaseOrder();

      case SHOWS_STATES.BOX_OFFICE:
        filterShowsWithPhase();
        return showBoxOfficeOrder();

      case SHOWS_STATES.PHASE:
        return showPhaseOrder(phaseState);

      case SHOWS_STATES.RESET:
        return setShows(null);

      default:
        return null;
    }
  };

  const filterShowsWithPhase = () => {
    if (!phaseState.length) return setCombinedArr(initialShowData);
    return setCombinedArr(
      combinedArr.filter((show) => phaseState.includes(show.phase))
    );
  };

  /* Release Order */
  const showReleaseOrder = () => {
    console.log(phaseState);

    const sortedArr = sortByReleaseDate(combinedArr);
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
  const showBoxOfficeOrder = () => {
    const sortedArr = sortByBoxOffice(combinedArr);
    return setShows(sortedArr);
  };
  const sortByBoxOffice = (arr: any[]) => {
    const sortedArr = arr.sort((a, b) => b.box_office - a.box_office);
    return sortedArr;
  };

  /* Phase Order */
  const showPhaseOrder = (phaseNum: number[]) => {
    console.log(phaseNum);

    const sortedArr = combinedArr.filter((show) =>
      phaseNum.includes(show.phase)
    );
    return setShows(sortedArr);
  };

  useEffect(() => {
    invokeShowFunc();
    // console.log(`%c${state}`, "color: yellow; font-weight: 900");
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
