// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CookieRoute from "./CookieRoute"
import AdminRoute from "./AdminRoute"

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
import User from "../pages/User/User"
import Infos from "../pages/Infos/Infos"
import Admin from "../pages/Admin/Admin"
import AllUsers from "../pages/AllUsers/AllUsers"

const Router = () => {
  return (
    <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<CookieRoute />} >
                  <Route path="/my-cart" element={<Cart />} />
                  <Route path="/requests" element={<RequestByUser />} />
                  <Route path="/request/:slug" element={<RequestBySlug />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/infos" element={<Infos />} />
                </Route>

                <Route element={<AdminRoute />} >
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/all-users" element={<AllUsers />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    </>
  )
}

export default Router