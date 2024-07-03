import React from "react";
import { Box, Avatar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();

  const isUserLoggedIn = localStorage.getItem("user");
  const user = isUserLoggedIn && JSON.parse(isUserLoggedIn);

  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: "60%",
        transform: "translateY(-50%)",
        width: "200px",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
        boxShadow: 1,
        borderRadius: 5,
        ml: 2,
        overflow: "hidden",
        "@media (max-width: 900px)": {
          display: "none",
        },
      }}
    >
      <Avatar src={user?.pic} sx={{ width: "30%", height: "30%", mb: 2 }} />
      <Typography sx={{ fontSize: "3vh" }} variant="h6" gutterBottom>
        {user?.name}
      </Typography>
      <Button
        sx={{ fontSize: "2vh" }}
        fullWidth
        onClick={() => navigate("/home/profile")}
      >
        Profile
      </Button>
      <Button
        sx={{ fontSize: "2vh" }}
        fullWidth
        onClick={() => navigate("/home/wishlist")}
      >
        Wishlist
      </Button>
    </Box>
  );
};

export default SideNav;
