import React from "react"
import { useParams, useHistory } from "react-router-dom"

export function MovieForm() {
    const { id } = useParams()
    const history = useHistory()
    return (
        <>
            <h1>Movie: {id}</h1>
            <button
                className="btn btn-primary"
                onClick={() => history.push("/movies")}
            >
                Save
            </button>
        </>
    )
}
