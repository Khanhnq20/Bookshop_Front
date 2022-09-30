import React, {createContext,useContext,useEffect } from "react";
import {certificate} from '../api/config';

const AuthorContext = createContext();

export function Author({children}){
    const [isLogin,setState] = React.useState();
    useEffect(() => {
        certificate().then(response =>{
            const {isLogged} = response; 
            setState(isLogged);
        });
    }, []);
    return (
        <AuthorContext.Provider value={{isLogin,setState}} >
            {children}
        </AuthorContext.Provider>
    )
}

const useAthContext = () =>{
    return useContext(AuthorContext);
}
export default useAthContext; 