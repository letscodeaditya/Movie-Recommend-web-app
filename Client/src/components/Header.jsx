import { useContext, useRef } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MovieStore } from "../store/Movie-store";



const Header = ()=>{

   let{handleSearch}= useContext(MovieStore);


    return(
        <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" >
        <BiCameraMovie className="icon"/>
        </Link>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-4 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-white ">Home</Link></li>
          <li><Link to="/movies" className="nav-link px-2 text-white">movies</Link></li>
          <li><Link to="/series" className="nav-link px-2 text-white">tv-series</Link></li>
          <li><Link to="/about" className="nav-link px-2 text-white">About</Link></li>
        </ul>

        <form className="col-10 col-lg-auto mb-3 mb-lg-0 me-lg-3"  role="search" onSubmit={(event)=>{ event.preventDefault();}}>
          <input type="search" onKeyDown={handleSearch}  className="form-control form-control-dark text-bg-light" onke placeholder="Search..." aria-label="Search"/> 
        </form>

        <div className="text-end">
          <Link to='/login' type="button" className="btn btn-outline-light me-2">Login</Link>
          <Link to='/signup' className="btn btn-danger">Sign-up</Link>
        </div>
      </div>
    </div>
  </header>
    );
}

export default Header;