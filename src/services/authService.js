import http from "./httpService"

import { getUserFromToken } from "../utils"
import { TOKEN_KEY } from "../constants"

const URL = "/auth"

initHttpService()

export async function login(data) {
    const { data: token } = await http.post(URL, data)

    loginWithToken(token)

    return getUserFromToken(token)
}

export function logout() {
    window.localStorage.removeItem(TOKEN_KEY)
    http.setTokenHeader(null)
}

export function loginWithToken(token) {
    window.localStorage.setItem(TOKEN_KEY, token)
    http.setTokenHeader(token)
}

export function getCurrentUser() {
    const token = getToken()
    return getUserFromToken(token)
}

export function getToken() {
    return window.localStorage.getItem(TOKEN_KEY)
}

function initHttpService() {
    const token = getToken()
    http.setTokenHeader(token)
}
