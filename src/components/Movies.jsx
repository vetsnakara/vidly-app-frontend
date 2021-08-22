import _ from "lodash"
import React, { useState, useEffect } from "react"

import { Like } from "./Like"
import { Pagination } from "./Pagination"

import { PAGE_SIZE } from "../constants"
import { getMovies } from "../services/fakeMovieService"
import { getGenres } from "../services/fakeGenreService"
import { paginate } from "../utils"

const defaultGenre = {
    _id: null,
    name: "All genres",
}

export function Movies({ onRemove }) {
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [currentGenre, setCurrentGenre] = useState(defaultGenre)

    useEffect(() => {
        const movies = getMovies()
        const genres = getGenres()

        setMovies(movies)
        setGenres([defaultGenre, ...genres])

        console.log("movies", movies)
        console.log("genres", genres)
    }, [])

    useEffect(() => {
        if (movies.length) {
            const moviesOnPage = paginate({
                items: movies,
                currentPage,
                pageSize: PAGE_SIZE,
            })

            if (!moviesOnPage.length) {
                setCurrentPage((currentPage) => currentPage - 1)
            }
        }
    }, [movies])

    /**
     * Genre change
     */
    function handleGenreChange(genre) {
        setCurrentGenre(genre)
        setCurrentPage(1)
    }

    /**
     * Remove movie
     */
    function handleRemove({ _id }) {
        setMovies((movies) => movies.filter((m) => m._id !== _id))
    }

    /**
     * Like/Dislike movie
     */
    function handleLike({ _id, like }) {
        setMovies((movies) =>
            movies.map((movie) =>
                movie._id === _id
                    ? {
                          ...movie,
                          like: !like,
                      }
                    : movie
            )
        )
    }

    /**
     * Page select
     */
    function handlePageChange(page) {
        setCurrentPage(page)
    }

    const genreMovies = _.filter(movies, (movie) => {
        if (!currentGenre._id) return true
        return movie.genre._id === currentGenre._id
    })

    const moviesPaginated = paginate({
        items: genreMovies,
        currentPage,
        pageSize: PAGE_SIZE,
    })

    const { length: moviesCount } = genreMovies

    if (!moviesCount) return <p>There no movies in database</p>

    return (
        <div className="row">
            <div className="col-3">
                <div className="list-group">
                    {genres.map((g) => {
                        const isSelected = g._id === currentGenre._id
                        let classes = "list-group-item list-group-item-action"

                        if (isSelected) classes += " active"

                        return (
                            <button
                                key={g._id}
                                className={classes}
                                onClick={() => handleGenreChange(g)}
                            >
                                {g.name}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className="col-9">
                <p>
                    Showing {moviesCount} movies{" "}
                    {currentGenre._id ? ` of genre ${currentGenre.name}` : ""}
                </p>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesPaginated.map((m) => (
                            <tr key={m._id}>
                                <td>{m.title}</td>
                                <td>{m.genre.name}</td>
                                <td>{m.numberInStock}</td>
                                <td>{m.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        active={m.like}
                                        onClick={() => handleLike(m)}
                                    />
                                </td>
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

                <Pagination
                    itemsCount={moviesCount}
                    pageSize={PAGE_SIZE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}
