import React from "react";

export default function Text({ children, ...props }) {
    return (
        <p className="text" {...props}>
            {children}
        </p>
    );
}
Text.Title = function ({ children, forwardedRef, ...props }) {
    return (
        <h2 className="text__title" ref={forwardedRef} {...props}>
            {children}
        </h2>
    );
};
Text.Subtitle = function ({ children, ...props }) {
    return (
        <h3 className="text__subtitle" {...props}>
            {children}
        </h3>
    );
};
Text.Date = function ({ children, ...props }) {
    return (
        <p className="text__date" {...props}>
            {children}
        </p>
    );
};
Text.Paragraph = function ({ children, ...props }) {
    return <p className='text__paragraph' {...props}>{children}</p>
}

Text.Link = function ({children,...restProp}){
    return(
        <a className="text__link" {...restProp}>{children}</a>
    )
}

Text.Label = function ({ children, ...restProp }) {
    return (
        <p className="text__label" {...restProp}>{children}</p>
    )
}

Text.Info = function ({ children, ...restProp }) {
    return (
        <p className="text__info" {...restProp}>{children}</p>
    )
}

Text.Price = function ({ children, ...restProp }) {
    return (
        <p className="text__price" {...restProp}>{children}</p>
    )
}