import { useContext } from "react";
import { MovieStore } from "../store/Movie-store";
import CarouselCard from "./CarouselCard";
import LoadingCarousel from "./LoadingCarousel";

const Carousel = () => {
  let { carList, dataFetched } = useContext(MovieStore);

  return (
    <div id="carouselExampleCaptions" className="carousel slide carocss mt-5">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        {dataFetched && carList.map((data) => <LoadingCarousel />)}

        {!dataFetched &&
          carList.map((data) => (
            <CarouselCard
              img={data.backdrop_path}
              title={data.title}
              release_date={data.release_date}
            />
          ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
