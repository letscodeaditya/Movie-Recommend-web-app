import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Grid,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const WishList = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigate();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.API_KEY}`,
    },
  };

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        const response = await fetchWishlist();
        setTotalPages(response.pages);

        const wishlistDetails = await Promise.all(
          response.data.map(async (item) => {
            const detailUrl =
              item.type === "movie"
                ? `https://api.themoviedb.org/3/movie/${item.tmdbId}`
                : `https://api.themoviedb.org/3/tv/${item.tmdbId}`;
            const res = await fetch(detailUrl, options);
            const data = await res.json();
            return { ...data, type: item.type };
          })
        );

        setWishlist(wishlistDetails);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [userId, page]);

  const fetchWishlist = async () => {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/userint/${user.userId}/wishlist?page=${page}&limit=8`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    return response.json();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box sx={{ mt: 14 }}></Box>
      <Box
        sx={{
          ml: "250px",
          p: 3,
          backgroundColor: "white",
          mr: 5,
          mb: 5,
          borderRadius: 5,
          minHeight: "80vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          My Wishlist
        </Typography>
        {loading ? (
          <Grid container spacing={2}>
            {[...Array(8)].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton variant="rectangular" width="100%" height={300} />
              </Grid>
            ))}
          </Grid>
        ) : wishlist.length === 0 ? (
          <Typography variant="body1">No items in wishlist.</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {wishlist.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Card
                    sx={{ height: "100%", cursor: "pointer" }}
                    onClick={() => {
                      item.type === "movie"
                        ? nav(`/moviedetail/${item.id}`)
                        : nav(`/seriesdetail/${item.id}`);
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.original_name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.title || item.original_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Release Date: {item.release_date || item.first_air_date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                mt: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default WishList;
