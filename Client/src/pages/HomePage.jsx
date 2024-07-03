import React from "react";
import Carou from "../components/NewHero";
import TrendingMovies from "../components/TrendingMovie";

import TrendingShows from "../components/TrendingShows";
import PeopleList from "../components/PeopleList";
import Hero from "../components/Hero";
import Divider from "../components/Divider";

export const HomePage = () => {
  return (
    <>
      <Carou />
      {/* <Carousel /> */}

      <TrendingMovies />
      <Divider />
      <TrendingShows />
      <Divider />
      <PeopleList />
      <Divider />
      <Hero />
    </>
  );
};
