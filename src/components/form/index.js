import React from "react";

export default function Form({ children, ...restProp }) {
    return (
        <div className="form" {...restProp}>
            {children}
        </div>
    )
}

Form.Input = function ({ children, ...restProp }) {
    return (
        <input type={"text"} className="form__input" {...restProp}>
            {children}
        </input>
    )
}

Form.Image = function ({ children, ...restProp }) {
    return (
        <img className="form__image" {...restProp}>
        </img>
    )
}

Form.Item = function ({ children, ...restProp }) {
    return (
        <div className="form__item" {...restProp}>
            {children}
        </div>
    )
}