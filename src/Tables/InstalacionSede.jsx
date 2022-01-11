import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { consultaFETCHinstalacionSede } from "../Redux/Casos"

const InstalacionSede = ({id}) => {
  const dispatch = useDispatch()
  const [instalaSede, setInstalaSede] = React.useState([])
  const [llamadaInstaSede, setLlamadaInstaSede] = React.useState(false)
  const instalacionSedeSelector = useSelector(
    store => store.casos.instalacionSede
  )

  React.useEffect(async () => {
    if (instalaSede.length === 0) {
      if (instalacionSedeSelector.length > 0 && llamadaInstaSede === true) {
        instalacionSedeSelector
          .filter((item) => item.new_instalacionesporsedeid == id)
          .map((item) => {
            setInstalaSede(item.new_name);
          });
      } else if (llamadaInstaSede === false) {
        obtenerNombreInstaSede()
        setLlamadaInstaSede(true)
      }
    }
  }, [instalacionSedeSelector])

  const obtenerNombreInstaSede = () => {
    dispatch(consultaFETCHinstalacionSede())
  };

  return (
    <div>
      <p className="fw-bolder">{instalaSede}</p>
    </div>
  )
}

export default InstalacionSede;
