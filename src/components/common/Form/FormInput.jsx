import React, { useContext } from "react"
import { Input } from "../Input"

import { formContext } from "./Form"

export function FormInput({ name, label, type = "text", ...rest }) {
    const { inputs, errors, handleChange } = useContext(formContext)

    const value = inputs[name]
    const error = errors[name]

    return (
        <Input
            type={type}
            name={name}
            value={value}
            error={error}
            onChange={handleChange}
            {...rest}
        />
    )
}
