import type { GetStaticProps, NextPage } from "next";
import Header from "../components/Header";
import DataStatus from "../components/DataStatus";
import Selector from "../components/Selector";
import { useReducer } from "react";
import { initialState, reducerFunc } from "../utils/reducer";

const Home: NextPage = ({ data }: any) => {
  // dispatch -> reducerFunc() -> update state
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  return (
    <>
      <Header />
      <Selector dispatch={dispatch} />
      <DataStatus data={data} state={state} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const movies = await fetch("https://mcuapi.herokuapp.com/api/v1/movies");
  const tvShows = await fetch("https://mcuapi.herokuapp.com/api/v1/tvshows");

  const moviesData = await movies.json();
  const tvShowsData = await tvShows.json();

  // console.log({ moviesData, tvShowsData });

  return {
    props: {
      data: { movies: moviesData, tvShows: tvShowsData },
    },
  };
};
