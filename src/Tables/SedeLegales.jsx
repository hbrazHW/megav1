import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { consultaFETCHsedesRH } from "../Redux/RecursosHumanos";

const SedeLegales = (id) => {
  const dispatch = useDispatch();
  const [sucursal, setSucursal] = React.useState([]);
  const [llamadaSucu, setLlamadaSucu] = React.useState(false);
  const sucursalSelector = useSelector(
    (store) => store.recursosHumanos.cuentas
  );

  React.useEffect(async () => {
    if (sucursal.length === 0) {
      if (sucursalSelector.length > 0 && llamadaSucu === true) {
        sucursalSelector
          .filter((item) => item.accountid == id)
          .map((item) => {
            setSucursal(item.name);
          });
      } else if (llamadaSucu === false) {
        obtenerSede();
        setLlamadaSucu(true);
      }
    }
  }, [sucursalSelector]);

  const obtenerSede = () => {
    dispatch(consultaFETCHsedesRH());
  };

  return (
    <div>
      <p className="m-0 texto-lista m-0 fw-bolder">{sucursal}</p>
    </div>
  );
};

export default SedeLegales;
