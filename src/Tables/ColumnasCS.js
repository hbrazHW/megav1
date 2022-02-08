import React from 'react'
import Moment from 'moment'

export const COLUMNASCS = [
    {
        Header: 'Número de caso',
        footer: 'Número de caso',
        accessor: 'ticketnumber',
        Cell: ({ value }) => { return value ? <span class="badge badge-personalizado-naranja">{value}</span> : '-' }
    },
    {
        Header: 'Título',
        footer: 'Título',
        accessor: 'title',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }

    },
    {
        Header: 'Cliente',
        footer: 'Cliente',
        accessor: '_new_cliente_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }

    },
    {
        Header: 'Fecha de Alta',
        footer: 'Fecha de Alta',
        accessor: 'new_fechaalta',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{Moment(value).format("DD-MM-YYYY")}</p> : '-' }
    },
    {
        Header: 'Prioridad',
        footer: 'Prioridad',
        accessor: 'prioritycode',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }
    },
    
]