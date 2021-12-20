import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { consultaFETCHnombresAsuntos } from '../Redux/Casos'

const Asuntos = ({ id }) => {
    const dispatch = useDispatch()
    const [asuntos, setAsuntos] = React.useState([])
    const [llamada, setLlamada] = React.useState(false)
    const asuntosSelector = useSelector(store => store.casos.asuntos)

    React.useEffect(async () => {
        if (asuntos.length === 0) {
            if (asuntosSelector.length > 0 && llamada === true) {
                asuntosSelector.filter(item => item.subjectid == id).map(item => {
                    setAsuntos(item.title)
                })
            } else if (llamada === false) {
                obtenerAsuntos()
                setLlamada(true)
            }
        }
    }, [asuntosSelector])

    const obtenerAsuntos = () => {
        dispatch(consultaFETCHnombresAsuntos())
    }

    return (
        <p className="m-0 texto-lista m-0">{asuntos}</p>
    )
}

export default Asuntos