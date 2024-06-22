import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
          <img
            src="/image/new.jfif"
            class="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            style={{ height: "500px" }}
            loading="lazy"
          />
        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold  lh-1 mb-3 text-light">
            movies, shows etc{" "}
          </h1>
          <p class="lead text-light">
            the best website for getting latest update on your fav movies and
            tv-shows
          </p>
          {/* <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <Link to='/signup' type="button" class="btn btn-primary btn-lg px-4 me-md-2">SIGN UP</Link>
                        <Link to='/login' type="button" class="btn btn-outline-secondary btn-lg px-4">LOG IN</Link>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
