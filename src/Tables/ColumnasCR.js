import React from 'react'
import Moment from 'moment'
import Asuntos from './Asuntos'
import SeleccionarCR from './SeleccionarCR'

export const COLUMNASCR = [
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
        Header: 'Razón para el estado',
        footer: 'Razón para el estado',
        accessor: 'statuscode',
        Cell: ({ value }) => {
            switch (value) {
                case 5:
                    return <span class="badge bg-success">Cerrado</span>    
                case 1000:
                    return <span class="badge bg-info text-dark">Información proporcionada</span>        
                default:
                    return '---'
            }
        }

    },
    {
        Header: 'Número de caso',
        footer: 'Número de caso',
        accessor: 'ticketnumber',
        Cell: ({ value }) => { return value ? <span class="badge badge-personalizado-naranja">{value}</span> : '-' }
    },
    {   Header: 'Resolución',
        accessor: 'incidentid',
        Cell: ({ value }) => {
            return (
                <SeleccionarCR value={value} />
            )
        }
    },
    
]