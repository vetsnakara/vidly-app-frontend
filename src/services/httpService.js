import axios from "axios"
import { toast } from "react-toastify"

import logger from "./logService"

import config from "../config.json"

axios.defaults.baseURL = config.apiEndpoint || ""

axios.interceptors.response.use(
    (response) => {
        const { headers } = response
        const token = headers["x-auth-token"]

        if (token) {
            response.data = {
                ...response.data,
                token,
            }
        }

        return response
    },
    (error) => {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedError) {
            logger.log(error)
            toast.error("Unexpected error occurred")
            console.error("Logging unexpected error", error)
        }

        return Promise.reject(error)
    }
)

function setTokenHeader(token) {
    axios.defaults.headers.common["x-auth-token"] = token
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setTokenHeader,
}
