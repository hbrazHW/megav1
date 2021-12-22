import React from 'react'
import Moment from 'moment'
import SeleccionarFila from '../Tables/SeleccionarFila'
import Asuntos from './Asuntos'
import Contacts from './Contacts'
import Cuenta from './Cuenta'

export const COLUMNASLEGALES = [
    {
        Header: 'Autor',
        footer: 'Autor',
        accessor: '_createdby_value',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
    },


    {
        Header: 'Persona que recepcionó',
        footer: 'Persona que recepcionó',
        accessor: '_new_personaquerecepcion_value',
        // Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0">{value}</p> : '-' }
        Cell: ({value}) => {
            return(
                <Contacts id={value} />
            )
        }
    },

    {
        Header: 'Descripción del Documento',
        footer: 'Descripción del Documento',
        accessor: 'new_descripcindeldocumento',
        Cell: ({ value }) => {
            switch (value) {
                case 100000000:
                    return 'CARTA DOCUMENTO'
                case 100000001:
                    return 'TELEGRAMA'
                case 100000002:
                    return 'CONTRATO'
                case 100000003:
                    return 'DENUNCIA'
                case 100000004:
                    return 'MANDAMIENTO DE INTIMACIÓN'
                case 100000005:
                    return 'ACTA'
                case 100000006:
                    return 'NOTA'
                case 100000007:
                    return 'OTROS'
                case 100000008:
                    return 'CÉDULA'
                case 100000009:
                    return 'OFICIO'
                case 100000010:
                    return 'DEMANDA'
                default:
                    return '---'
            }
        }
    },

    {
        Header: 'Fecha de creación',
        footer: 'Fecha de creación',
        accessor: 'createdon',
        Cell: ({ value }) => { return value ? <p className=" m-0 texto-lista m-0">{Moment(value).format("DD-MM-YYYY")}</p> : '-' }
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