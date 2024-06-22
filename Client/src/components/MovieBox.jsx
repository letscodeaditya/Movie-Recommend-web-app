import { BiSolidMoviePlay } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";





const MovieBox =({m_title,m_image,m_rating,tv_title,tv_image,tv_rating,id,id_ser})=>{

 
    return(

      <>
      

     <Link to={m_title?`/moviedetail/${id}`:`/seriesdetail/${id_ser}`} class="col" style={{textDecoration:'none'}}>
        <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 " style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${m_title?m_image:tv_image})`,backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",backgroundBlendMode:'overlay'}}>
          <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
            <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{m_rating?m_title:tv_title}</h3>
            <ul class="d-flex list-unstyled mt-auto">
              <li class="me-auto">
              <BiSolidMoviePlay />
              </li>
              <li class="d-flex align-items-center me-3">
                <small><FaStar style={{marginBottom:'3px'}} /> {m_title?Math.round(m_rating):Math.round(tv_rating)}</small>
              </li>
              <li class="d-flex align-items-center">
                <small>catagory</small>
              </li>
            </ul>
          </div>
        </div>
      </Link>

      

      </>
   
    );
}
export default MovieBox;




