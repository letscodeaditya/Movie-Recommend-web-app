import Skeleton from "@mui/material/Skeleton";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import { MoreVertOutlined } from "@mui/icons-material";
import { FaShareAlt } from "react-icons/fa";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Fab from "@mui/material/Fab";

const Loading = () => {
  return (
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
            <Skeleton
              variant="rectangular"
              width={210}
              height="100%"
              animation="wave"
            />
            {/* <Img alt="complex" src="" sx={{ margin: "10px" }} /> */}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" spacing={1}>
              <Grid item xs={12} marginTop={5}>
                {/* <Typography
                    gutterBottom
                    variant="subtitle"
                    component="div"
                  ></Typography> */}
                <Skeleton
                  variant="rectangular"
                  width="40%"
                  height="100%"
                  animation="wave"
                ></Skeleton>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row">
                  <Skeleton variant="text" width="10%" height="50%"></Skeleton>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  ></Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} marginLeft="100px" sx={{ width: "90%" }}>
                <Stack direction="row" spacing={2}>
                  <Stack sx={{ width: "20%", height: "30%" }}>
                    <Button></Button>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      animation="wave"
                    ></Skeleton>
                  </Stack>
                  <Stack sx={{ width: "20%" }}>
                    {/* <Button sx={{ width: "100%" }} variant="contained">
                      Bookmark
                    </Button> */}
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      animation="wave"
                    ></Skeleton>
                  </Stack>
                  <Stack sx={{ width: "20%" }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      animation="wave"
                    ></Skeleton>
                  </Stack>
                  <Stack sx={{ width: "20%" }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      animation="wave"
                    ></Skeleton>
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
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                  ></Skeleton>
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
            {[0, 1, 2, 3].map((value) => (
              <Grid key={value} item>
                <Card component="li" sx={{ minWidth: 100, flexGrow: 1 }}>
                  <CardCover>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      animation="wave"
                    ></Skeleton>
                  </CardCover>
                  <CardContent>
                    <Typography
                      level="body-lg"
                      fontSize="2rem"
                      fontWeight="lg"
                      textColor="#fff"
                      mt={{ xs: 12, sm: 18 }}
                    ></Typography>
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
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              ></Skeleton>
            </CardCover>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Loading;
