import Joi from "joi-browser"

const schema = {
    loginForm: {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    },
}

export default schema
