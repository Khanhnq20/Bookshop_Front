import React from "react";

export default function FormComponent({ children, ...restProp }) {
    return (
        <form className="form" {...restProp}>
            {children}
        </form>
    )
}

FormComponent.Input = function ({ children, ...restProp }) {
    return (
        <input className="form__input" {...restProp}>
        </input>
    )
}

FormComponent.Image = function ({ children, ...restProp }) {
    return (
        <img className="form__image" {...restProp}>
        </img>
    )
}

FormComponent.Item = function ({ children, ...restProp }) {
    return (
        <div className="form__item" {...restProp}>
            {children}
        </div>
    )
}