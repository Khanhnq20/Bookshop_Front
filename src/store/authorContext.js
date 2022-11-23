import React, {createContext,useContext,useEffect } from "react";
import {certificate, logout as apiLogout, login as apiLogin} from '../api/config';

const AuthorContext = createContext();

export function Author({children}){
    const [state, setState] = React.useState({
        isLogin: undefined,
        userID: 0,
        role: "",
    });
    useEffect(() => {
        window.addEventListener("storage", () =>{
            console.log("dispatch events")
            certificate().then(response =>{
                const {isLogged, userId,identity} = response.data;
                setState({
                    isLogin: isLogged,
                    userID: userId,
                    role: identity
                })
            });
        });

        console.log("out")

        window.dispatchEvent(new Event("storage"));

        return () =>{
            window.removeEventListener("storage", () =>{});
        }
    }, []);


    // useEffect(() => {
    //     if(!state.isLogin){
    //         localStorage.removeItem("cart");
    //         localStorage.removeItem("access");
    //         return;
    //     }
    // }, [state.isLogin])

    function logout(onSuccess, onError) {
        apiLogout().then(()=>{
            setLogin(false);
            setRole("");
            setUserID("");
            onSuccess?.();
            localStorage.removeItem("cart");
            localStorage.removeItem("access");
        }).catch(() =>{
            onError?.();
        });
    }
    const asyncLocalStorage = {
        setItem: function (key, value) {
            return Promise.resolve().then(function () {
                localStorage.setItem(key, value);
            });
        },
        getItem: function (key) {
            return Promise.resolve().then(function () {
                return localStorage.getItem(key);
            });
        }
    };
    const login = React.useCallback((email,password, onSuccess, onError)=>{
        apiLogin(email, password).then(res => {
            let data = res.data;
            asyncLocalStorage.setItem("access",data?.token).then(() =>{
                return asyncLocalStorage.getItem("access");
            }).then(value =>{
                window.dispatchEvent(new Event("storage"));
            });

            setLogin(true);
            onSuccess?.();
        }).catch(e =>{
            onError?.();
        });
    }, [state.isLogin])
    function setLogin(isLogin){
        setState(o=>({...o,isLogin}));
    }
    function setUserID(userID) {
        setState(o=>({...o,userID}));
    }
    function setRole(role) {
        setState(o=>({...o,role}));
    }

    return (
        <AuthorContext.Provider value={{...state,setLogin, logout, login}} >
            {children}
        </AuthorContext.Provider>
    )
}


export const useAthContext = () =>{
    return useContext(AuthorContext);
}
 