import React, { useEffect, useState, useContext } from "react"
import { useHistory, useLocation } from "react-router"
import _ from "lodash"

import { Form } from "./common/Form/Form"
import { FormInput as Input } from "./common/Form/FormInput"
import { FormButton as Button } from "./common/Form/FormButton"

import * as actions from "../actions"

import { dispatchContext } from "./StateProvider"

import schema from "../validation"
import { login } from "../services/authService"

const state = {
    username: "",
    password: "",
}

export function LoginForm() {
    const history = useHistory()
    const location = useLocation()

    const appDispatch = useContext(dispatchContext)

    const [userData, setUserData] = useState(null)
    const [errors, setErrors] = useState(null)

    const options = getOptions()

    useEffect(() => {
        if (userData) {
            loginUser(userData)
        }
    }, [userData])

    return (
        <>
            <h1>Login</h1>

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
                <Button type="submit">Login</Button>
            </Form>
        </>
    )

    // Functions
    // ..............................................

    async function loginUser() {
        try {
            const user = await login(userData)
            const redirectUrl =
                location.state && location.state.from
                    ? location.state.from
                    : "/"

            appDispatch(actions.login(user))

            history.push(redirectUrl)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors({ username: error.response.data })
            }
        }
    }

    function handleSubmit(userData) {
        const data = _.extend(_.omit(userData, "username"), {
            email: userData.username,
        })

        setUserData(data)
    }

    function getOptions() {
        return {
            state,
            validationSchema: schema.loginForm,
            isFormValid: false,
            submitCallback: handleSubmit,
        }
    }
}
