import _ from "lodash"
import React, { useState } from "react"
import { Input } from "./common/Input"

const initState = {
    username: "",
    password: "",
}

export function LoginForm() {
    const [{ username, password }, setState] = useState(initState)
    const [errors, setErrors] = useState({})

    return (
        <>
            <h1>Login</h1>

            <form className="mb-2" onSubmit={handleSubmit}>
                <Input
                    name="username"
                    value={username}
                    error={errors.username}
                    onChange={handleChange}
                    label="Username"
                    placeholder="Enter username"
                    autoComplete="off"
                />
                <Input
                    type="password"
                    name="password"
                    value={password}
                    error={errors.password}
                    onChange={handleChange}
                    label="Password"
                    placeholder="Enter password"
                    autoComplete="off"
                />

                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </>
    )

    // Function
    // ......................................

    /**
     * Handle change input
     */
    function handleChange({ target: { name, value } }) {
        setState((state) => ({
            ...state,
            [name]: value,
        }))
    }

    /**
     * Submit form
     */
    function handleSubmit(e) {
        e.preventDefault()

        const errors = validate()
        setErrors(errors || {})

        if (errors) return

        setState(initState)
    }

    /**
     * Validation
     */
    function validate() {
        const errors = {}

        if (!username.trim()) {
            errors.username = "Username is required"
        }

        if (!password.trim()) {
            errors.password = "Password is required"
        }

        return _.keys(errors).length ? errors : null
    }
}
