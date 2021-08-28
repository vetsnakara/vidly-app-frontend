import React, { useContext } from "react"
import { Redirect, Route, useLocation } from "react-router-dom"

import { stateContext } from "../StateProvider"

export function ProtectedRoute(props) {
    const { pathname } = useLocation()
    const { user } = useContext(stateContext)

    if (!user)
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: {
                        from: pathname,
                    },
                }}
            />
        )

    return <Route {...props} />
}
