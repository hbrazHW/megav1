import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { consultaFETCHnombresAsuntos } from '../Redux/Casos'
import { consultaFETCHpuesto } from '../Redux/RecursosHumanos'

const Puesto = ({ id }) => {
    const dispatch = useDispatch()
    const [puesto, setPuesto] = React.useState([])
    const [llamada, setLlamada] = React.useState(false)
    const puestoSelector = useSelector(store => store.recursosHumanos.puesto)

    React.useEffect(async () => {
        if (puesto.length === 0) {
            if (puestoSelector.length > 0 && llamada === true) {
                puestoSelector.filter(item => item.new_cargoid == id).map(item => {
                    setPuesto(item.new_name)
                })
            } else if (llamada === false) {
                obtenerPuesto()
                setLlamada(true)
            }
        }
    }, [puestoSelector])

    const obtenerPuesto = () => {
        dispatch(consultaFETCHpuesto())
    }

    return (
        <p className="m-0 texto-lista m-0">{puesto}</p>
    )
}

export default Puesto