// import { GetStaticProps, NextPage } from "next";
// import { createContext, useContext } from "react";

// export const getStaticProps: GetStaticProps = async (context) => {
//   const movies = await fetch("https://mcuapi.herokuapp.com/api/v1/movies");
//   const tvShows = await fetch("https://mcuapi.herokuapp.com/api/v1/tvshows");

//   const moviesData = await movies.json();
//   const tvShowsData = await tvShows.json();

//   const data = { movies: moviesData, tvShows: tvShowsData };

//   if (!data) {
//     return { props: { data: "", notFound: true } };
//   }

//   return {
//     props: {
//       data,
//       notFound: false,
//     },
//   };
// };

// export const DataContext = createContext(null);

// const StateProvider: NextPage = ({ data, notFound, children }: any) => {
//   console.log("notFound", notFound);

//   return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
// };

// export const useDataContext = () => useContext(DataContext);

// export default StateProvider;
