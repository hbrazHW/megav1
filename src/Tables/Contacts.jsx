import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { consultaFETCHcontacts } from '../Redux/Contact'

const Contacts = ({ id }) => {
    const dispatch = useDispatch()
    const [contacts, setContacts] = React.useState([])
    const [llamada, setLlamada] = React.useState(false)
    const contactSelector = useSelector(store => store.contacts.contacts)

    React.useEffect(async () => {
        if (contacts.length === 0) {
            if (contactSelector.length > 0 && llamada === true) {
                contactSelector.filter(item => item.contactid == id).map(item => {
                    setContacts(item.fullname)
                })
            } else if (llamada === false) {
                obtenerContactos()
                setLlamada(true)
            }
        }

    }, [contactSelector])


    const obtenerContactos = () => {
        dispatch(consultaFETCHcontacts())
    }

    return (
        <p className="m-0 texto-lista m-0 fw-bolder">{contacts}</p>
    )
}

export default Contacts