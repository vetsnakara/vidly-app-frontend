import React, { createContext } from "react"
import { useForm } from "./useForm"

export const formContext = createContext()

const { Provider } = formContext

export function Form({ options, children }) {
    const formState = useForm(options)

    const { handleSubmit } = formState

    return (
        <Provider value={formState}>
            <form onSubmit={handleSubmit}>{children}</form>
        </Provider>
    )
}
