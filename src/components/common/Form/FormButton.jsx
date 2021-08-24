import React, { useContext } from "react"
import { Button } from "../Button"

import { formContext } from "./Form"

export function FormButton({ children, ...rest }) {
    const { isValid } = useContext(formContext)

    return (
        <Button disabled={!isValid} {...rest}>
            {children}
        </Button>
    )
}
