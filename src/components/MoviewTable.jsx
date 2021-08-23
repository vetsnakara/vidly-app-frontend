import React from "react"

import { Like } from "./common/Like"
import { TableHeader } from "./common/TableHeader"
import { TableBody } from "./common/TableBody"

export function MoviesTable({ movies, sortColumn, onDelete, onLike, onSort }) {
    const columns = [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            value: (movie) => (
                <Like active={movie.like} onClick={() => onLike(movie)} />
            ),
        },
        {
            key: "deleteBtn",
            value: (movie) => (
                <button
                    onClick={() => onDelete(movie)}
                    className="btn btn-sm btn-danger"
                >
                    Delete
                </button>
            ),
        },
    ]

    return (
        <table className="table">
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
            <TableBody columns={columns} items={movies} />
        </table>
    )
}
