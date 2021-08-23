import React from "react"

import { Input } from "./common/Input"
import { useForm } from "../hooks"

const initState = {
    username: "",
    password: "",
}

const validationRules = {
    username: [
        {
            type: "required",
            message: "Username is required",
        },
    ],
    password: [
        {
            type: "required",
            message: "Password is required",
        },
    ],
}

export function LoginForm() {
    const { inputs, errors, handleSubmit, handleChange } = useForm({
        initState,
        validationRules,
    })

    const { username, password } = inputs

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
}
