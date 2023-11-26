import React from "react"
import { BrowserRouter } from "react-router-dom"
import { hydrateRoot } from "react-dom/client"

import "bootstrap/dist/css/bootstrap.css"
import "./css/styles.css"

import App from "./App"
import { render } from "react-dom"

if (process.env.NODE_ENV === "production") {
    hydrateRoot(
        document.getElementById("root"),
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
} else {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById("root")
    )
}