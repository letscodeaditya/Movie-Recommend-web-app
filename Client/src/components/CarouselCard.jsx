const CarouselCard = ({img,title,release_date}) => {
    return (
        <div className="carousel-item active ">
            <img src={`https://image.tmdb.org/t/p/w500${img}`} className="d-block w-100 image img-fluid" alt="..." style={{}} />
            <div className="carousel-caption d-none d-md-block">
                <h5>{title}</h5>
                <p>release date : {release_date}</p>
            </div>
        </div>
    );
}

export default CarouselCard;