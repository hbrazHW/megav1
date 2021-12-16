import axios from 'axios'
import { auth, firebase } from '../Firebase'
import { Entidad, UrlApiDynamics } from '../Keys'

//constantes
const dataInicial = {
    loading: false,
    activo: false,
    error: false,
    accountid: '',
    resultado: ''
}

//Types auth/wrong-password
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'
const REGISTRO_USUARIO = 'REGISTRO_USUARIO'
const USUARIO_ACTUALIZACION = 'USUARIO_ACTUALIZACION'
const LIMPIAR_ERROR = 'LIMPIAR_ERROR'
const REGISTRO_USUARIO_EXISTENTE = 'REGISTRO_USUARIO_EXISTENTE'
const RECUPERO_EXITO = 'RECUPERO_EXITO'

//Reducers
export default function usuariosReducer(state = dataInicial, action) {
    switch (action.type) {
        case USUARIO_ACTUALIZACION:
            return { ...state, accountid: action.accountid }
        case REGISTRO_USUARIO:
            return { ...state, loading: false, user: action.payload, activo: true, accountid: action.accountid, error: false, resultado: action.resultado }
        case CERRAR_SESION:
            return { ...dataInicial, loading: false, activo: false }
        case USUARIO_EXITO:
            return { ...state, loading: false, user: action.payload, activo: true, accountid: action.accountid, error: false, resultado: action.resultado }
        case REGISTRO_USUARIO_EXISTENTE:
            return { ...state, resultado: action.resultado }
            case USUARIO_ERROR:
            return { ...dataInicial, error: true, resultado: action.resultado }
        case LIMPIAR_ERROR:
            return { ...state, error: false }
        case LOADING:
            return { ...state, resultado: action.resultado }
        default:
            return { ...state }
    }
}

//Actions
export const loginUsuario = (email, pass) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        let accountid = undefined
        const resp = await auth.signInWithEmailAndPassword(email, pass)
       
        await firebase.collection('usuarios').doc(resp.user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    const documento = doc.data()
                    accountid = documento.accountid
                    localStorage.setItem('usuario', JSON.stringify({
                        email: resp.user.email,
                        uid: resp.user.uid,
                        accountid: documento.accountid
                    }))
                }
            })

        dispatch({
            type: USUARIO_EXITO,
            accountid: accountid,
            payload: {
                email: resp.user.email,
                uid: resp.user.uid,
                accountid: accountid
            }
        })
    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const registrarUsuario = (email, pass) => async (dispatch) => {
    dispatch({
        type: LOADING,
        resultado: 'LOADING',
    })

    try {
        
        const respMail = await axios.get(`${UrlApiDynamics}Account?filter=emailaddress1 eq '${email}'&cuit=${Entidad}`)
        if (respMail.data.length > 0) {
            const accountid = respMail.data[0].Accountid;
            const resp = await auth.createUserWithEmailAndPassword(email, pass)
            //Crea un registro de usuario
            await firebase.collection('usuarios').doc(resp.user.uid).set({
                email: resp.user.email,
                uid: resp.user.uid,
                accountid: accountid
            })

            localStorage.setItem('usuario', JSON.stringify({
                email: resp.user.email,
                uid: resp.user.uid,
                accountid: accountid
            }))

            dispatch({
                type: REGISTRO_USUARIO,
                accountid: accountid,
                resultado: 'EXITO',
                payload: {
                    email: resp.user.email,
                    uid: resp.user.uid,
                    accountid: accountid
                }
            })
        }else{
            dispatch({
                type: REGISTRO_USUARIO_EXISTENTE,
                resultado: 'ERROR',
            })
        }

    } catch (error) {
        dispatch({
            type: USUARIO_ERROR, 
            resultado: 'ERROR'
        })
    }
}

export const cerrarSesion = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        //Cierra sesion en firestore
        auth.signOut()
        //Eliminamos el usuario del local storage
        localStorage.removeItem('usuario')
        dispatch({
            type: CERRAR_SESION
        })
    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const leerUsuarioActivo = () => (dispatch) => {
    if (localStorage.getItem('usuario')) {
        const user = JSON.parse(localStorage.getItem('usuario'))
        dispatch({
            type: USUARIO_EXITO,
            payload: user,
            accountid: user.accountid

        })
    }
}

export const actualizarAccountid = (uid) => async (dispatch) => {
    try {
        await firebase.collection('usuarios').doc(uid).get()
            .then((doc) => {
               
                if (doc.exists) {
                    const documento = doc.data()
                    dispatch({
                        type: USUARIO_ACTUALIZACION,
                        accountid: documento.accountid
                    })
                }
            })
    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const limpiarError = () => (dispatch) => {
    dispatch({
        type: LIMPIAR_ERROR
    })
}

export const recuperarContraseña = (email) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const resp = await auth.sendPasswordResetEmail(email)

    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}