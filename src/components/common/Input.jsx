import React from "react"

export function Input({
    name,
    value,
    error,
    label,
    type = "text",
    autoComplete = "off",
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
                autoComplete={autoComplete}
                className="form-control"
                {...props}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}
