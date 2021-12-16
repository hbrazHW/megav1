import React from 'react'
import Moment from 'moment'

export const COLUMNASCR = [
    {
        Header: 'Asunto',
        footer: 'Asunto',
        accessor: '_subjectid_value',
        Cell: ({ value }) => { return value ? <p className=" m-0 fw-bolder texto-lista m-0">{value}</p> : '-' }
    },
    {
        Header: 'Razón para el estado',
        footer: 'Razón para el estado',
        accessor: 'statuscode',
        Cell: ({ value }) => { return value ? <p className=" m-0 fw-bolder texto-lista m-0">{value}</p> : '-' }
    },
    {
        Header: 'Número de caso',
        footer: 'Número de caso',
        accessor: 'ticketnumber',
        Cell: ({ value }) => { return value ? <p className=" m-0 fw-bolder texto-lista m-0">{value}</p> : '-' }
    },
    
]