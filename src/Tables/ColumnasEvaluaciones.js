import React from 'react'
import Moment from 'moment'
import Contacts from './Contacts'
import Puesto from './Puesto'
import Cuenta from './Cuenta'

export const COLUMNASEV = [
    {
        Header: 'Empleado',
        footer: 'Empleado',
        accessor: '_new_empleado_value',
        Cell: ({ value }) => {
            return (
                <Contacts id={value} />
            )
        }
    },
    {
        Header: 'Puesto',
        footer: 'Puesto',
        accessor: '_new_puesto_value',
        Cell: ({ value }) => {
            return (
                <span class="badge badge-personalizado-naranja"><Puesto id={value} /></span>
            )
        }
    },
    {
        Header: 'Sucursal',
        footer: 'Sucursal',
        accessor: '_new_sucursal_value',
        Cell: ({value}) => {
            return(
                <Cuenta id={value} />
            )
        }
    },
    {
        Header: 'Evaluador',
        footer: 'Evaluador',
        accessor: '_new_evaluador_value',
        Cell: ({ value }) => {
            return (
                <Contacts id={value} />
            )
        }
    },
    {
        Header: 'Fecha de Creación',
        footer: 'Fecha de Creación',
        accessor: 'createdon',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{Moment(value).format("DD-MM-YYYY")}</p> : '-' }

    },
]