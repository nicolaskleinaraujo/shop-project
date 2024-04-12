// Modules
import { BrowserRouter, Router, Route } from "react-router-dom"

// Pages
import Home from "../pages/Home/Home"

const Router = () => {
  return (
    <>
        <BrowserRouter>
            <Router>
                <Route path="/" element={<Home />} />
            </Router>
        </BrowserRouter>
    </>
  )
}

export default Router