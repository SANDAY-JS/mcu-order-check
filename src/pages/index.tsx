import type { GetStaticProps, NextPage } from "next";
import Header from "../components/Header";
import Main from "../components/Main";

const Home: NextPage = ({ data }: any) => {
  return (
    <>
      <Header />
      <Main data={data} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const movies = await fetch("https://mcuapi.herokuapp.com/api/v1/movies");
  const tvShows = await fetch("https://mcuapi.herokuapp.com/api/v1/tvshows");

  const moviesData = await movies.json();
  const tvShowsData = await tvShows.json();

  console.log({ moviesData, tvShowsData });

  return {
    props: {
      data: { movies: moviesData, tvShows: tvShowsData },
    },
  };
};
