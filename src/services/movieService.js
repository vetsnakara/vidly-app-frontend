import _ from "lodash"
import http from "./httpService"

// todo: create class ???

const URL = "/movies"

export async function getMovies() {
    const { data: movies } = await http.get(URL)
    return movies
}

export async function getMovie(movieId) {
    const { data: movie } = await http.get(`${URL}/${movieId}`)
    return movie
}

export async function saveMovie(movie) {
    if (movie._id) {
        const movieData = _.omit(movie, "_id")
        return http.put(`${URL}/${movie._id}`, movieData)
    }

    return http.post(URL, movie)
}

export async function deleteMovie(movieId) {
    return http.delete(`${URL}/${movieId}`)
}
