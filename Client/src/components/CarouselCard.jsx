import React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CarouselCard = ({ img, title, release_date }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${img}`}
        alt="Movie backdrop"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <Box
        className="carousel-caption d-none d-md-block"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: alpha("#000", 0.5),
          color: "white",
          padding: "10px",
          borderRadius: "0 0 10px 10px",
        }}
      >
        <Typography variant="h5" component="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          Release date: {release_date}
        </Typography>
      </Box>
    </Box>
  );
};

export default CarouselCard;
