import axios from "axios"
import { toast } from "react-toastify"

import logger from "./logService"

import config from "../config.json"

axios.defaults.baseURL = config.apiEndpoint || ""

axios.interceptors.response.use(null, (error) => {
    console.log("Call axios response interceptor")

    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500

    if (!expectedError) {
        toast.error("Unexpected error occurred")
        logger.log(error)
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
