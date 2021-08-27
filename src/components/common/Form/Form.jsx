import React, { createContext, useEffect } from "react"
import { useForm } from "./useForm"

export const formContext = createContext()

const { Provider } = formContext

export function Form({ options, errors, children }) {
    const formState = useForm(options)

    const { handleSubmit, setErrors } = formState

    useEffect(() => {
        if (errors) {
            setErrors(errors)
        }
    }, [errors])

    return (
        <Provider value={formState}>
            <form onSubmit={handleSubmit}>{children}</form>
        </Provider>
    )
}
