import React from "react"

export function Input({
    name,
    value,
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
        </div>
    )
}
