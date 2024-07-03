import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MovieStore = createContext({
  movieList: [],
  dataFetched: true,
  tvList: [],
  carList: [],
  peopleList: [],
  searchList: [],
  handleSearch: () => {},
  formData: {},
  setFormData: () => {},
  checkAuthenticated: () => {},
  userData: {},
  userLogged: false,
  setUserLogged: () => {},
  setUserData: () => {},
  handleLogout: () => {},
});

const MovieStoreProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [carList, setCarList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);

  const [dataFetched, setDataFetched] = useState(true);
  const [userLogged, setUserLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    username: "",
    Pic: null,
    privacy: false,
    theme: "",
  });
  const [searchList, setSearchList] = useState({
    movies: [],
    tvSeries: [],
  });
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${apiKey}`,
    },
  };
  const url = "https://api.themoviedb.org/3";

  const fetchData = (endpoint, setStateCallback) => {
    fetch(url + endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        setStateCallback(data.results);
        setDataFetched(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setDataFetched(false);
      });
  };

  console.log(apiKey);
  console.log(apiUrl);
  useEffect(() => {
    fetchData("/movie/popular?language=en-US&page=1", setMovieList);
    fetchData("/tv/popular?language=en-US&page=1", setTvList);
    fetchData("/movie/upcoming?language=en-US&page=1", (data) => {
      const firstThreeItems = data.slice(0, 3);
      setCarList(firstThreeItems);
    });
    fetchData("/person/popular?language=en-US&page=1", setPeopleList);
  }, []);

  const navigate = useNavigate();

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
          console.log(searchList);
          setDataFetched(false);
          navigate("/search");
        })
        .catch((error) => {
          console.error("Error searching:", error);
          setDataFetched(false);
        });
    }
  };

  const checkAuthenticated = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/check`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserLogged(true);
        return { isAuthenticated: true, user: data.user }; // Return user data if needed
      } else {
        return { isAuthenticated: false };
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      return { isAuthenticated: false };
    }
  };

  const handleLogout = async () => {
    try {
      const axiosInstance = axios.create({
        withCredentials: true,
        credentials: "include",
      });

      await axiosInstance.post(`${apiUrl}/api/user/logout`);

      localStorage.removeItem("user");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <MovieStore.Provider
      value={{
        movieList,
        dataFetched,
        tvList,
        carList,
        peopleList,
        searchList,
        handleSearch,
        formData,
        setFormData,
        checkAuthenticated,
        userData,
        userLogged,
        setUserLogged,
        setUserData,
        handleLogout,
      }}
    >
      {children}
    </MovieStore.Provider>
  );
};

export default MovieStoreProvider;
