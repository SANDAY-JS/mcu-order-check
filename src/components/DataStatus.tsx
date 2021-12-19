import { useEffect, useState } from "react";
import { SHOWS_STATES } from "../utils/reducer";
import styles from "../styles/scss/DataStatus.module.scss";

const DataStatus = ({ data, state }: any) => {
  const [shows, setShows] = useState(null);

  const invokeShowFunc = () => {
    switch (state) {
      case SHOWS_STATES.RELEASE_ORDER:
        return showReleaseOrder();

      case SHOWS_STATES.RESET:
        return setShows(null);

      default:
        return null;
    }
  };

  const showReleaseOrder = () => {
    const combinedArr = data.movies.data.concat(data.tvShows.data);

    // you need to sort by release date
    const sortedArr = sortByReleaseDate(combinedArr);
    console.log(sortedArr);

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

  useEffect(() => {
    console.log(`%c${state}`, "color: yellow; font-weight: 900");
    invokeShowFunc();
  }, [state]);

  return (
    <div className={styles.dataStatus}>
      <div>
        <p>MCU Shows↓</p>
        {/* <summary>Movies</summary> */}
        {shows &&
          shows.map((show, i) => (
            <div key={i} style={{ margin: `20px 0px` }}>
              <p key={show.title}>{show.title}</p>
              <p key={show.release_date}>{show.release_date}</p>
            </div>
          ))}
      </div>
      {/* <details>
        <summary>TV Shows</summary>
        {data.tvShows.data.map((tvShow, i) => (
          <p key={i}>{tvShow.title}</p>
        ))}
      </details> */}
    </div>
  );
};

export default DataStatus;
