import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-dark ">
                <div className="col-md-4 d-flex align-items-center ms-5">
                    <a href="/" className=" me-2 mb-md-0 text-body-light text-decoration-none lh-1">
                        <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
                    </a>
                    <span className="mb-md-0 text-light ">© 2023 Company, Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me-5">
                    <li className="ms-3"><a className="text-body-light" href="#"><FaInstagram /></a></li>

                    <li className="ms-3"><a className="text-body-light" href="#"><FaFacebook /></a></li>

                    <li className="ms-3"><a className="text-body-light" href="#"><FaXTwitter /></a></li>
                </ul>
            </footer>
        
    );
}

export default Footer;