import React, { useState } from "react"
import { Input } from "./common/Input"

const initState = {
    username: "",
    password: "",
}

export function LoginForm() {
    const [{ username, password }, setState] = useState(initState)

    return (
        <>
            <h1>Login</h1>

            <form className="mb-2" onSubmit={handleSubmit}>
                <Input
                    name="username"
                    value={username}
                    onChange={handleChange}
                    label="Username"
                    placeholder="Enter username"
                    autoComplete="off"
                />
                <Input
                    type="password"
                    name="password"
                    value={password}
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

    function handleChange({ target: { name, value } }) {
        setState((state) => ({
            ...state,
            [name]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log("submit", username, password)
        setState(initState)
    }
}
