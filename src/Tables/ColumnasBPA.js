import React from 'react'
import Moment from 'moment'
import Contacts from './Contacts'
import Puesto from './Puesto'
import Cuenta from './Cuenta'

export const COLUMNASBPA = [
    {
        Header: 'Motivo de Búsqueda',
        footer: 'Motivo de Búsqueda',
        accessor: 'new_tipodepuesto',
        Cell: ({ value }) => {
            switch (value) {
                case 100000000:
                    return 'Nuevo Puesto '    
                case 100000001:
                    return 'Reemplazo '    
                default:
                    return '---'
            }
        }
    },
    {
        Header: 'Puesto',
        footer: 'Puesto',
        accessor: '_new_puesto_value',
        Cell: ({value}) => {
            return(
                <span class="badge badge-personalizado-naranja"><Puesto id={value} /></span>
            )
        }
    },
    {
        Header: 'Autorizado por',
        footer: 'Autorizado por',
        accessor: '_new_autorizadopor_value',
        Cell: ({value}) => {
            return(
                <Contacts id={value} />
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
        Header: 'Reportara a',
        footer: 'Reportara a',
        accessor: '_new_reportaraa_value',
        Cell: ({value}) => {
            return(
                <Contacts id={value} />
            )
        }
    },
    {
        Header: 'Jornada Laboral',
        footer: 'Jornada Laboral',
        accessor: 'new_jornadalaboral',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
    },
    {
        Header: 'Estado',
        footer: 'Estado',
        accessor: 'statuscode',
        Cell: ({ value }) => {
            switch (value) {
                case 100000000:
                    return <span class="badge bg-success">Finalizada</span>    
                case 100000001:
                    return <span class="badge bg-warning text-dark">Solicitada / Pendiente Autorizacion</span>
                case 100000002:
                    return <span class="badge bg-danger">No Autorizada</span>
                case 100000003:
                    return <span class="badge bg-info text-dark">Candidatos derivados</span>
                case 100000004:
                    return <span class="badge bg-primary">En preocupacional</span>        
                default:
                    return '---'
            }
        }
    },

    
    
]