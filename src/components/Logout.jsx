import { useContext, useEffect } from "react"
import { useHistory } from "react-router"

import * as actions from "../actions"

import { dispatchContext } from "./StateProvider"

export function Logout() {
    const history = useHistory()
    const appDispatch = useContext(dispatchContext)

    useEffect(() => {
        window.localStorage.removeItem("token")
        appDispatch(actions.logout())
        history.push("/")
    }, [])

    return null
}
