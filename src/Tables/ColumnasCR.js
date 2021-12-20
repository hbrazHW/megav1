import React from 'react'
import Moment from 'moment'

export const COLUMNASCR = [
    {
        Header: 'Asunto',
        footer: 'Asunto',
        accessor: '_subjectid_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
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
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
    },
    
]