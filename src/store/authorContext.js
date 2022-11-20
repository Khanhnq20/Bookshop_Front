import React, {createContext,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {certificate} from '../api/config';

const AuthorContext = createContext();

export function Author({children}){
    const [isLogin,setLogin] = React.useState();
    const [userID, setUserID] = React.useState();
    
    useEffect(() => {
        certificate().then(response =>{
            const {isLogged, userId} = response.data; 
            console.log(response.data);
            setLogin(isLogged);
            setUserID(userId);
        });
    }, []);
    return (
        <AuthorContext.Provider value={{isLogin,userID,setLogin}} >
            {children}
        </AuthorContext.Provider>
    )
}


export const useAthContext = () =>{
    return useContext(AuthorContext);
}
 