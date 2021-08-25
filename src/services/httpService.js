import axios from "axios"

import config from "../config.json"

axios.defaults.baseURL = config.apiEndpoint || ""

axios.interceptors.response.use(null, (error) => {
    console.log("Call axios response interceptor")

    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500

    if (!expectedError) {
        console.error("Logging unexpected error", error)
    }

    return Promise.reject(error)
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}
