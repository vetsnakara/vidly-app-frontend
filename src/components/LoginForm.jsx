import React, { useState } from "react"

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
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Username"
                        autoComplete="off"
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Password"
                        autoComplete="off"
                    />
                </div>

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
