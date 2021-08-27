import React, { useContext } from "react"
import { Select } from "../Select"

import { formContext } from "./Form"

export function FormSelect({ name, label, type = "text", ...rest }) {
    const { inputs, errors, handleChange } = useContext(formContext)

    const value = inputs[name]
    const error = errors[name]

    return (
        <Select
            name={name}
            value={value}
            label={label}
            error={error}
            onChange={handleChange}
            {...rest}
        />
    )
}
