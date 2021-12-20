import { useEffect, useState } from "react";
import Image from "next/image";
import { SHOWS_STATES } from "../utils/reducer";
import styles from "../styles/scss/DataStatus.module.scss";

const DataStatus = ({ data, state }: any) => {
  const [shows, setShows] = useState(null);
  const [combinedArr, setCombinedArr] = useState(
    data.movies.data.concat(data.tvShows.data)
  );
  let baseUrl =
    "https://raw.githubusercontent.com/AugustoMarcelo/mcuapi/master/covers/thor.jpg";

  /* Methods */
  const invokeShowFunc = () => {
    switch (state) {
      case SHOWS_STATES.RELEASE_ORDER:
        return showReleaseOrder();

      case SHOWS_STATES.BOX_OFFICE:
        return showBoxOfficeOrder();

      case SHOWS_STATES.RESET:
        return setShows(null);

      default:
        return null;
    }
  };

  /* Release Order */
  const showReleaseOrder = () => {
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
    console.log(sortedArr);

    return setShows(sortedArr);
  };
  const sortByBoxOffice = (arr: any[]) => {
    const sortedArr = arr.sort((a, b) => b.box_office - a.box_office);
    return sortedArr;
  };

  useEffect(() => {
    console.log(`%c${state}`, "color: yellow; font-weight: 900");
    invokeShowFunc();
  }, [state]);

  return (
    <div className={styles.dataStatus}>
      <div>
        {shows &&
          shows.map((show, i) => (
            <div
              key={i}
              className={styles.showContainer}
              style={{ margin: `20px 0px` }}
            >
              <p key={show.title}>{show.title}</p>
              <div
                key={show.cover_url}
                className={styles.showContainer__imageWrap}
              >
                <Image
                  src={show.cover_url ?? baseUrl}
                  alt={show.title}
                  width={256}
                  height={379}
                  layout="intrinsic"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DataStatus;
