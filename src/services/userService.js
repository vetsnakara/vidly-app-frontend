import http from "./httpService"

const URL = "/users"

export function register(user) {
    return http.post(URL, {
        email: user.username,
        password: user.password,
        name: user.name,
    })
}
