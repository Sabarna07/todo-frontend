import React from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { isAuth, signout } from "../actions/auth";

const Header = () => {

  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Assignment
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            {
              !isAuth() &&
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" href="#">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link" href="#">
                    Register
                  </NavLink>
                </li>
              </>
            }
            { isAuth() &&
              <li className="nav-item">
              <NavLink to='#' onClick={()=>signout()} className="nav-link" href="#">
                Signout
              </NavLink>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
