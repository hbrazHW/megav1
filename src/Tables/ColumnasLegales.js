import React from 'react'
import Moment from 'moment'
import SeleccionarFila from '../Tables/SeleccionarFila'

export const COLUMNASLEGALES = [
    {
        Header: 'Autor',
        footer: 'Autor',
        accessor: 'new_name',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }
    },


    {
        Header: 'Sede',
        footer: 'Sede',
        accessor: '_new_sede_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }
    },

    {
        Header: 'Persona que recepcionó',
        footer: 'Persona que recepcionó',
        accessor: '_new_personaquerecepcion_value',
        // Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }

    },

    {
        Header: 'Descripción del Documento',
        footer: 'Descripción del Documento',
        accessor: 'new_descripcindeldocumento',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }

    },

    {
        Header: 'Fecha de creación',
        footer: 'Fecha de creación',
        accessor: 'createdon',
        Cell: ({ value }) => { return value ? <p className=" m-0 texto-lista m-0 fw-bolder">{Moment(value).format("DD-MM-YYYY")}</p> : '-' }
    },
    {
        Header: 'Sede',
        footer: 'Sede',
        accessor: '_new_sede_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }
    },

    {
        accessor: 'new_documentoslegalesid',
        Cell: ({ value }) => {
            return (
                <SeleccionarFila value={value} />
            )
        }
    }
   
    

]