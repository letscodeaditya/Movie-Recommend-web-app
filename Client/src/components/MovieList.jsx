import { useContext, useState, useEffect } from "react";
import MovieBox from "./MovieBox";

import LoadingSpinner from "./LoadingSpinner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageMovies, setCurrentPageMovies] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Initialize dataFetched to false

  const itemsPerPage = 20;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth behavior for smooth scrolling
    });
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (pageNumber) => {
    setDataFetched(true); // Set dataFetched to true when fetching begins
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}`,
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
    setCurrentPageMovies(data.results);
    setDataFetched(false); // Set dataFetched to false after data is fetched
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container px-4 py-5 mt-5" id="custom-cards">
      <h2 className="pb-2 border-bottom trending text-light mt-5">
        Trending Movie
      </h2>

      <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
        {dataFetched
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8].map((data) => (
              <LoadingSpinner key={data} />
            ))
          : currentPageMovies.map((data) => (
              <MovieBox
                key={data.id}
                m_title={data.title}
                m_image={data.backdrop_path}
                m_rating={data.vote_average}
                id={data.id}
              />
            ))}
      </div>
      <div className="d-flex justify-content-center w-100 mt-3">
        <Stack spacing={2}>
          <Pagination
            count={10}
            variant="outlined"
            color="primary"
            page={currentPage}
            onChange={handleChange}
            sx={{
              "& .MuiPaginationItem-outlined": {
                color: "white",
                borderColor: "white",
              },
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default MovieList;
