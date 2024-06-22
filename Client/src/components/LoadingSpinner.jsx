import { BiSolidMoviePlay } from "react-icons/bi";

const LoadingSpinner = () => {
  return (
    <div class="col" aria-hidden="true">
      <div class="card card-cover h-100 overflow-hidden bg-dark rounded-4 shadow-lg">
        <div class="d-flex flex-column h-100 p-5 pb-3 text-light text-shadow-1 placeholder-glow">
          <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold placeholder col-8"></h3>
          <ul class="d-flex list-unstyled mt-auto placeholder-glow">
            <li class="me-auto ">
              <BiSolidMoviePlay />
            </li>
            <li class="d-flex align-items-center me-3 placeholder col-2">
              <small></small>
            </li>
            <li class="d-flex align-items-center placeholder col-4">
              <small></small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
