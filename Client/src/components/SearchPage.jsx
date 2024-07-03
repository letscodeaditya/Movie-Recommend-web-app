import { useState, useContext, useEffect } from "react";
import { MovieStore } from "../store/Movie-store";
import MovieBox from "./MovieBox";
import LoadingSpinner from "./LoadingSpinner";

const SearchPage = () => {
  const { searchList, setSearchList, dataFetched, setDataFetched } =
    useContext(MovieStore);
  const [filterType, setFilterType] = useState("movies"); // Default filter type
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Number of items per page

  const url = "https://api.themoviedb.org/3";
  const apiKey = "YOUR_API_KEY"; // Replace with your API key
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setDataFetched(true);

      const movieUrl = `${url}/search/movie?query=${event.target.value}`;
      const tvUrl = `${url}/search/tv?query=${event.target.value}`;

      const movieRequest = fetch(movieUrl, options);
      const tvRequest = fetch(tvUrl, options);

      Promise.all([movieRequest, tvRequest])
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((data) => {
          const [movieData, tvData] = data;
          setSearchList({
            movies: movieData.results,
            tvSeries: tvData.results,
          });
          setFilteredData(movieData.results); // Initialize filtered data with movies
          setCurrentPage(1); // Reset to the first page
          setDataFetched(false);
        })
        .catch((error) => {
          console.error("Error searching:", error);
          setDataFetched(false);
        });
    }
  };

  useEffect(() => {
    if (searchList) {
      const filtered =
        filterType === "movies" ? searchList.movies : searchList.tvSeries;
      setFilteredData(filtered || []);
      setCurrentPage(1); // Reset to the first page when filter changes
    }
  }, [searchList, filterType]);

  const handleFilter = (type) => {
    setFilterType(type);
  };

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container px-4 py-5 mt-5" id="custom-cards">
      <h2 className="pb-2 border-bottom trending text-light">Results</h2>

      <div className="my-3">
        <button
          className={`btn me-3 ${
            filterType === "movies" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleFilter("movies")}
        >
          Movies
        </button>
        <button
          className={`btn ${
            filterType === "tv" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleFilter("tv")}
        >
          TV Shows
        </button>
      </div>

      <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
        {dataFetched
          ? [0, 1, 2, 3, 4, 5, 7, 8].map((index) => (
              <LoadingSpinner key={index} />
            ))
          : currentItems.map((data) => (
              <MovieBox
                key={data.id}
                m_title={data.title || data.name}
                m_image={data.backdrop_path}
                m_rating={data.vote_average}
                id={data.id}
              />
            ))}
      </div>

      {/* Pagination buttons */}
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(filteredData.length / itemsPerPage),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SearchPage;
