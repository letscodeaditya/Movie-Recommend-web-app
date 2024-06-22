import { useContext } from "react";
import { MovieStore } from "../store/Movie-store";
import MovieBox from "./MovieBox";
import LoadingSpinner from "./LoadingSpinner";

const SearchPage = () => {
  let { searchList, dataFetched } = useContext(MovieStore);

  return (
    <div class="container px-4 py-5 mt-5" id="custom-cards">
      <h2 class="pb-2 border-bottom trending text-light">Results</h2>

      <div class="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
        {dataFetched &&
          [0, 1, 2, 3, 4, 5, 7, 8].map((data) => <LoadingSpinner />)}

        {!dataFetched &&
          searchList.map((data) => (
            <MovieBox
              key={data.id}
              m_title={data.title}
              m_image={data.backdrop_path}
              m_rating={data.vote_average}
              id={data.id}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
