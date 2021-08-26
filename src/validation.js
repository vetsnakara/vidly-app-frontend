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
    movieForm: {
        title: Joi.string().required().min(5).label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(1).max(10).label("Rate"),
    },
}

export default schema
