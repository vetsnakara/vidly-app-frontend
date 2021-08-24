import React from "react"

export function Input({
    name,
    value,
    error,
    label,
    type = "text",
    onChange,
    ...props
}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="form-control"
                {...props}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}
