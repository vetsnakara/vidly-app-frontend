import React from "react"

import { Like } from "./common/Like"

export function MoviesTable({ movies, sortColumn, onDelete, onLike, onSort }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => handleSort("title")}>Title</th>
                    <th onClick={() => handleSort("genre.name")}>Genre</th>
                    <th onClick={() => handleSort("numberInStock")}>Stock</th>
                    <th onClick={() => handleSort("dailyRentalRate")}>Rate</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {movies.map((m) => (
                    <tr key={m._id}>
                        <td>{m.title}</td>
                        <td>{m.genre.name}</td>
                        <td>{m.numberInStock}</td>
                        <td>{m.dailyRentalRate}</td>
                        <td>
                            <Like active={m.like} onClick={() => onLike(m)} />
                        </td>
                        <td>
                            <button
                                onClick={() => onDelete(m)}
                                className="btn btn-sm btn-danger"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

    // Functions
    // .........................................

    function handleSort(path) {
        onSort({
            path,
            direction: sortColumn.direction === "asc" ? "desc" : "asc",
        })
    }
}
