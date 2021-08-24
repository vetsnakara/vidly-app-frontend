import React from "react"

export function Button({ type = "button", children, ...rest }) {
    return (
        <button type={type} className="btn btn-primary" {...rest}>
            {children}
        </button>
    )
}
