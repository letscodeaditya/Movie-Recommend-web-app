import React from "react";

const People = ({ name, overview, profile_path, popularity }) => {
  return (
    <div className="card mb-3 bg-dark" style={{ maxWidth: "240px" }}>
      <div className="row g-0">
        <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            className="img-fluid rounded-start"
            alt={name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-12 col-md-8">
          <div className="card-body">
            <h5 className="card-title text-light">{name}</h5>
            <p className="card-text">
              <small className="text-light">
                Popularity: {Math.round(popularity)}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
