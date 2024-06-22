import { useContext, useState } from "react";
import MovieBox from "./MovieBox";
import { MovieStore } from "../store/Movie-store";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

const TrendingMovies = () => {
  let { movieList, dataFetched } = useContext(MovieStore);

  let onlyEight = movieList.slice(0, 8);

  return (
    <div class="container px-4 py-5 mt-5" id="custom-cards">
      <h2 class="pb-2 border-bottom trending text-light mt-5">
        Trending Movie
      </h2>

      <div class="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
        {dataFetched &&
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((data) => <LoadingSpinner />)}

        {!dataFetched &&
          onlyEight.map((data) => (
            <MovieBox
              key={data.id}
              m_title={data.title}
              m_image={data.backdrop_path}
              m_rating={data.vote_average}
              id={data.id}
            />
          ))}

        {/* {console.log(movieList)} */}
      </div>
      <Link
        to="/movies"
        class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
      >
        show more
      </Link>
    </div>
  );
};

export default TrendingMovies;
