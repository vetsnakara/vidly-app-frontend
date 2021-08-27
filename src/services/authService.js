import http from "./httpService"

const URL = "/auth"

export function login(data) {
    return http.post(URL, data)
}
