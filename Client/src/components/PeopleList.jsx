import React from "react";
import People from "./People";
import { MovieStore } from "../store/Movie-store";
import { useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";

const PeopleList = () => {
  const { peopleList, dataFetched } = useContext(MovieStore);

  // Use slice to get the first three elements
  const firstThreePeople = peopleList.slice(0, 8);

  return (
    <div className="container px-4 py-5" id="custom-cards">
      <h2 className="pb-2 trending text-light">Trending Actors & Actresses</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
        {dataFetched && <LoadingSpinner />}
        {!dataFetched &&
          firstThreePeople.map((data) => (
            <div key={data.id} className="col">
              <People {...data} />
            </div>
          ))}
      </div>
      {/* <a
        href="#"
        className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-5"
      >
        Show more
      </a> */}
    </div>
  );
};

export default PeopleList;
