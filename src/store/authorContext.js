import React, {createContext,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {certificate} from '../api/config';

const AuthorContext = createContext();

export function Author({children}){
    const [isLogin,setLogin] = React.useState();

    useEffect(() => {
        certificate().then(response =>{
            const {isLogged} = response.data; 
            setLogin(isLogged);
        });
    }, []);
    return (
        <AuthorContext.Provider value={{isLogin,setLogin}} >
            {children}
        </AuthorContext.Provider>
    )
}

const useAthContext = () =>{
    return useContext(AuthorContext);
}
export default useAthContext; 