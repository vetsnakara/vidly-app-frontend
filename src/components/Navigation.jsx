import React from "react"
import { NavLink } from "react-router-dom"

export function Navigation({ className = "" }) {
    let classes = "navbar navbar-expand-md navbar-light bg-light"
    classes += ` ${className}`

    return (
        <nav className={classes}>
            <NavLink className="navbar-brand" to="/">
                Vidly
            </NavLink>

            <div
                className="collapse navbar-collapse"
                id="navbarsExampleDefault"
            >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/movies">
                            Movies
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">
                            Customers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/rentals">
                            Rentals
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">
                            Register
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
