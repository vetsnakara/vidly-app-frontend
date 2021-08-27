import _ from "lodash"
import http from "./httpService"

const URL = "/movies"

export async function getMovies() {
    const { data: movies } = await http.get(URL)
    return movies
}

export async function getMovie(movieId) {
    const movieUrl = getMovieUrl(movieId)
    const { data: movie } = await http.get(movieUrl)
    return movie
}

export async function saveMovie(movie) {
    if (movie._id) {
        const movieData = _.omit(movie, "_id")
        const movieUrl = getMovieUrl(movie._id)
        return http.put(movieUrl, movieData)
    }

    return http.post(URL, movie)
}

export async function deleteMovie(movieId) {
    const movieUrl = getMovieUrl(movieId)
    return http.delete(movieUrl)
}

function getMovieUrl(id) {
    return `${URL}/${id}`
}
