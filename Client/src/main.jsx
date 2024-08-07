import React from "react";
import ReactDOM from "react-dom/client";
import App from "./route/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MovieDetail, { tvChange, movieChange } from "./components/Details";
import Divider from "./components/Divider";
import TrendingShows from "./components/TrendingShows";
import Hero from "./components/Hero";
import PeopleList from "./components/PeopleList";
import Login from "./features/auth/login/Login";
import SearchPage from "./components/SearchPage";
import Carou from "./components/NewHero";
import TrendingMovies from "./components/TrendingMovie";
import MovieList from "./components/MovieList";
import TvShowList from "./components/TvShowList";
import AboutUs from "./components/AboutUs";
import Protected from "./route/Protected";
import Profile from "./features/user/Profile";
import WishList from "./features/user/Wishlist";
import { SignUpPage } from "./pages/SignUpPage";
import { HomePage } from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/moviedetail/:id",
        element: <MovieDetail />,
        loader: movieChange,
      },
      { path: "/seriesdetail/:id", element: <MovieDetail />, loader: tvChange },
      { path: "/movies", element: <MovieList /> },
      { path: "/series", element: <TvShowList /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUpPage /> },
      {
        path: "/home",
        element: <Protected />,
        children: [
          { path: "/home/profile", element: <Profile /> },
          { path: "/home/wishlist", element: <WishList /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
