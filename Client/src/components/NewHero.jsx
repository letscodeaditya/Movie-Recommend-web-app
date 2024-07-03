import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";
import { MovieStore } from "../store/Movie-store";
import CarouselCard from "./CarouselCard";
import LoadingCarousel from "./LoadingCarousel";

export default function Carou() {
  const { carList, dataFetched } = React.useContext(MovieStore);

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 10, sm: 15 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            Watch&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: "red",
              }}
            >
              Movies
            </Typography>
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 4 },
            alignSelf: "center",
            height: "100%",
            width: "100%",

            overflow: "hidden",
          })}
        >
          <Carousel indicators={true} navButtonsAlwaysVisible={true}>
            {dataFetched
              ? carList.map((data, index) => <LoadingCarousel key={index} />)
              : carList.map((data, index) => (
                  <CarouselCard
                    key={index}
                    img={data.backdrop_path}
                    title={data.title}
                    release_date={data.release_date}
                  />
                ))}
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
}
