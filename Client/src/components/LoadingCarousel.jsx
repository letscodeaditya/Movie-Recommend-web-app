const LoadingCarousel = ()=>{
    return(
        <div className="carousel-item active placeholder-glow ">
            <img src={``} className="d-block w-100 image img-fluid placeholder col-8" alt="..." />
            <div className="carousel-caption d-none d-md-block placeholder-glow">
                
                <p className="placeholder col-4">Some representative placeholder content for the first slide.</p>
            </div>
        </div>
    );
}

export default LoadingCarousel;