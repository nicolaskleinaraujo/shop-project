// CSS
import styles from "./Login.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"

// Context
import { UserContext } from "../../context/UserContext"

const Login = () => {
  const navigate = useNavigate()
  const { setUserId } = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await dbFetch.post("/user/login", {
        email,
        password,
      })

      setUserId(res.data.id)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <p>Faça seu login para fazer seus pedidos</p>

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

        <input type="submit" value="Logar" />

        <p>Não possui conta? <Link to="/register">Criar</Link></p>
      </form>
    </div>
  )
}

export default Login
