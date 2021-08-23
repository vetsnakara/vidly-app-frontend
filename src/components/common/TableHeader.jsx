import React from "react"

export function TableHeader({ columns, sortColumn, onSort }) {
    return (
        <thead>
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.path || col.key}
                        onClick={() => handleSort(col.path)}
                        className="pointer"
                    >
                        {col.label}
                    </th>
                ))}
            </tr>
        </thead>
    )

    // Functions
    // .........................................

    function handleSort(path) {
        if (path === sortColumn.path) {
            onSort({
                ...sortColumn,
                direction: sortColumn.direction === "asc" ? "desc" : "asc",
            })
        } else {
            onSort({
                ...sortColumn,
                path,
            })
        }
    }
}
