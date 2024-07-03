import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MovieStoreProvider from "../store/Movie-store";
import { Outlet } from "react-router-dom";
import AppAppBar from "../components/Nav";
import Box from "@mui/material/Box";
import NewFooter from "../components/NewFooter";

function App() {
  return (
    <div className="con">
      <MovieStoreProvider>
        <AppAppBar />

        <Outlet />
        {/* <Header/> */}

        {/* <Footer /> */}
        <NewFooter />
      </MovieStoreProvider>
    </div>
  );
}

export default App;
