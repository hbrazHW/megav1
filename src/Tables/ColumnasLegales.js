import React from 'react'
import Moment from 'moment'

export const COLUMNASLEGALES = [
    {
        Header: 'Autor',
        footer: 'Autor',
        accessor: 'systemuser',
        Cell: ({ value }) => { return value ? <p className=" m-0 fw-bolder texto-lista m-0">{value}</p> : '-' }
    },

    {
        Header: 'Persona que recepcionó',
        footer: 'Persona que recepcionó',
        accessor: 'fullname',
        Cell: ({ value }) => { return value ? <p className=" m-0 fw-bolder texto-lista m-0">{value}</p> : '-' }
    },
  
    {
        Header: 'Descripción del Documento',
        footer: 'Descripción del Documento',
        accessor: 'new_name',
        Cell: ({ value }) => { return value ? <p className=" m-0 fw-bolder texto-lista m-0">{value}</p> : '-' }
    },
  
   {
    Header: 'Fecha de creación',
    footer: 'Fecha de creación',
    accessor: 'createdon',
    Cell: ({ value }) => { return value ? <p className=" m-0 fw-bolder texto-lista m-0">{Moment(value).format("DD-MM-YYYY")}</p> : '-' }
   },

   

]