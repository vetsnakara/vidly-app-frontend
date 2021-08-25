import _ from "lodash"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { toast } from "react-toastify"

import { Pagination } from "./common/Pagination"
import { ListGroup } from "./common/ListGroup"

import { getMovies, deleteMovie } from "../services/movieService"
import { getGenres } from "../services/genreService"

import { MoviesTable } from "./MoviewTable"
import { Search } from "./common/Search"

import { PAGE_SIZE } from "../constants"
import { paginate } from "../utils"

const defaultGenre = {
    _id: null,
    name: "All genres",
}

export function Movies({ onRemove }) {
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])

    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [currentGenre, setCurrentGenre] = useState(defaultGenre)
    const [sortColumn, setSortColumn] = useState({
        path: "title",
        direction: "asc",
    })
    const [movieToDelete, setMovieToDelete] = useState(null)

    useEffect(() => {
        ;(async function getInitialData() {
            try {
                const [movies, genres] = await Promise.all([
                    getMovies(),
                    getGenres(),
                ])

                setMovies(movies)
                setGenres([defaultGenre, ...genres])
            } catch (error) {
                // todo: expected or not?
                console.log(error)
            }
        })()
    }, [])

    useEffect(() => {
        if (movieToDelete) {
            const { id } = movieToDelete

            ;(async function removeMovie() {
                try {
                    await deleteMovie(id)

                    setMovies((movies) => movies.filter((m) => m._id !== id))
                } catch (error) {
                    // handle only expected errors here
                    if (error.response && error.response.status === 404) {
                        toast.error("This movie has already been deleted")
                        console.log(error)
                    }
                }
            })()
        }
    }, [movieToDelete])

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
                <Link to="/movies/new" className="btn btn-primary mb-3">
                    New Movie
                </Link>

                {renderCountMessage({
                    count: moviesCount,
                    genre: currentGenre,
                })}

                <Search
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search ..."
                />

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

    // Functions
    // ............................................

    function getPagedMovies() {
        let moviesFiltered = movies

        if (currentGenre._id) {
            moviesFiltered = _.filter(
                movies,
                (movie) => movie.genre._id === currentGenre._id
            )
        }

        if (searchTerm) {
            moviesFiltered = _.filter(moviesFiltered, (movie) =>
                movie.title.toLowerCase().includes(searchTerm)
            )
        }

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
     * Search
     */
    function handleSearch(term) {
        setSearchTerm(term)
        setCurrentGenre(defaultGenre)
        setCurrentPage(1)
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
        setSearchTerm("")
    }

    /**
     * Remove movie
     */
    function handleDelete({ _id: id }) {
        setMovieToDelete({ id })
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
