import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Loading from "./LoadingMovieDetails";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IoMdStar } from "react-icons/io";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Button from "@mui/material/Button";
import { FaShareAlt } from "react-icons/fa";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

let tv = false;

const MovieDetail = () => {
  let movieDe = useLoaderData();
  let [movie, setMovie] = useState([]);
  let [movieVideo, setMovieVideo] = useState([]);
  let [movieCast, setMovieCast] = useState([]);
  let [dataLoaded, setDataLoaded] = useState(true);
  let { id } = useParams();

  let detailUrl;
  let videoUrl;
  let creditUrl;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGJhMTg3NzkyOTViMjRmZmNlZjk5MTBhMDAyMTU1ZCIsInN1YiI6IjY1NTE1OGVlZWE4NGM3MTA5MjI1Mjg4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ETuLDtIAzzzar9IyjxFs9WqmRA3So8E0zR45SXbqksw",
    },
  };

  if (tv == true) {
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
      behavior: "smooth", // Add smooth behavior for smooth scrolling
    });
    apiDataMovie();
    apiDataMovieVideo();
    apiDataMovieCredits();
  }, []);

  const apiDataMovie = () => {
    fetch(detailUrl + `${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        // console.log(data);
        setDataLoaded(false);
      });
  };
  const apiDataMovieVideo = () => {
    fetch(videoUrl, options)
      .then((res) => res.json())
      .then((data) => {
        setMovieVideo(data.results[0].key);
        console.log(data);
      });
  };

  const apiDataMovieCredits = () => {
    fetch(creditUrl, options)
      .then((res) => res.json())
      .then((data) => {
        setMovieCast(data.cast.slice(0, 4));
        // console.log(data);
      });
  };

  return (
    <>
      <Box sx={{ height: "10vh" }}></Box>
      {dataLoaded && <Loading></Loading>}

      {!dataLoaded && (
        <>
          <Box sx={{ "& > :not(style)": { m: 1 } }}></Box>
          <Paper
            sx={{
              p: 2,
              margin: "auto",
              marginTop: "40px",
              flexGrow: 1,
              height: "90%",
              width: "80%",
              backgroundColor: "#fff",
              borderRadius: "20px",
            }}
          >
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
                    {/* <Typography gutterBottom variant="subtitle" component="div">
                    - {movie.tagline}
                  </Typography> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row">
                      <IoMdStar fontSize="1.5rem" />
                      <Typography gutterBottom variant="h5" component="div">
                        {Math.round(movie.vote_average)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} marginLeft="100px" sx={{ width: "90%" }}>
                    <Stack direction="row" spacing={2}>
                      <Stack sx={{ width: "20%" }}>
                        <Button
                          sx={{ width: "100%" }}
                          variant="contained"
                          color="error"
                          startIcon={<FaHeart />}
                        >
                          Like
                        </Button>
                      </Stack>
                      <Stack sx={{ width: "20%" }}>
                        <Button
                          sx={{ width: "100%" }}
                          variant="contained"
                          startIcon={<BsBookmarkCheckFill />}
                        >
                          Bookmark
                        </Button>
                      </Stack>
                      <Stack sx={{ width: "20%" }}>
                        <Button
                          sx={{ width: "100%" }}
                          variant="contained"
                          startIcon={<FaShareAlt />}
                        >
                          Share
                        </Button>
                      </Stack>
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

          {/* vidoe */}

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
                  <Grid key={value} item>
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
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </CardCover>
              </Card>
            </Box>
          </Box>
        </>
      )}
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
