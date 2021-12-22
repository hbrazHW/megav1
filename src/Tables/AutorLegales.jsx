import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerAutor } from '../Redux/AutorLegales'

const AutorLegales = ({ id }) => {
    const dispatch = useDispatch()
    const [autor, setautor] = React.useState([])
    const [llamada, setLlamada] = React.useState(false)
    const autorSelector = useSelector(store => store.autor.autor)

    React.useEffect(async () => {
        if (autor.length === 0) {
            if (autorSelector.length > 0 && llamada === true) {
                autorSelector.filter(item => item.contactid == id).map(item => {
                    setautor(item.createdby)
                })
            } else if (llamada === false) {
                obtenerAutores()
                setLlamada(true)
            }
        }

    }, [autorSelector])


    const obtenerAutores = () => {
        dispatch(obtenerAutor())
    }

    return (
        <p className="m-0 texto-lista m-0">{autor}</p>
    )
}

export default AutorLegales