import _ from "lodash"
import React, { useState, useEffect } from "react"

import { Like } from "./common/Like"
import { Pagination } from "./common/Pagination"
import { ListGroup } from "./common/ListGroup"

import { PAGE_SIZE } from "../constants"
import { getMovies } from "../services/fakeMovieService"
import { getGenres } from "../services/fakeGenreService"
import { paginate } from "../utils"
import { MoviesTable } from "./MoviewTable"

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
    function handleDelete({ _id }) {
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

    const genreMovies = currentGenre._id
        ? _.filter(movies, (movie) => movie.genre._id === currentGenre._id)
        : movies

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
                <ListGroup
                    items={genres}
                    selectedItem={currentGenre}
                    onItemSelect={handleGenreChange}
                />
            </div>
            <div className="col">
                <p>
                    Showing {moviesCount} movies{" "}
                    {currentGenre._id ? ` of genre "${currentGenre.name}"` : ""}
                </p>

                <MoviesTable
                    items={moviesPaginated}
                    onDelete={handleDelete}
                    onLike={handleLike}
                />

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
