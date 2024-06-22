import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Profile = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/auth/profile", {
  //         method: "GET",
  //         credentials: "include", // Ensure cookies are sent with the request
  //       });

  //       if (!response.ok) {
  //         throw new Error("Not authenticated");
  //       }

  //       const data = await response.json();
  //       setUser(data);
  //     } catch (error) {
  //       console.error(error);
  //       setUser(null);
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

  // if (!user) {
  //   return <Typography variant="h6">You are not logged in</Typography>;
  // }

  return (
    <Box>
      <Typography variant="h6">Welcome</Typography>
    </Box>
  );
};

export default Profile;
