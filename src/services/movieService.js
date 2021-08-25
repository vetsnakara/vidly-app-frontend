import http from "./httpService"

// todo: create class ???

const URL = "/movies"

export async function getMovies() {
    const { data: movies } = await http.get(URL)
    return movies
}

export async function deleteMovie(movieId) {
    return http.delete(`${URL}/${movieId}`)
}
