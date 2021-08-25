import React from "react"

import logger from "../../services/logService"

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        logger.log(error)
        console.log("error", error)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Что-то пошло не так.</h1>
        }

        return this.props.children
    }
}
