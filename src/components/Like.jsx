import React from "react"

export function Like({ active, ...props }) {
    const classes = `fa ${active ? "fa-heart" : "fa-heart-o"}`
    const styles = { cursor: "pointer" }

    return <i className={classes} style={styles} {...props}></i>
}
