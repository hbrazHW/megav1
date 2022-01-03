import React from "react";
import { useSpring, animated } from "react-spring";
import { withRouter, Link } from "react-router-dom";
import megatlonVideo from "../img/megatlonVideo.mp4";
import casos from "../img/casos.jpg";
import legales from "../img/legales.jpg";
import personal from "../img/personal.jpg";
import megatlonPortada from "../img/megatlonPortada.png";

const Cover = () => {
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  return (
    <animated.div classNameName="container" style={fade}>
      <div className="row">
        <div className="portada-container">
          <video className="video" src={megatlonVideo} autoPlay loop muted />
          <h1>MEGATLON</h1>
          <p>Red de Clubes</p>
        </div>
        <div className="about-container">
          <div className="description">
            <h3>Portal Megatlon</h3>
            <p>
              Administra sus casos, crea documentos legales y gestiona sus
              recursos humanos desde acá de manera practica y rápida
            </p>
          </div>
          <div className="about-img">
            <img src={megatlonPortada} alt="fotoportada" />
          </div>
        </div>
        <div className="container col-sm-8">
          <br />
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div
              className="carousel-inner container-fluid"
              style={{ height: 25 + "em" }}
            >
              <div className="carousel-item h-100 active ">
                <Link to="">
                  <img src={casos} className="d-block w-100" alt="casos" />
                </Link>
                <div className="carousel-caption d-none d-md-block">
                  <h5>Casos</h5>
                  <p>vista de casos activos y resueltos.</p>
                </div>
              </div>
              <div className="carousel-item h-100">
                <Link to="">
                  <img src={legales} className="d-block w-100" alt="legales" />
                </Link>
                <div className="carousel-caption d-none d-md-block">
                  <h5>Documentos Legales</h5>
                  <p>Vista de documentos legales Creados.</p>
                </div>
              </div>
              <div className="carousel-item h-100 ">
                <Link to="">
                  <img src={personal} className="d-block w-100" alt="rrhh" />
                </Link>
                <div className="carousel-caption d-none d-md-block">
                  <h5>RRHH</h5>
                  <p>Vista de busqueda de Personal.</p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
          <br />
        </div>
      </div>
    </animated.div>
  );
};

export default withRouter(Cover);