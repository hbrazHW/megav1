import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { tieneRolAdmin } from "../Redux/Contact";
import { obtenerContacto } from "../Redux/Contacto";
const contactid = useSelector((store) => store.usuarios.contactid);


const [contactsAdmin, setContactsAdmin] = React.useState([])
const [llamadaContactsA, setLlamadaContactsA] = React.useState(false)
const contactoRolAdmin = useSelector(store => store.contacts.rolAdmin)
const contactid = useSelector((store) => store.usuarios.contactid);

const PrivateRoutes = ({ role, ...rest }) => {

  React.useEffect(() => {
    if(contactsAdmin.length === 0){
      if(contactoRolAdmin.length > 0 && llamadaContactsA === true){
        setContactsAdmin(contactoRolAdmin)
      }else if(llamadaContactsA === false){
        obtenerContactosRolAdmin()
        setLlamadaContactsA(true)
      }
    }
  }, [contactoRolAdmin])

  const obtenerContactosRolAdmin = () => {
    dispatch(tieneRolAdmin(contactid))
  }

  console.log("contactos con rol admin:", contactsAdmin)


  const { userLogged } = useAuth();

  if (!userLogged()) {
    return <Redirect to="/" />;
  }

  if (!role && userLogged()) {
    return <Route {...rest} />;
  }

  return permissions ? <Route {...rest} /> : <Redirect to="/" />;
};

export default PrivateRoutes;