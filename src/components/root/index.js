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

Component.Flex = function ({ children, ...restProp }) {
    return(
        <div className="component__flex" {...restProp}>
            {children}
        </div>
    )
}

