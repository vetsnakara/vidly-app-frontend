import React, { useState, useEffect } from "react"

import { Like } from "./Like"
import { Pagination } from "./Pagination"

import { PAGE_SIZE } from "../constants"
import { getMovies } from "../services/fakeMovieService"
import { paginate } from "../utils"

export function Movies({ onRemove }) {
    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const { length: moviesCount } = movies

    useEffect(() => {
        const movies = getMovies()
        setMovies(movies)
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

    if (!moviesCount) return <p>There no movies in database</p>

    const moviesPaginated = paginate({
        items: movies,
        currentPage,
        pageSize: PAGE_SIZE,
    })

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {moviesPaginated.map((m) => (
                        <tr key={m._id}>
                            <th>{m.title}</th>
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
        </>
    )
}
