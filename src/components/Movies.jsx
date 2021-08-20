import React, { useState, useEffect } from "react"

import { getMovies } from "../services/fakeMovieService"

export function Movies({ onRemove }) {
    const [movies, setMovies] = useState([])

    const { length: moviesCount } = movies

    useEffect(() => {
        const movies = getMovies()
        setMovies(movies)
    }, [])

    function handleRemove({ _id }) {
        setMovies((movies) => movies.filter((m) => m._id !== _id))
    }

    if (!moviesCount) return <p>There no movies in database</p>

    return (
        <>
            <p>Showing {moviesCount} movies in database</p>

            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (
                        <tr key={m._id}>
                            <th>{m.title}</th>
                            <td>{m.genre.name}</td>
                            <td>{m.numberInStock}</td>
                            <td>{m.dailyRentalRate}</td>
                            <td>
                                <button
                                    onClick={() => handleRemove(m)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
