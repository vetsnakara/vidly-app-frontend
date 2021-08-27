import React, { createContext, useReducer } from "react"

import { appReducer } from "../reducer"
import { getCurrentUser } from "../services/authService"

const stateContext = createContext()
const dispatchContext = createContext()

const appState = {
    user: getCurrentUser(),
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
