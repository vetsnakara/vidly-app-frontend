import { useState } from "react"
import _ from "lodash"

export function useForm({ initState, validationRules }) {
    const [inputs, setInputs] = useState(initState)
    const [errors, setErrors] = useState({})

    return {
        inputs,
        errors,
        handleSubmit,
        handleChange,
    }

    // Functions
    // .....................................

    function handleSubmit(e) {
        e.preventDefault()

        const validationErrors = validateForm()

        setErrors(validationErrors || {})

        if (validationErrors) return
    }

    function handleChange({ target: { name, value } }) {
        setInputs((inputs) => ({
            ...inputs,
            [name]: value,
        }))

        const errorMessage = validateInput(name, value, validationRules[name])

        setErrors((errors) => ({
            ...errors,
            [name]: errorMessage,
        }))
    }

    function validateForm() {
        const errors = {}

        _.each(validationRules, (rules, name) => {
            const errorMessage = validateInput(name, inputs[name], rules)
            if (errorMessage) errors[name] = errorMessage
        })

        return _.keys(errors).length ? errors : null
    }
}

function validateInput(name, value, rules) {
    for (let i = 0; i < rules.length; i++) {
        const errorMessage = validateByRule(name, value, rules[i])
        if (errorMessage) return errorMessage
    }

    return null
}

function validateByRule(name, value, rule) {
    const { type, message } = rule

    switch (type) {
        case "required":
            return !value.trim() ? message : null
        default:
            return null
    }
}
