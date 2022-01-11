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
        accessor: 'new_name',
        Cell: ({ value }) => { return value ? <p className=" m-0  texto-lista m-0 fw-bolder">{value}</p> : '-' }
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
                    return <span class="badge badge-personalizado-naranja">CARTA DOCUMENTO</span>
                case 100000001:
                    return <span class="badge badge-personalizado-naranja">TELEGRAMA</span>
                case 100000002:
                    return <span class="badge badge-personalizado-naranja">CONTRATO</span>
                case 100000003:
                    return <span class="badge badge-personalizado-naranja">DENUNCIA</span>
                case 100000004:
                    return <span class="badge badge-personalizado-naranja">MANDAMIENTO DE INTIMACIÓN</span>
                case 100000005:
                    return <span class="badge badge-personalizado-naranja">ACTA</span>
                case 100000006:
                    return <span class="badge badge-personalizado-naranja">NOTA</span>
                case 100000007:
                    return <span class="badge badge-personalizado-naranja">OTROS</span>
                case 100000008:
                    return <span class="badge badge-personalizado-naranja">CÉDULA</span>
                case 100000009:
                    return <span class="badge badge-personalizado-naranja">OFICIO</span>
                case 100000010:
                    return <span class="badge badge-personalizado-naranja">DEMANDA</span>
                default:
                    return '---'
            }
        }
    },

    {
        Header: 'Fecha de creación',
        footer: 'Fecha de creación',
        accessor: 'createdon',
        Cell: ({ value }) => { return value ? <p className=" m-0 texto-lista m-0 fw-bolder">{Moment(value).format("DD-MM-YYYY")}</p> : '-' }
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