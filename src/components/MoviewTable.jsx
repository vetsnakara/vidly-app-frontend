import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { Like } from "./common/Like"
import { Table } from "./common/Table"

import { stateContext } from "./StateProvider"

export function MoviesTable({ movies, sortColumn, onDelete, onLike, onSort }) {
    const { user } = useContext(stateContext)

    const columns = [
        {
            path: "title",
            label: "Title",
            value: (movie) => (
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            ),
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            value: (movie) => (
                <Like active={movie.like} onClick={() => onLike(movie)} />
            ),
        },
    ]

    const deleteColumn = {
        key: "deleteBtn",
        value: (movie) => (
            <button
                onClick={() => onDelete(movie)}
                className="btn btn-sm btn-danger"
            >
                Delete
            </button>
        ),
    }

    if (user && user.isAdmin) {
        columns.push(deleteColumn)
    }

    return (
        <Table
            columns={columns}
            items={movies}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    )
}
