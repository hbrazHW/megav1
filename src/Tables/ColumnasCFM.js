import React from 'react'
import Moment from 'moment'
import SeleccionarCFM from './SeleccionarCFM'
import InstalacionSede from './InstalacionSede'

export const COLUMNASCFM = [
    {
        Header: 'Instalación por Sede',
        footer: 'Instalación por Sede',
        accessor: '_new_instalacionporsede_value',
        // Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
        Cell: ({value}) => {
            return(
                <InstalacionSede id={value} />
            )
        }
    },
    {
        Header: 'Equipo Detenido',
        footer: 'Equipo Detenido',
        accessor: 'new_equipodetenido',
        Cell: ({ value }) => {
            switch (value) {
                case true:
                    return <span class="badge bg-danger">Si</span>   
                case false:
                    return <span class="badge bg-success">No</span>
                default:
                    return '---'
            }
        }
    
    },
    {
        Header: 'Prioridad',
        footer: 'Prioridad',
        accessor: 'prioritycode',
        Cell: ({ value }) => {
            switch (value) {
                case 0:
                    return <span class="badge bg-success text-center">Baja</span>    
                case 1:
                    return <span class="badge bg-primary text-center">Media</span>
                case 2:
                    return <span class="badge bg-warning text-dark text-center">Alta</span>
                case 3:
                    return <span class="badge bg-danger text-center">Urgente</span>        
                default:
                    return '---'
            }
        }
    },
  
    {
        Header: 'A la espera de repuestos',
        footer: 'A la espera de repuestos',
        accessor: 'new_alaesperaderepuestos',
        Cell: ({ value }) => {
            switch (value) {
                case true:
                    return <span class="badge bg-danger">Si</span>   
                case false:
                    return <span class="badge bg-success ">No</span>
                default:
                    return '---'
            }
        }
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