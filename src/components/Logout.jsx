import { useContext, useEffect } from "react"
import { useHistory } from "react-router"

import * as actions from "../actions"

import { dispatchContext } from "./StateProvider"

import { logout } from "../services/authService"

export function Logout() {
    const history = useHistory()
    const appDispatch = useContext(dispatchContext)

    useEffect(() => {
        logout()
        appDispatch(actions.logout())
        history.push("/")
    }, [])

    return null
}
