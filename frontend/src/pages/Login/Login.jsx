// CSS
import styles from "./Login.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await dbFetch.post("/user/login", {
        email,
        password,
      })

      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>

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
      </form>
    </div>
  )
}

export default Login
