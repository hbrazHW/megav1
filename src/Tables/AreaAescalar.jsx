import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { consultaFETCHareaAderivar } from "../Redux/Casos"

const AreaAescalar = ({id}) => {
  const dispatch = useDispatch()
  const [areaAescalar, setAreaAescalar] = React.useState([])
  const [llamadaArea, setLlamadaArea] = React.useState(false)
  const areaAderivarSelector = useSelector(
    store => store.casos.areaAderivar
  )

  React.useEffect(async () => {
    if (areaAescalar.length === 0) {
      if (areaAderivarSelector.length > 0 && llamadaArea === true) {
        areaAderivarSelector
          .filter((item) => item.new_areaid == id)
          .map((item) => {
            setAreaAescalar(item.new_name);
          });
      } else if (llamadaArea === false) {
        obtenerNombreArea()
        setLlamadaArea(true)
      }
    }
  }, [areaAderivarSelector])

  const obtenerNombreArea = () => {
    dispatch(consultaFETCHareaAderivar())
  };

  return (
    <div>
      <p className="fw-bolder">{areaAescalar}</p>
    </div>
  )
}

export default AreaAescalar;
