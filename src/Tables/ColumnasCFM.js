import React from 'react'
import Moment from 'moment'
import SeleccionarCFM from './SeleccionarCFM'
import InstalacionSede from './InstalacionSede'
import AreaAescalar from './AreaAescalar'

export const COLUMNASCFM = [

    {
        Header: 'Numero de Caso',
        footer: 'Numero de Caso',
        accessor: 'ticketnumber',
        Cell: ({ value }) => { return value ? <span class="badge badge-personalizado-naranja">{value}</span> : '-' }
    },
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
                    return <p className="fw-bolder">Si</p>   
                case false:
                    return <p className="fw-bolder">No</p>
                default:
                    return '---'
            }
        }
    
    },
    {
        Header: 'Fecha de creación',
        footer: 'Fecha de creación',
        accessor: 'createdon',
        Cell: ({ value }) => { return value ? <p className=" m-0 fw-bolder texto-lista m-0">{Moment(value).format("DD-MM-YYYY")}</p> : '-' }
    },

    {
        Header: 'Prioridad',
        footer: 'Prioridad',
        accessor: 'prioritycode',
        Cell: ({ value }) => {
            switch (value) {
                case 0:
                    return <span className="text-center fw-bolder">Baja</span>    
                case 1:
                    return <span className="text-center fw-bolder">Media</span>
                case 2:
                    return <span className="text-center fw-bolder">Alta</span>
                case 3:
                    return <span className=" text-center fw-bolder badge bg-danger ">Urgente</span>        
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
                    return <span className="fw-bolder badge bg-danger">Si</span>   
                case false:
                    return <span className="fw-bolder align-self-center">No</span>
                default:
                    return '---'
            }
        }
    },

    {
        Header: 'Area a escalar',
        accessor: '_new_areaaescalar_value',
        // Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
        Cell: ({value}) => {
            return(
                <AreaAescalar id={value} />
            )
        }
    },
       
    // {
    //     accessor: 'incidentid',
    //     Cell: ({ value }) => {
    //         return (
    //             <SeleccionarCFM value={value} />
    //         )
    //     }
    // },

]