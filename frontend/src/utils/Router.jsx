// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

// Pages
import Home from "../pages/Home/Home"
import Cart from "../pages/Cart/Cart"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import RequestByUser from "../pages/RequestByUser/RequestByUser"
import RequestBySlug from "../pages/RequestBySlug/RequestBySlug"

const Router = () => {
  return (
    <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/requests" element={<RequestByUser />} />
                <Route path="/request/:slug" element={<RequestBySlug />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </>
  )
}

export default Router