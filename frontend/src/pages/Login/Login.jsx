// CSS
import styles from "./Login.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"

// Context
import { UserContext } from "../../context/UserContext"
import { AdminContext } from "../../context/AdminContext"

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { setUserId } = useContext(UserContext)
  const { setAdmin } = useContext(AdminContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await dbFetch.post("/user/login", {
        email,
        password,
      })

      setUserId(res.data.id)
      setAdmin(res.data.isAdmin)
      navigate("/")
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <p>Faça seu login para fazer seus pedidos</p>

        {loading ? (
          <img src="/loading.svg" alt="Carregando" />
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <input type="submit" value="Logar" className={styles.login_submit} />

            <p>Não possui conta? <Link to="/register">Criar</Link></p>
          </>
        )}
        

        
      </form>
    </div>
  )
}

export default Login
