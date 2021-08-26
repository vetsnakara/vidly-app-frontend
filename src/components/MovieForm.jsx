import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"

import { Form } from "./common/Form/Form"
import { FormInput as Input } from "./common/Form/FormInput"
import { FormButton as Button } from "./common/Form/FormButton"
import { FormSelect as Select } from "./common/Form/FormSelect"

import schema from "../validation"

import { getMovie, saveMovie } from "../services/movieService"
import { getGenres } from "../services/genreService"

export function MovieForm() {
    const history = useHistory()
    const { id } = useParams()

    const [movie, setMovie] = useState({})
    const [genres, setGenres] = useState([])

    const [submitCount, setSubmitCount] = useState(0)

    const options = getOptions(movie)

    useEffect(() => {
        fetchFormData()
    }, [])

    useEffect(() => {
        if (submitCount) {
            saveFormData()
        }
    }, [submitCount])

    return (
        <>
            <h1>Movie</h1>

            <Form options={options}>
                <Input
                    name="title"
                    label="Title"
                    placeholder="Enter title"
                    autoFocus
                />

                <Select name="genreId" options={genres} label="Genre" />

                <Input
                    name="numberInStock"
                    label="Number in Stock"
                    placeholder="Enter number in stock"
                />

                <Input
                    name="dailyRentalRate"
                    label="Rate"
                    placeholder="Enter daily rental rate"
                />

                <Button type="submit">Save</Button>
            </Form>
        </>
    )

    // Functions
    // ....................................................

    async function fetchFormData() {
        try {
            const [genres, movie] = await Promise.all([
                getGenres(),
                id ? getMovie(id) : null,
            ])

            setGenres(genres)
            if (movie) setMovie(mapDbMovieObject(movie))
        } catch (error) {
            if (error.response && error.response.status === 404) {
                history.replace("/not-found")
            }
            console.error(error)
        }
    }

    async function saveFormData() {
        try {
            await saveMovie(movie)
            history.push("/movies")
        } catch (error) {
            console.error(error)
        }
    }

    function handleSubmit(movie) {
        setMovie((prevMovie) => ({
            ...prevMovie,
            ...movie,
        }))

        setSubmitCount(submitCount + 1)
    }

    function getOptions({ title, numberInStock, dailyRentalRate, genreId }) {
        const state = {
            title: title || "",
            numberInStock: numberInStock || "",
            dailyRentalRate: dailyRentalRate || "",
            genreId: genreId || (genres.length > 0 ? genres[0]._id : ""),
        }

        return {
            state,
            validationSchema: schema.movieForm,
            submitCallback: handleSubmit,
            isFormValid: Boolean(id),
        }
    }
}

function mapDbMovieObject(movie) {
    return {
        _id: movie._id,
        title: movie.title,
        genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
    }
}
