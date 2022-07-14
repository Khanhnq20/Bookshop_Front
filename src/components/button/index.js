import React from 'react';

export default function Button({children, ...restProp}){
    return(
        <a className="button" {...restProp}>
            {children}
        </a>
    )
}