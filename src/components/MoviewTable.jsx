import React from "react"

import { Like } from "./common/Like"

export function MoviesTable({ items, onDelete, onLike }) {
    return (
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
                {items.map((m) => (
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
}
