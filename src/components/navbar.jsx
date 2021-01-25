import "../styles/navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../images/tool-logo.png";
import { Link } from "react-router-dom";

import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-parent">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <img
            className="logo-image"
            src={logo}
            alt="company-logo"
            width="200"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse navbar-leftside"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto navbar-list">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link" href="/">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About us
                </a>
              </li>
            </ul>
            <div className="navbar-buttons-right">
              <Link to="/register">
                <button className="btn btn-primary my-2 my-sm-0" type="submit">
                  Register
                </button>
              </Link>
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Log in
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
