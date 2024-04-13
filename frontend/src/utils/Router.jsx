// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "../components/Navbar/Navbar"

// Pages
import Home from "../pages/Home/Home"

const Router = () => {
  return (
    <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Router