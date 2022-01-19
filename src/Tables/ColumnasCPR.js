import React from 'react'
import Moment from 'moment'
import Contacts from './Contacts'
import Cuenta from './Cuenta'

export const COLUMNASCPR = [

    {
        Header: 'Numero de Caso',
        footer: 'Numero de Caso',
        accessor: 'ticketnumber',
        Cell: ({ value }) => { return value ? <span class="badge badge-personalizado-naranja">{value}</span> : '-' }
    },    
    {
        Header: 'Fecha de creación',
        footer: 'Fecha de creación',
        accessor: 'createdon',
        Cell: ({ value }) => { return value ? <p className=" m-0 fw-bolder texto-lista m-0">{Moment(value).format("DD-MM-YYYY")}</p> : '-' }
    }, 
    {
        Header: 'Solicitante',
        accessor: '_new_solicitante_value',
        Cell: ({value}) => {
            return(
                <Contacts id={value} />
            )
        }
    },
    {
        Header: 'Puesto del Solicitante',
        accessor: 'new_puestodelsolicitante',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }
    },
    {
        Header: 'Sede',
        accessor: '_customerid_value',
        Cell: ({ value }) => { 
            return (
                <Cuenta id={value} />
            )
         }
    },   

]