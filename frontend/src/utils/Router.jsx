// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "../components/Navbar/Navbar"

// Pages
import Home from "../pages/Home/Home"
import Cart from "../pages/Cart/Cart"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import CreateRequest from "../pages/CreateRequest/CreateRequest"

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
                <Route path="/create-request" element={<CreateRequest />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Router