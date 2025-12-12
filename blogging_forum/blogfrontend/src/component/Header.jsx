import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CURRENT_USER_KEY = "blog_user";

const Header = ({ user, onSignOut }) => {
const loc = useLocation();
const navigate = useNavigate();

const handleSignOut = () => {
localStorage.removeItem(CURRENT_USER_KEY);
onSignOut && onSignOut(null);
navigate("/login");
};

return ( 
  
  <header className="sticky-top bg-white shadow-sm border-bottom"> 
    <nav className="navbar navbar-expand-lg navbar-light bg-white"> 
      <div className="container"> 
        
        <Link className="navbar-brand fw-bolder fs-3 text-success d-flex align-items-center gap-2" to="/">
            <i className="bi bi-feather text-success"></i> MyBlog
        </Link>


      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          
            <Link className={`nav-link ${loc.pathname === "/" ? "active fw-bold text-success" : "text-dark"}`} to="/">Home</Link>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <Link className={`nav-link ${loc.pathname === "/createpost" ? "active fw-bold text-success" : "text-dark"}`} to="/createpost">Create Post</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${loc.pathname === "/ownposts" ? "active fw-bold text-success" : "text-dark"}`} to="/ownposts">My Posts</Link>
              </li>
            </>
          )}
        </ul>

        <div className="d-flex align-items-center">
          {user ? (
            <div className="dropdown">
            
              <button className="btn btn-success dropdown-toggle d-flex align-items-center gap-2 px-3"
                type="button" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
               <i className="bi bi-person-circle fs-5"></i>
                {user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2">
                <li className="dropdown-header text-muted">{user.email}</li>
                <li><hr className="dropdown-divider"/></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleSignOut}>
                    <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex gap-2">
          
              <Link to="/login" className={`btn ${loc.pathname === "/login" ? "btn-success" : "btn-outline-success"} btn-sm px-3 fw-semibold`}>
                <i className="bi bi-box-arrow-in-right me-1"></i> Sign In
              </Link>
              <Link to="/signup" className={`btn ${loc.pathname === "/signup" ? "btn-success" : "btn-outline-success"} btn-sm px-3 fw-semibold`}>
                <i className="bi bi-person-plus-fill me-1"></i> Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
</header>
);
};

export default Header;