import React from "react"

export function TableHeader({ columns, sortColumn, onSort }) {
    return (
        <thead>
            <tr>{columns.map(renderColumn)}</tr>
        </thead>
    )

    // Functions
    // .........................................

    function renderColumn(column) {
        const { path, key, label } = column
        const icon = renderSortIcon({ column, sortColumn })

        if (column.path) {
            return (
                <th
                    key={path}
                    onClick={() => handleSort(path)}
                    className="pointer"
                >
                    {label} {icon}
                </th>
            )
        }

        return <th key={key}></th>
    }

    function handleSort(path) {
        if (path === sortColumn.path) {
            onSort({
                ...sortColumn,
                direction: sortColumn.direction === "asc" ? "desc" : "asc",
            })
        } else {
            onSort({
                path,
                direction: "asc",
            })
        }
    }
}

// Functions
// .........................................

function renderSortIcon({ column, sortColumn }) {
    if (!column.path || column.path !== sortColumn.path) return null
    const classes = `fa fa-sort-${sortColumn.direction}`
    return <i className={classes} />
}
