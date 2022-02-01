import React from "react";
import { useSpring, animated } from "react-spring";
import { withRouter, Link } from "react-router-dom";
import videoPortada from "../img/videoPortada.mp4"
import legales from "../img/legales.jpg";
import personal from "../img/personal.jpg";
import casos from '../img/casos.jpg'
import { useDispatch, useSelector } from "react-redux";
import { tieneRolAdmin } from "../Redux/Contact";
import { obtenerContacto } from "../Redux/Contacto";
import reactSelect from "react-select";

const Home = () => {
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  // props.history.push('/login')

  const [contactsAdmin, setContactsAdmin] = React.useState([])
  const [llamadaContactsA, setLlamadaContactsA] = React.useState(false)
  const contactoRolAdmin = useSelector(store => store.contacts.rolAdmin)
  const contactid = useSelector((store) => store.usuarios.contactid);
  const [contacto, setContacto] = React.useState([]);
  const [llamadaContactos, setLlamadaContactos] = React.useState(false);
  const contactoSelector = useSelector((store) => store.contactos.contacto);
  const[rolAdmin, setRolAdmin] = React.useState(false)
  React.useEffect(() => {
  //   if(contactsAdmin.length === 0){
  //     if(contactoRolAdmin.length > 0 && llamadaContactsA === true){
  //       setContactsAdmin(contactoRolAdmin)
  //     }else if(llamadaContactsA === false){
  //       obtenerContactosRolAdmin()
  //       setLlamadaContactsA(true)
  //     }
  //   }
  
  //   if (
  //     Object.keys(contactoSelector).length > 0 &&
  //     llamadaContactos === true
  //   ) {
  //     setContacto(contactoSelector);
  //   } else if (
  //     Object.keys(contactoSelector).length === 0 &&
  //     llamadaContactos === false
  //   ) {
  //     obtenerMiContacto();
  //     setLlamadaContactos(true);
  //   }
  //   if (contactoRolAdmin) {
  //     setRolAdmin(contactoRolAdmin)
  // }

  if(contactoRolAdmin.length > 0){
    if(contactid !==null){
      contactoRolAdmin.filter(item => item.contactid == contactid).map(item => {
        setRolAdmin(true)
      })
    }
  }

  
  
  // console.log("rol admin:", contactoRolAdmin)
   
  }, [contactoRolAdmin, contactoSelector, rolAdmin])

  // const obtenerContactosRolAdmin = () => {
  //   dispatch(tieneRolAdmin(contactoRolAdmin))
  // }

  // const obtenerMiContacto = async () => {
  //   dispatch(obtenerContacto(contactid));

  // };
  // console.log("contactos id:", contactid)

 



  return (
    <animated.div style={fade}>
      <div className="container">
          <div className="portada-container" >
            <video className="video" src={videoPortada} autoPlay loop muted />
            <div className="video-logo">
             <h1 className="fw-lighter text-white text-center">Casos|Legales|Recursos Humanos</h1>
            </div>
          </div>
        </div>
      <div className="bg-dark pt-1">
        {/* <div className="about-container">
          <div className="description">
            <h3 className="fw-bolder text-white">Portal Megatlon</h3>
            <p className="text-white">
              Administra sus casos, crea documentos legales y gestiona sus
              recursos humanos desde acá de manera practica y rápida.
            </p>
          </div>
          <div className="about-img">
            <img src={megatlonPortada} alt="fotoportada" />
          </div>
        </div> */}
        {/* <div className="bg-naranja">
          <div className="row m-0 m-3 m-3 m-0">
            <div className="col-sm-6 mt-4 pt-3">
              <h1 className="fw-bolder text-center text-white">Portal Megatlon</h1>
              <p className="text-center text-white">
                Administra sus casos, crea documentos legales y gestiona sus
                recursos humanos desde aquí de manera practica y rápida.
              </p>
            </div>
            {/* <div className="col-sm-6 pt-4 mb-4">
              <img src={megatlonPortada} className="img-fluid rounded" alt="fotoportada" />
            </div> 
          </div>
        </div> */}
        <div className="servicios-container bg-dark">
          <h2 className="text-center fw-bolder m-2 pt-3 text-white" >Servicios</h2>

          <div className="container col-sm-7">
            <br />
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"

            >
              <div className="carousel-indicators" >
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
                  <Link to="/vista-casos">
                    <img src={casos} className="d-block w-100 " alt="casos" />
                  </Link>
                  <div className="carousel-caption d-none d-md-block" >
                    <h4 className="fw-bolder">Casos</h4>
                    <p className="text-white">vista de casos activos y resueltos.</p>
                  </div>
                </div>
                <div className="carousel-item ">
                  <Link to="/vista-documentos">
                    <img src={legales} className="d-block w-100 " alt="legales" />
                  </Link>
                  <div className="carousel-caption d-none d-md-block">
                    <h4 className="fw-bolder">Legales</h4>
                    <p className="text-white">Vista de documentos legales Creados.</p>
                  </div>
                </div>
                <div className="carousel-item  ">
                {rolAdmin == true ? (
                <Link to="/vista-recursoshumanos">
                    <img src={personal} className="d-block w-100 " alt="rrhh"  />
                  </Link>
                ):null }
               
                  <div className="carousel-caption d-none d-md-block">
                    <h4 className="fw-bolder">RRHH</h4>
                    <p className="text-white">Vista de busqueda de Personal.</p>
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
      </div>
    </animated.div>
  );
};

export default withRouter(Home)