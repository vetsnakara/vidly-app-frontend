export function paginate({ items, currentPage, pageSize }) {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return items.slice(start, end)
}
