// CSS
import styles from "./Login.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        
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