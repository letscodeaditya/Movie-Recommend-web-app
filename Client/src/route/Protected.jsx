import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { MovieStore } from "../store/Movie-store";
import SideNav from "../features/user/SideNav";

const Protected = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { checkAuthenticated } = useContext(MovieStore);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { isAuthenticated: authStatus } = await checkAuthenticated();
      setIsAuthenticated(authStatus);
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <SideNav /> <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Protected;
