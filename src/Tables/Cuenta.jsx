import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { consultaFETCHcuentas } from '../Redux/RecursosHumanos'

const Cuenta = ({ id }) => {
    const dispatch = useDispatch()
    const [sucursal, setSucursal] = React.useState([])
    const [llamada, setLlamada] = React.useState(false)
    const sucursalSelector = useSelector(store => store.recursosHumanos.cuentas)

    React.useEffect(async () => {
        if (sucursal.length === 0) {
            if (sucursalSelector.length > 0 && llamada === true) {
                sucursalSelector.filter(item => item.accountid == id).map(item => {
                    setSucursal(item.name)
                })
            } else if (llamada === false) {
                obtenerCuentas()
                setLlamada(true)
            }
        }
    }, [sucursalSelector])

    

    const obtenerCuentas = () => {
        dispatch(consultaFETCHcuentas())
    }

    return (
        <p className="m-0 texto-lista m-0 fw-bolder">{sucursal}</p>
    )
}

export default Cuenta