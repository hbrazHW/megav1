import React from "react";
import { useSpring, animated } from "react-spring";
import { withRouter, NavLink } from "react-router-dom";
import megatlonVideo from "../img/megatlonVideo.mp4";
import casos from "../img/casos.jpg";
import legales from "../img/legales.jpg";
import personal from "../img/personal.jpg";

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
      <div className="container col-sm-12">
        <div className="container">
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
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={casos} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Casos</h5>
                  <p>
                    vista de casos activos y resueltos.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={legales} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Documentos Legales</h5>
                  <p>
                    Vista de documentos legales Creados.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={personal} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>RRHH</h5>
                  <p>
                    Vista de busqueda de Personal.
                  </p>
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
              <span className="visually">Anterior</span>
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
              <span className="visually">Siguiente</span>
            </button>
          </div>
        </div>
        <br />
      </div>
    </animated.div>
  );
};

export default withRouter(Cover);
