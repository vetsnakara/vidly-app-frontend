import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import "react-toastify/dist/ReactToastify.min.css"
import "./index.css"

import React from "react"
import ReactDOM from "react-dom"

import logger from "./services/logService"

import App from "./App"
import { ErrorBoundary } from "./components/common/ErrorBoundary"

logger.init()

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,

    document.getElementById("root")
)
