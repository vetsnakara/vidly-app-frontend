import React from "react"

export function Like({ active, ...props }) {
    let classes = "fa "

    classes += active ? "fa-heart" : "fa-heart-o"
    classes += " pointer"

    return <i className={classes} {...props}></i>
}
