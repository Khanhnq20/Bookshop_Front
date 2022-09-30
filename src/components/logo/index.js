import React from "react";

export default function Logo({children, ...props}){
    return(
        <div className="logo" style={props.style}>
            <div className="logo__b">B</div>o<div className="logo__k">K</div>o
        </div>
    )
}