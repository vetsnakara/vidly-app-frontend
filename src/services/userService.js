import http from "./httpService"
import { loginWithToken } from "./authService"

import { getUserFromToken } from "../utils"

const URL = "/users"

export async function register({ username, password, name }) {
    const {
        data: { token },
    } = await http.post(URL, {
        email: username,
        password,
        name,
    })

    loginWithToken(token)

    return getUserFromToken(token)
}
