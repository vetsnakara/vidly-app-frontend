import http from "./httpService"
import { getUserFromToken } from "../utils"
import { TOKEN_KEY } from "../constants"

const URL = "/auth"

export async function login(data) {
    const { data: token } = await http.post(URL, data)

    loginWithToken(token)

    return getUserFromToken(token)
}

export function logout() {
    window.localStorage.removeItem(TOKEN_KEY)
}

export function loginWithToken(token) {
    window.localStorage.setItem(TOKEN_KEY, token)
}

export function getCurrentUser() {
    const token = window.localStorage.getItem(TOKEN_KEY)
    return getUserFromToken(token)
}
