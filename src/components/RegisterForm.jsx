import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router"

import { dispatchContext } from "./StateProvider"

import schema from "../validation"
import { register } from "../services/userService"

import * as actions from "../actions"

import { Form } from "./common/Form/Form"
import { FormInput as Input } from "./common/Form/FormInput"
import { FormButton as Button } from "./common/Form/FormButton"
import { getUserFromToken } from "../utils"

const state = {
    username: "",
    password: "",
    name: "",
}

export function RegisterForm() {
    const history = useHistory()
    const appDispatch = useContext(dispatchContext)

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
            const {
                data: { token },
            } = await register(user)
            const userDecoded = getUserFromToken(token)

            window.localStorage.setItem("token", token)
            appDispatch(actions.login(userDecoded))
            history.push("/")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors({ username: "User is already registered" })
            }
        }
    }
}
