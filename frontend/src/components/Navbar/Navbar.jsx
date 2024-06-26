// CSS
import styles from "./Navbar.module.css"

// Modules
import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa"

// Context
import { UserContext } from "../../context/UserContext"
import { SearchContext } from "../../context/SearchContext"

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    const { userId } = useContext(UserContext)
    const { search, setSearch } = useContext(SearchContext)
    const [searchBar, setSearchBar] = useState(false)

    return (
        <nav className={styles.navbar}>
            {searchBar ? (
                <div className={styles.search_bar}>
                    <div
                        className={styles.search} 
                        onClick={() => setSearchBar(false)} 
                    ><FaSearch /></div>

                    <input 
                        type="search" 
                        placeholder="Pesquise por produtos..." 
                        autoFocus={true} 
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search} 
                    />
                </div>
            ) : (
                <>
                    {location.pathname == "/" ? (

                        <div
                            className={styles.search} 
                            onClick={() => setSearchBar(!searchBar)} 
                        ><FaSearch /></div>

                    ) : (

                        <div
                            className={styles.search} 
                            onClick={() => { navigate("/"), setSearchBar(true) }} 
                        ><FaSearch /></div>

                    )}

                    <div><Link to="/"><img src="/project-logo.png" alt="Logo do Site" /></Link></div>
                    
                    <div className={styles.menu}>
                        <Link to="/my-cart"><FaShoppingCart /></Link>

                        {userId != 0 ? (
                            <Link to="/user"><FaUser /></Link>
                        ) : (
                            <Link to="/login"><FaUser /></Link>
                        )}
                    </div>             
                </>
            )}
        </nav>
    )
}

export default Navbar