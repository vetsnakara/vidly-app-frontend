import React from "react"

import schema from "../validation"
import { Form } from "./common/Form/Form"

import { FormInput as Input } from "./common/Form/FormInput"
import { FormButton as Button } from "./common/Form/FormButton"

const state = {
    username: "",
    password: "",
    name: "",
}

const options = {
    state,
    validationSchema: schema.registerForm,
    isFormValid: false,
}

export function RegisterForm() {
    return (
        <>
            <h1>Register</h1>

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
                <Input name="name" label="Name" placeholder="Enter name" />
                <Button type="submit">Login</Button>
            </Form>
        </>
    )
}
