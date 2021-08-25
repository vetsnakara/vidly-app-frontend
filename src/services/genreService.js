import http from "./httpService"

// todo: create class ???

export async function getGenres() {
    const { data: genres } = await http.get("/genres")
    return genres
}
