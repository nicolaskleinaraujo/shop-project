// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Home from "../pages/Home/Home"

const Router = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Router