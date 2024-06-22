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
  const [searchList, setSearchList] = useState([]);
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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGJhMTg3NzkyOTViMjRmZmNlZjk5MTBhMDAyMTU1ZCIsInN1YiI6IjY1NTE1OGVlZWE4NGM3MTA5MjI1Mjg4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ETuLDtIAzzzar9IyjxFs9WqmRA3So8E0zR45SXbqksw",
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
      navigate("/search");

      fetch(url + `/search/movie?query=${event.target.value}`, options)
        .then((res) => res.json())
        .then((data) => {
          setSearchList(data.results);
          setDataFetched(false);
        })
        .catch((error) => {
          console.error("Error searching:", error);
          setDataFetched(false);
        });
    }
  };

  const checkAuthenticated = async () => {
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/auth/user/check`,
        {
          method: "GET",
          credentials: "include",
        }
      );

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

      await axiosInstance.post(`${process.env.API_BASE_URL}/auth/user/logout`);

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
