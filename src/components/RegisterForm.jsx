import React, { useState, useEffect } from "react"

import schema from "../validation"
import { register } from "../services/userService"

import { Form } from "./common/Form/Form"
import { FormInput as Input } from "./common/Form/FormInput"
import { FormButton as Button } from "./common/Form/FormButton"

const state = {
    username: "",
    password: "",
    name: "",
}

export function RegisterForm() {
    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        if (user) {
            registerUser(user)
        }
    }, [user])

    const options = getFormOptions()

    return (
        <>
            <h1>Register</h1>

            <Form options={options} errors={errors}>
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
                <Button type="submit">Register</Button>
            </Form>
        </>
    )

    // Functions
    // .......................................

    function getFormOptions() {
        return {
            state,
            validationSchema: schema.registerForm,
            isFormValid: false,
            submitCallback: handleSubmit,
        }
    }

    function handleSubmit(user) {
        setUser({ ...user })
    }

    async function registerUser(user) {
        try {
            await register(user)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors({ username: "User is already registered" })
            }
        }
    }
}
