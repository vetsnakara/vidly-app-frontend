import React from "react"

import { Form } from "./common/Form/Form"
import { FormInput as Input } from "./common/Form/FormInput"
import { FormButton as Button } from "./common/Form/FormButton"

import schema from "../validation"

const state = {
    username: "",
    password: "",
}

const options = {
    state,
    validationSchema: schema.loginForm,
    isFormValid: false,
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
                />
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                />
                <Button type="submit">Login</Button>
            </Form>
        </>
    )
}
