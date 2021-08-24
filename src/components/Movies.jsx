import _ from "lodash"
import React, { useState, useEffect } from "react"

import { Pagination } from "./common/Pagination"
import { ListGroup } from "./common/ListGroup"

import { PAGE_SIZE } from "../constants"
import { getMovies } from "../services/fakeMovieService"
import { getGenres } from "../services/fakeGenreService"
import { paginate } from "../utils"
import { MoviesTable } from "./MoviewTable"
import { Link } from "react-router-dom"

const defaultGenre = {
    _id: null,
    name: "All genres",
}

export function Movies({ onRemove }) {
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [currentGenre, setCurrentGenre] = useState(defaultGenre)
    const [sortColumn, setSortColumn] = useState({
        path: "title",
        direction: "asc",
    })

    useEffect(() => {
        const movies = getMovies()
        const genres = getGenres()

        setMovies(movies)
        setGenres([defaultGenre, ...genres])
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

    const { moviesCount, moviesPaginated } = getPagedMovies()

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
                <Link to="/movies/new" className="btn btn-primary mb-2">
                    New Movie
                </Link>

                {renderCountMessage({
                    count: moviesCount,
                    genre: currentGenre,
                })}

                {moviesPaginated.length > 0 && (
                    <MoviesTable
                        movies={moviesPaginated}
                        sortColumn={sortColumn}
                        onDelete={handleDelete}
                        onLike={handleLike}
                        onSort={handleSort}
                    />
                )}

                <Pagination
                    itemsCount={moviesCount}
                    pageSize={PAGE_SIZE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )

    // Function
    // ............................................

    function getPagedMovies() {
        const moviesFiltered = currentGenre._id
            ? _.filter(movies, (movie) => movie.genre._id === currentGenre._id)
            : movies

        const moviesSorted = _.orderBy(
            moviesFiltered,
            sortColumn.path,
            sortColumn.direction
        )

        const moviesPaginated = paginate({
            items: moviesSorted,
            currentPage,
            pageSize: PAGE_SIZE,
        })

        return {
            moviesCount: moviesFiltered.length,
            moviesPaginated,
        }
    }

    /**
     * Count message
     */
    function renderCountMessage({ count, genre }) {
        if (!count) {
            return (
                <p>
                    There no movies
                    {genre._id ? ` of genre "${genre.name}"` : " "}
                    in database
                </p>
            )
        }

        return (
            <p>
                Showing {count} movies{" "}
                {genre._id ? ` of genre "${genre.name}"` : ""}
            </p>
        )
    }

    /**
     * Sorting
     */
    function handleSort(column) {
        setSortColumn(column)
        setCurrentPage(1)
    }

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
}
