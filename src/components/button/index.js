import React from 'react';

export default function Button({children, ...restProp}){
    return(
        <a className="button" {...restProp}>
            {children}
        </a>
    )
}


Button.Delete = ({children,...restProp}) =>{
    return(
        <a className="button__delete" {...restProp}>
            {children}
        </a>
    )
}

Button.Update = ({ children, ...restProp }) => {
    return (
        <input className="button__update" value={children} {...restProp}></input>
    )
}