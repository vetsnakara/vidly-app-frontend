import React from "react"

import schema from "../validation"
import { Form } from "./common/Form/Form"

import { FormInput as Input } from "./common/Form/FormInput"
import { FormButton as Button } from "./common/Form/FormButton"

const initState = {
    username: "",
    password: "",
}

const options = {
    initState,
    validationSchema: schema.loginForm,
}

export function LoginForm() {
    return (
        <>
            <h1>Login</h1>

            <Form options={options}>
                <Input
                    name="username"
                    label="Username"
                    placeholder="Enter username"
                    autoComplete="off"
                />
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    autoComplete="off"
                />
                <Button type="submit">Login</Button>
            </Form>
        </>
    )
}
