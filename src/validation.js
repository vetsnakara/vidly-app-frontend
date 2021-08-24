import Joi from "joi-browser"

const schema = {
    loginForm: {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    },
    registerForm: {
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name"),
    },
}

export default schema
