import React, {createContext,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {certificate} from '../api/config';

const AuthorContext = createContext();

export function Author({children}){
    const [isLogin,setLogin] = React.useState();
    const [userID, setUserID] = React.useState();
    const [role, setRole] = React.useState();
    
    useEffect(() => {
        certificate().then(response =>{
            const {isLogged, userId,identity} = response.data; 
            setLogin(isLogged);
            setUserID(userId);
            setRole(identity);
        });
    }, []);
    return (
        <AuthorContext.Provider value={{isLogin,userID,role,setLogin}} >
            {children}
        </AuthorContext.Provider>
    )
}


export const useAthContext = () =>{
    return useContext(AuthorContext);
}
 