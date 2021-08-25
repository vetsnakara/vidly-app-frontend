import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom"

import { ToastContainer } from "react-toastify"

import { Movies } from "./components/Movies"
import { Customers } from "./components/Customers"
import { Rentals } from "./components/Rentals"
import { NotFound } from "./components/NotFound"
import { MovieForm } from "./components/MovieForm"
import { LoginForm } from "./components/LoginForm"
import { RegisterForm } from "./components/RegisterForm"
import { Navigation } from "./components/Navigation"

function App() {
    return (
        <>
            <Router>
                <Navigation className="mb-3" />
                <main className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/movies/new" component={MovieForm} />
                        <Route path="/movies/:id" component={MovieForm} />
                        <Route path="/movies" component={Movies} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect exact from="/" to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
