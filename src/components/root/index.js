import React from "react";

export default function Component({children,...restProp}) {
    return(
        <div className="component" {...restProp}>
            {children}
        </div>
    )
}

Component.Item = function ({ children, ...restProp }) {
    return (
        <div className="component__item" {...restProp}>
            {children}
        </div>
    )
}

Component.Span = function ({ children, ...restProp }) {
    return (
        <span className="component__span" {...restProp}>
            {children}
        </span>
    )
}

Component.Flex = function ({ children, ...restProp }) {
    return(
        <div className="component__flex" {...restProp}>
            {children}
        </div>
    )
}

Component.Grid = function ({ children, ...restProp }) {
    return (
        <div className="component__grid" {...restProp}>
            {children}
        </div>
    )
}

Component.Wrapper = function ({ children, ...restProp }) {
    return (
        <div className="component__wrapper" {...restProp}>
            {children}
        </div>
    )
}

Component.Table = function ({ children, ...restProp }) {
    return (
        <table className="component__table" {...restProp}>
            {children}
        </table>
    )
}