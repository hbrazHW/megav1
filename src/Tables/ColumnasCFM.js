import React from 'react'
import Moment from 'moment'
import SeleccionarCFM from './SeleccionarCFM'

export const COLUMNASCFM = [
    {
        Header: 'Instalación por Sede',
        footer: 'Instalación por Sede',
        accessor: '_new_instalacionporsede_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
    },
    {
        Header: 'Equipo Detenido',
        footer: 'Equipo Detenido',
        accessor: 'new_equipodetenido',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
    },
    {
        Header: 'Prioridad',
        footer: 'Prioridad',
        accessor: 'prioritycode',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
    },
  
    {
        Header: 'A la espera de repuestos',
        footer: 'A la espera de repuestos',
        accessor: 'new_alaesperaderepuestos',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
    },
   
       

    {
        accessor: 'incidentid',
        Cell: ({ value }) => {
            return (
                <SeleccionarCFM value={value} />
            )
        }
    },
    
]