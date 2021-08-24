import React from "react"

export function Select({
    name,
    options,
    value,
    error,
    label,
    onChange,
    ...props
}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"
                {...props}
            >
                {options.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                        {name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}
