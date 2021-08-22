import React from "react"
import _ from "lodash"

export function Pagination({
    itemsCount,
    pageSize,
    currentPage,
    onPageChange,
}) {
    const pagesCount = Math.ceil(itemsCount / pageSize)
    const pages = _.range(1, pagesCount + 1)

    if (pages.length < 2) return null

    return (
        <nav>
            <ul className="pagination">{pages.map(renderItem)}</ul>
        </nav>
    )

    // Functions
    // ...............................................

    function renderItem(page) {
        const isActive = page === currentPage
        const classes = `page-item ${isActive ? "active" : ""}`

        return (
            <li key={page} className={classes}>
                {isActive ? (
                    <span className="page-link active">{page}</span>
                ) : (
                    <span
                        className="page-link pointer"
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </span>
                )}
            </li>
        )
    }
}
