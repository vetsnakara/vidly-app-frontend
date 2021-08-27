import _ from "lodash"
import jwtDecode from "jwt-decode"

export function paginate({ items, currentPage, pageSize }) {
    const startIndex = (currentPage - 1) * pageSize
    return _(items).slice(startIndex).take(pageSize).value()
}

export function getUserFromToken(token) {
    try {
        return jwtDecode(token)
    } catch (error) {
        return null
    }
}
