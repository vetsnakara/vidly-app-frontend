import React from "react"

import schema from "../validation"
import { Form } from "./common/Form/Form"

import { FormInput as Input } from "./common/Form/FormInput"
import { FormButton as Button } from "./common/Form/FormButton"

const initState = {
    username: "",
    password: "",
    name: "",
}

const options = {
    initState,
    validationSchema: schema.registerForm,
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
