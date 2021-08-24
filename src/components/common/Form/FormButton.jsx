import React, { useContext } from "react"
import { Button } from "../Button"

import { formContext } from "./Form"

export function FormButton({ children, ...rest }) {
    const { hasErrors } = useContext(formContext)

    return (
        <Button disabled={hasErrors} {...rest}>
            {children}
        </Button>
    )
}
