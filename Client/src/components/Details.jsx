import { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import Loading from "./LoadingMovieDetails";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartDislike } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaShareAlt } from "react-icons/fa";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import { MdBookmarkAdded } from "react-icons/md";
import { MdBookmarkAdd } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShareModal from "../features/core/ShareModal";
import Rating from "@mui/material/Rating";
import { MdDateRange } from "react-icons/md";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

let tv = false;

const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [movieVideo, setMovieVideo] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [liked, setLiked] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("jwt"));
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const currentUrl = window.location.href;
  const navigate = useNavigate();

  let detailUrl;
  let videoUrl;
  let creditUrl;

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${apiKey}`,
    },
  };

  if (tv) {
    detailUrl = "https://api.themoviedb.org/3/tv/";
    creditUrl = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits`;
    videoUrl = `https://api.themoviedb.org/3/tv/${id}/videos`;
  } else {
    detailUrl = "https://api.themoviedb.org/3/movie/";
    videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos`;
    creditUrl = `https://api.themoviedb.org/3/movie/${id}/credits`;
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([
      apiDataMovie(),
      apiDataMovieVideo(),
      apiDataMovieCredits(),
      checkUserInteraction(),
    ]);
    setDataLoaded(false);
  };

  const apiDataMovie = async () => {
    const response = await fetch(`${detailUrl}${id}?language=en-US`, options);
    const data = await response.json();
    console.log(data);
    setMovie(data);
  };

  const apiDataMovieVideo = async () => {
    const response = await fetch(videoUrl, options);
    const data = await response.json();
    setMovieVideo(data.results[0].key);
  };

  const apiDataMovieCredits = async () => {
    const response = await fetch(creditUrl, options);
    const data = await response.json();
    setMovieCast(data.cast.slice(0, 5));
  };

  const checkUserInteraction = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/userint/user-interaction/${user.userId}/${id}/${
          tv ? "tv" : "movie"
        }`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch user interactions"
        );
      }

      const data = await response.json();
      setLiked(data.liked);
      setWishlisted(data.wishlisted);
    } catch (error) {
      console.error("Error fetching user interactions:", error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      setLoginPromptOpen(true);
      return;
    }
    const method = liked ? "DELETE" : "POST";
    try {
      const response = await fetch(`${apiUrl}/api/userint/likes`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user.userId,
          tmdbId: id,
          type: tv ? "tv" : "movie",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update like status");
      }

      setLiked(!liked);
    } catch (error) {
      console.error("Error updating like status:", error);
      // Optionally, handle the error in your UI, e.g., show a notification
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      setLoginPromptOpen(true);
      return;
    }
    const method = wishlisted ? "DELETE" : "POST";
    await fetch(`${apiUrl}/api/userint/wishlist`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        userId: user.userId,
        tmdbId: id,
        type: tv ? "tv" : "movie",
      }),
    });
    setWishlisted(!wishlisted);
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
  };

  const handleCloseLoginPrompt = () => {
    setLoginPromptOpen(false);
  };

  const redirectToLogin = () => {
    setLoginPromptOpen(false);
  };

  const actions = [
    {
      icon: liked ? (
        <IoMdHeartDislike style={{ fontSize: "30px" }} />
      ) : (
        <FaHeart style={{ fontSize: "30px" }} />
      ),
      name: liked ? "Unlike" : "Like",
      onClick: handleLike,
    },
    {
      icon: <FaShareAlt style={{ fontSize: "30px" }} />,
      name: "Share",
      onClick: handleShare,
    },
  ];

  return (
    <>
      <Box sx={{ height: "10vh" }}></Box>
      {dataLoaded && <Loading />}

      {!dataLoaded && (
        <>
          <Box sx={{ "& > :not(style)": { m: 1 } }}></Box>

          <Box sx={{ position: "relative", width: "80%", margin: "auto" }}>
            <Paper
              sx={{
                p: 2,
                marginTop: "40px",
                flexGrow: 1,
                height: "90%",
                backgroundColor: "#fff",
                borderRadius: "20px",
              }}
            >
              <Tooltip title={wishlisted ? "remove" : "add"}>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                  onClick={handleWishlist}
                  color="primary"
                >
                  {wishlisted ? (
                    <MdBookmarkAdded style={{ fontSize: "50px" }} />
                  ) : (
                    <MdBookmarkAdd style={{ fontSize: "50px" }} />
                  )}
                </IconButton>
              </Tooltip>
              <Grid container spacing={2}>
                <Grid item sx={{ marginBottom: "20px", height: "50vh" }}>
                  <Img
                    alt="complex"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    sx={{ margin: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="row" spacing={1}>
                    <Grid item xs={12} marginTop={5}>
                      <Typography gutterBottom variant="h2" component="div">
                        {!tv ? movie.title : movie.original_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }}>
                      <Stack direction="row">
                        <Rating
                          name="disabled"
                          value={Math.round(movie.vote_average / 2)}
                          disabled
                          size="large"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2 }}>
                      <Stack direction="row" alignItems="center">
                        <MdDateRange
                          fontSize="1.5rem"
                          style={{ marginRight: "8px" }}
                        />
                        <Typography variant="h6" component="div">
                          {tv ? movie.first_air_date : movie.release_date}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: "20px" }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        sx={{ width: "95%", height: "100%" }}
                        component="div"
                      >
                        {movie.overview}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          <Box
            sx={{
              p: 2,
              margin: "auto",
              marginTop: "40px",
              flexGrow: 1,
              height: "90%",
              width: "100%",
              backgroundColor: "#fff",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ marginLeft: "100px", marginBottom: "20px" }}
            >
              -Top Billed Cast
            </Typography>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                {movieCast.map((value) => (
                  <Grid key={value.id} item>
                    <Card component="li" sx={{ minWidth: 100, flexGrow: 1 }}>
                      <CardCover>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${value.profile_path}`}
                          srcSet=""
                          loading="lazy"
                          alt=""
                        />
                      </CardCover>
                      <CardContent>
                        <Typography
                          level="body-lg"
                          fontSize="2rem"
                          fontWeight="lg"
                          textColor="#fff"
                          mt={{ xs: 12, sm: 18 }}
                        >
                          {value.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Typography
              variant="h5"
              component="div"
              sx={{
                marginLeft: "100px",
                marginBottom: "20px",
                marginTop: "30px",
              }}
            >
              -Watch Trailer
            </Typography>

            <Box
              sx={{ width: "80%", height: "80vh", margin: "auto" }}
              display="flex"
              justifyContent="center"
            >
              <Card
                component="li"
                sx={{ minWidth: 300, flexGrow: 1, height: "100%" }}
              >
                <CardCover>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${movieVideo}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </CardCover>
              </Card>
            </Box>
          </Box>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onClick}
              />
            ))}
          </SpeedDial>
          <ShareModal
            open={shareModalOpen}
            handleClose={handleCloseShareModal}
            url={currentUrl}
          />
        </>
      )}

      <Modal
        open={loginPromptOpen}
        onClose={handleCloseLoginPrompt}
        aria-labelledby="login-prompt-title"
        aria-describedby="login-prompt-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="login-prompt-title" variant="h6" component="h2">
            Login Required
          </Typography>
          <Typography id="login-prompt-description" sx={{ mt: 2 }}>
            Please log in to perform this action.
          </Typography>
          <Box mt={2}>
            <Button variant="contained" onClick={redirectToLogin}>
              close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export const tvChange = () => {
  return (tv = true);
};

export const movieChange = () => {
  return (tv = false);
};

export default MovieDetail;
