// CSS
import styles from "./Register.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
    const [step, setStep] = useState(0)

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [number, setNumber] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [houseNumber, setHouseNumber] = useState("")

  return (
    <div>
        <form>
            <h1>Criar conta</h1>
            <p>Crie sua conta para fazer seus pedidos</p>

            {step === 0 ? (
                <>
                    <input 
                        type="text" 
                        placeholder="Nome completo" 
                        onChange={(e) => setFullName(e.target.value)} 
                        value={fullName}
                    />

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

                    <button onClick={() => setStep(1)}>Continuar</button>
                </>
            ): (
                <>
                    <input 
                        type="number" 
                        placeholder="N° de Telefone" 
                        onChange={(e) => setNumber(e.target.value)} 
                        value={number}
                    />

                    <input 
                        type="text" 
                        placeholder="Cidade" 
                        onChange={(e) => setCity(e.target.value)} 
                        value={city}
                    />

                    <input 
                        type="text" 
                        placeholder="Rua" 
                        onChange={(e) => setStreet(e.target.value)} 
                        value={street}
                    />

                    <input 
                        type="number" 
                        placeholder="N° da Casa" 
                        onChange={(e) => setHouseNumber(e.target.value)} 
                        value={houseNumber}
                    />

                    <button onClick={() => setStep(0)}>Voltar</button>
                    <input type="submit" value="Criar" />
                </>
            )}

            <p>Já possui conta? <Link to="/login">Logar</Link></p>
      </form>
    </div>
  )
}

export default Register