import React from 'react'
import Moment from 'moment'
import Asuntos from './Asuntos'
import SeleccionarMCA from './SeleccionarMCA'

export const COLUMNASMCA = [
    {
        Header: 'Numero de Caso',
        footer: 'Numero de Caso',
        accessor: 'ticketnumber',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
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
        accessor:'',
        // Cell: ({value}) => {
        //     return(
        //         <EstadoCaso id={value} />
        //     )
        // }
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