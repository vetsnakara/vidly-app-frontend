import { useEffect, useState } from "react"
import _ from "lodash"
import Joi from "joi-browser"

export function useForm({
    state,
    validationSchema,
    isFormValid = true,
    submitCallback,
}) {
    const [inputs, setInputs] = useState(state)
    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState(isFormValid)

    useEffect(() => {
        setInputs(state)
    }, [state])

    return {
        inputs,
        errors,
        isValid,
        handleSubmit,
        handleChange,
    }

    // Functions
    // .....................................

    function handleSubmit(e) {
        e.preventDefault()

        const validationErrors = validate(inputs, validationSchema)

        setErrors(validationErrors || {})

        if (validationErrors) return

        submitCallback(inputs)
    }

    function handleChange({ target: { name, value } }) {
        const inputsUpdated = {
            ...inputs,
            [name]: value,
        }

        const options = { abortEarly: false }

        const validationErrors = validate(
            inputsUpdated,
            validationSchema,
            options
        )

        const errorMessage =
            validationErrors && validationErrors[name]
                ? validationErrors[name]
                : null

        setInputs(inputsUpdated)

        setErrors((errors) => ({
            ...errors,
            [name]: errorMessage,
        }))

        setIsValid(!Boolean(validationErrors))
    }

    function validate(obj, schema) {
        const options = { abortEarly: false }
        const { error } = Joi.validate(obj, schema, options)

        if (!error) return null

        const errors = _.reduce(
            error.details,
            (errors, { message, path: [field] }) => {
                errors[field] = message
                return errors
            },
            {}
        )

        return errors
    }
}
