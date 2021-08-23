import _ from "lodash"
import React from "react"

export function TableBody({ columns, items, idFieldName = "_id" }) {
    return (
        <tbody>
            {items.map((item) => (
                <tr key={item[idFieldName]}>
                    {columns.map((col) => renderCell(col, item))}
                </tr>
            ))}
        </tbody>
    )
}

/**
 * Render cell
 */
function renderCell(col, item) {
    const key = col.path || col.key

    const value = col.path ? _.get(item, col.path) : col.value(item)

    return <td key={key}>{value}</td>
}
