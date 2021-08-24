import React from "react"

import { useForm } from "../hooks"
import schema from "../validation"

import { Input } from "./common/Input"

const initState = {
    username: "",
    password: "",
}

const options = {
    initState,
    validationSchema: schema.loginForm,
}

export function LoginForm() {
    const { inputs, errors, hasErrors, handleSubmit, handleChange } =
        useForm(options)

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

                <button
                    disabled={hasErrors}
                    type="submit"
                    className="btn btn-primary"
                >
                    Login
                </button>
            </form>
        </>
    )
}
