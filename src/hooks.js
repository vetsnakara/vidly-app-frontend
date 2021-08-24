import { useState } from "react"
import _ from "lodash"
import Joi from "joi-browser"

export function useForm({ initState, validationSchema }) {
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

        const validationErrors = validate(inputs, validationSchema)

        setErrors(validationErrors || {})

        if (validationErrors) return
    }

    function handleChange({ target: { name, value } }) {
        setInputs((inputs) => ({
            ...inputs,
            [name]: value,
        }))

        const inputObj = { [name]: value }

        const inputSchema = {
            [name]: validationSchema[name],
        }

        const error = validate(inputObj, inputSchema)
        const errorMsg = error ? error[name] : null

        setErrors((errors) => ({
            ...errors,
            [name]: errorMsg,
        }))
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
