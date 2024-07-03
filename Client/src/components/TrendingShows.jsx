import MovieBox from "./MovieBox";
import { MovieStore } from "../store/Movie-store";
import LoadingSpinner from "./LoadingSpinner";
import { useContext } from "react";
import { Link } from "react-router-dom";

const TrendingShows = () => {
  let { tvList, dataFetched } = useContext(MovieStore);
  let onlyEight = tvList.slice(0, 6);

  return (
    <div class="container px-4 py-5 " id="custom-cards">
      <h2 class="pb-2 border-bottom trending text-light ">Trending Shows</h2>
      <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {dataFetched && [0, 1, 2, 3, 4, 5, 6].map((data) => <LoadingSpinner />)}

        {!dataFetched &&
          onlyEight.map((data) => (
            <MovieBox
              key={data.id}
              tv_title={data.original_name}
              tv_image={data.backdrop_path}
              tv_rating={data.vote_average}
              id_ser={data.id}
            />
          ))}
      </div>
      <Link
        to="/series"
        class="link-secondary  link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
      >
        show more
      </Link>
    </div>
  );
};

export default TrendingShows;
