import React from "react"

import { Input } from "./Input"

export function Search({ value, onChange, ...rest }) {
    return <Input value={value} onChange={handleSearch} {...rest} />

    // Functions
    // ...........................................

    function handleSearch({ target: { value } }) {
        onChange(value.trim())
    }
}
