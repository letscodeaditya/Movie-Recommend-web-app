import People from "./People";
import { MovieStore } from "../store/Movie-store";
import { useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";


const PeopleList = () => {
    let { peopleList, dataFetched } = useContext(MovieStore);

    // Use slice to get the first three elements
    const firstThreePeople = peopleList.slice(0, 3);

    return (
        <div class="container px-4 py-5 " id="custom-cards">
            <h2 class="pb-2  trending text-light">Actors & Actress</h2>

            <div class="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
                {dataFetched && <LoadingSpinner />}
                {!dataFetched && firstThreePeople.map((data) => <People key={data.id} {...data} />)}
            </div>
            <a href="#" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-5">show more</a>

        </div>
    );
};

export default PeopleList;