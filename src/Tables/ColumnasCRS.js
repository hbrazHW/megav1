import React from 'react'
import Moment from 'moment'

export const COLUMNASCRS = [
    {
        Header: 'Número de caso',
        footer: 'Número de caso',
        accessor: 'ticketnumber',
        Cell: ({ value }) => { return value ? <span class="badge badge-personalizado-naranja">{value}</span> : '-' }
    },
    {
        Header: 'Asunto',
        footer: 'Asunto',
        accessor: '_subjectid_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }

    },
    {
        Header: 'Razón para el Estado',
        footer: 'Razón para el Estado',
        accessor: 'statuscode',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }

    },
    {
        Header: 'Sede',
        footer: 'Sede',
        accessor: '_customerid_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }
    },
    
]