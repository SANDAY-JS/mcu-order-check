import type { GetStaticProps, NextPage } from "next";
import Header from "../components/Header";
import DataStatus from "../components/DataStatus";
import Selector from "../components/Selector";
import { useReducer, useState } from "react";
import { initialState, reducerFunc } from "../utils/reducer";

const Home: NextPage = ({ data }: any) => {
  // dispatch -> reducerFunc() -> update state
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  // phase state
  const [phaseState, setPhaseState] = useState([]);

  return (
    <>
      <Header />
      <Selector
        dispatch={dispatch}
        phaseState={phaseState}
        setPhaseState={setPhaseState}
      />
      <DataStatus data={data} state={state} phaseState={phaseState} />
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
