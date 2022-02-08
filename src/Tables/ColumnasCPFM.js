import React from 'react'
import Moment from 'moment'

export const COLUMNASCPFM = [
    {
        Header: 'Número de caso',
        footer: 'Número de caso',
        accessor: 'ticketnumber',
        Cell: ({ value }) => { return value ? <span class="badge badge-personalizado-naranja">{value}</span> : '-' }
    },
    {
        Header: 'Cliente',
        footer: 'Cliente',
        accessor: '_new_cliente_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }

    },
    {
        Header: 'Asunto',
        footer: 'Asunto',
        accessor: '_subjectid_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }

    },
    {
        Header: 'Sede',
        footer: 'Sede',
        accessor: '_customerid_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }
    },
    {
        Header: 'Razón para el estado',
        footer: 'Razón para el estado',
        accessor: 'statuscode',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }
    },
    
]