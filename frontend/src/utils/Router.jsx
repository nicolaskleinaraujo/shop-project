// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "../components/Navbar/Navbar"

// Pages
import Home from "../pages/Home/Home"
import Cart from "../pages/Cart/Cart"

const Router = () => {
  return (
    <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Router