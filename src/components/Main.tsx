import { NextComponentType } from "next";

const Main: NextComponentType = ({ data }: any) => {
  return (
    <div>
      <details>
        <summary>Movies</summary>
        {data.movies.data.map((movie, i) => (
          <p key={i}>{movie.title}</p>
        ))}
      </details>
      <details>
        <summary>TV Shows</summary>
        {data.tvShows.data.map((tvShow, i) => (
          <p key={i}>{tvShow.title}</p>
        ))}
      </details>
    </div>
  );
};

export default Main;
