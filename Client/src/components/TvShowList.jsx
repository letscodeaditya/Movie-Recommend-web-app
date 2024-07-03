import { useContext, useState, useEffect } from "react";
import MovieBox from "./MovieBox";
import { MovieStore } from "../store/Movie-store";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TvShowList = () => {
  const { tvList } = useContext(MovieStore);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageTvShows, setCurrentPageTvShows] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchTvShows(currentPage);
  }, [currentPage]);

  const fetchTvShows = async (pageNumber) => {
    setDataFetched(true);
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGJhMTg3NzkyOTViMjRmZmNlZjk5MTBhMDAyMTU1ZCIsInN1YiI6IjY1NTE1OGVlZWE4NGM3MTA5MjI1Mjg4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ETuLDtIAzzzar9IyjxFs9WqmRA3So8E0zR45SXbqksw",
        },
      }
    );
    const data = await response.json();
    setCurrentPageTvShows(data.results);
    setDataFetched(false);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container px-4 py-5 mt-5" id="custom-cards">
      <h2 className="pb-2 border-bottom trending text-light mt-5">
        Trending Shows
      </h2>
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {dataFetched
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8].map((data) => (
              <LoadingSpinner key={data} />
            ))
          : currentPageTvShows.map((data) => (
              <MovieBox
                key={data.id}
                tv_title={data.original_name}
                tv_image={data.backdrop_path}
                tv_rating={data.vote_average}
                id_ser={data.id}
              />
            ))}
      </div>
      <div className="d-flex justify-content-center w-100 mt-3">
        <Stack spacing={2}>
          <Pagination
            count={10} // Replace with the actual number of pages
            variant="outlined"
            color="primary"
            page={currentPage}
            onChange={handleChange}
            sx={{
              "& .MuiPaginationItem-outlined": {
                color: "white",
                borderColor: "white",
              },
              "& .Mui-selected": {
                backgroundColor: "white",
                color: "black",
                borderColor: "white",
              },
              "& .MuiPaginationItem-page:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default TvShowList;
