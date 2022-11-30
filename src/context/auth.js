import React, {useReducer, createContext} from 'react';
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

//checks if stored token is expired, else persists the token to initial state
if(localStorage.getItem("jwt-token"))
{
    const decodedToken = jwtDecode(localStorage.getItem("jwt-token"))

    console.log(decodedToken)
    
    if(decodedToken.exp * 1000 < Date.now() )
    {
        localStorage.removeItem('jwt-token')
    }
    else
    {
        initialState.user = decodedToken
    }
}


//global context for authentication and auth operations
const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

//reducer
function authReducer(state, action){
    switch(action.type){
        case'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props){
    const [state,dispatch] = useReducer(authReducer, initialState)
    console.log('authtest')

    //stores token locally upon loging in and stores it to the global authcontext as well
    function login(userData){
        console.log(userData)
        localStorage.setItem("jwt-token", userData)

        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    //removes stored tokens locally and from auth context
    function logout(){
        localStorage.removeItem("jwt-token")
        dispatch({
            type: 'LOGOUT'
        })
    }

    return(
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
            />
    )
}

export {AuthContext, AuthProvider}