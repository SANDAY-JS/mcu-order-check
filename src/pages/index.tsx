import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Power2 } from "gsap";
import { useReducer, useState } from "react";
import Header from "../components/Header";
import DataStatus from "../components/DataStatus";
import Selector from "../components/Selector";
import { initialState, reducerFunc } from "../utils/reducer";

const Home: NextPage = ({ data }: any) => {
  // dispatch -> reducerFunc() -> update state
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  // dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // animation variables
  const animateVariables = {
    white: "#fafafa",
    black: "#222222",
    duration: 0.4,
    ease: Power2.easeInOut,
  };

  // phase state
  const [phaseState, setPhaseState] = useState<number[]>([]);

  // sort states
  const [isReleaseOrder, setIsReleaseOrder] = useState<boolean>(false);
  const [isBoxOfficeOrder, setIsBoxOfficeOrder] = useState<boolean>(false);
  const [isChronologicalOrder, setIsChronologicalOrder] =
    useState<boolean>(false);
  const [isDurationOrder, setIsDurationOrder] = useState<boolean>(false);

  // search
  const [searchText, setSearchText] = useState("");
  const excludeWords = [":"];

  return (
    <>
      <Head>
        <title>MCU ORDER CHECK</title>
      </Head>

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        animateVariables={animateVariables}
      />
      <Selector
        dispatch={dispatch}
        phaseState={phaseState}
        setPhaseState={setPhaseState}
        isBoxOfficeOrder={isBoxOfficeOrder}
        setIsBoxOfficeOrder={setIsBoxOfficeOrder}
        isReleaseOrder={isReleaseOrder}
        setIsReleaseOrder={setIsReleaseOrder}
        isChronologicalOrder={isChronologicalOrder}
        setIsChronologicalOrder={setIsChronologicalOrder}
        isDurationOrder={isDurationOrder}
        setIsDurationOrder={setIsDurationOrder}
        searchText={searchText}
        setSearchText={setSearchText}
        animateVariables={animateVariables}
      />
      <DataStatus
        data={data}
        state={state}
        phaseState={phaseState}
        isReleaseOrder={isReleaseOrder}
        isBoxOfficeOrder={isBoxOfficeOrder}
        isChronologicalOrder={isChronologicalOrder}
        isDurationOrder={isDurationOrder}
        searchText={searchText}
        excludeWords={excludeWords}
        darkMode={darkMode}
        animateVariables={animateVariables}
      />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const movies = await fetch("https://mcuapi.herokuapp.com/api/v1/movies");
  const tvShows = await fetch("https://mcuapi.herokuapp.com/api/v1/tvshows");

  const moviesData = await movies.json();
  const tvShowsData = await tvShows.json();

  return {
    props: {
      data: { movies: moviesData, tvShows: tvShowsData },
    },
  };
};
