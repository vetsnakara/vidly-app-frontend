import React, { createContext, useReducer } from "react"

import { appReducer } from "../reducer"
import { getUserFromToken } from "../utils"

const stateContext = createContext()
const dispatchContext = createContext()

const token = window.localStorage.getItem("token")

const appState = {
    user: getUserFromToken(token),
}

export function StateProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, appState)

    return (
        <stateContext.Provider value={state}>
            <dispatchContext.Provider value={dispatch}>
                {children}
            </dispatchContext.Provider>
        </stateContext.Provider>
    )
}

export { stateContext, dispatchContext }
