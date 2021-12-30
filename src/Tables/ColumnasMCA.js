import React from 'react'
import Moment from 'moment'
import Asuntos from './Asuntos'
import SeleccionarMCA from './SeleccionarMCA'

export const COLUMNASMCA = [
    {
        Header: 'Numero de Caso',
        footer: 'Numero de Caso',
        accessor: 'ticketnumber',
        Cell: ({ value }) => { return value ? <span class="badge badge-personalizado-naranja">{value}</span> : '-' }
    },
    {
        Header: 'Asunto',
        footer: 'Asunto',
        accessor: '_subjectid_value',
        Cell: ({value}) => {
            return(
                <Asuntos id={value} />
            )
        }
    },
    {
        Header: 'Fecha de Alta',
        footer: 'Fecha de Alta',
        accessor: 'new_fechaalta',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{Moment(value).format("DD-MM-YYYY")}</p> : '-' }
    },

    {
        Header: 'Estado del Caso',
        footer: 'Estado del Caso',
        accessor:'statuscode',
        Cell: ({ value }) => {
            switch (value) {
                case 1:
                    return <p className=" m-0  texto-lista m-0">En curso</p>    
                case 2:
                    return <p className=" m-0  texto-lista m-0">Retenido</p> 
                case 3:
                    return <p className=" m-0  texto-lista m-0">Esperando detalles</p> 
                case 4:
                    return <p className=" m-0  texto-lista m-0">Investigación</p> 
                case 100000001:
                    return <p className=" m-0  texto-lista m-0">Pendiente</p> 
                case 100000002:
                    return <p className=" m-0  texto-lista m-0">Pendiente Autorizacion</p> 
                case 100000003:
                    return <p className=" m-0  texto-lista m-0">Autorizado</p> 
                case 100000004:
                    return <p className=" m-0  texto-lista m-0">Pendiente de Revisión</p> 
                case 100000005:
                    return <p className=" m-0  texto-lista m-0">Pendiente del Proveedor</p>         
                case 100000006:
                    return <p className=" m-0  texto-lista m-0">En proceso de entrega</p> 
                case 100000007:
                    return <p className=" m-0  texto-lista m-0">Enviado para OK</p> 
                default:
                    return '---'
            }
        }
    },

    {
        accessor: 'incidentid',
        Cell: ({ value }) => {
            return (
                <SeleccionarMCA value={value} />
            )
        }
    },
    
]