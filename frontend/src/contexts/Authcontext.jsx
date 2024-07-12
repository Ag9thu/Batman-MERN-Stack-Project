import { useEffect, useReducer } from "react";
import { createContext } from "react";
import axios from "../helpers/axios";

const AuthContext = createContext();


const AuthcontextProvider = ({children}) => {
     

    let Authreducer = (state,action) => {
        switch (action.type) {
            case "LOGIN":
                localStorage.setItem('user',JSON.stringify(action.payload))
                return {user: action.payload}
            case "LOGOUT":
                localStorage.removeItem('user')
                return {user: null}
            default:
                break;
        }
    }


    let [state,dispatch] =useReducer(Authreducer,{
        user: {
            name: null,
        },
    })

    useEffect(() => {
        //check if user is logged in
        try{
             axios.get('/api/users/me').then(res => {
                let user = res.data
                if(user) {
                    dispatch({type : 'LOGIN',payload : user})
                }else{
                    dispatch({type : 'LOGOUT'})}
                
            }
                
            )
            
            
        }catch(e) {
            dispatch({type : 'LOGOUT'})
        }
    }, [])

    


    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext,AuthcontextProvider }