import React from "react";
import caso from "../img/caso.jpg";
import legal from "../img/legal.jpg";
import Personal from "../img/Personal.jpg";
import { Link } from "react-router-dom";

const Carousel = () => {
  return (
    <div className="container">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link className="navbar-brand m-0" to="#">
              <img className="caso" src={caso} alt="caso" />
            </Link>
          </div>
          <div className="carousel-item">
            <Link className="navbar-brand m-0" to="#">
              <img className="legal" src={legal} alt="legal" />
            </Link>
          </div>
          <div className="carousel-item">
            <Link className="navbar-brand m-0" to="#">
              <img className="bPersonal" src={Personal} alt="rrhh" />
            </Link>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually">Seguiente</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
