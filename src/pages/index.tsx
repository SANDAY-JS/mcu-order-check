import type { GetStaticProps, NextPage } from "next";
import Header from "../components/Header";
import DataStatus from "../components/DataStatus";
import Selector from "../components/Selector";
import { useReducer, useState } from "react";
import { initialState, reducerFunc } from "../utils/reducer";
import Head from "next/head";

const Home: NextPage = ({ data }: any) => {
  // dispatch -> reducerFunc() -> update state
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  // phase state
  const [phaseState, setPhaseState] = useState<number[]>([]);

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

      <Header />
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
