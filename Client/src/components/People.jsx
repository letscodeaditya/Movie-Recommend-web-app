const People = ({name,overview,profile_path,popularity}) => {
    return (
        <div class="card mb-1 me-5 ms-5 bg-dark" style={{maxWidth: "240px"}}>
            <div class="row g-0">
                <div class="col-md-5 mt-2 ms-5">
                    <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} class="img-fluid rounded" alt="..."/>
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <h5 class="card-title text-light">{name}</h5>
                        {/* <p class="card-text text-light">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                        <p class="card-text"><small class="text-light">popularity : {Math.round(popularity)}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default People;