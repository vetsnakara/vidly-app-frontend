import React, { useEffect, useState, useContext } from "react"
import { useHistory, useLocation } from "react-router"
import _ from "lodash"

import { Form } from "./common/Form/Form"
import { FormInput as Input } from "./common/Form/FormInput"
import { FormButton as Button } from "./common/Form/FormButton"

import * as actions from "../actions"

import { dispatchContext } from "./StateProvider"
import { stateContext } from "./StateProvider"

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
    const { user } = useContext(stateContext)

    const [userData, setUserData] = useState(null)
    const [errors, setErrors] = useState(null)

    const options = getOptions()

    useEffect(() => {
        if (userData) {
            loginUser(userData)
        }
    }, [userData])

    useEffect(() => {
        if (user) {
            redirect()
        }
    }, [user])

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
            appDispatch(actions.login(user))
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

    function redirect() {
        const redirectUrl =
            location.state && location.state.from ? location.state.from : "/"

        history.push(redirectUrl)
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
