// CSS
import styles from "./Register.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"

// Context
import { UserContext } from "../../context/UserContext"
import { AdminContext } from "../../context/AdminContext"

const Register = () => {
    const navigate = useNavigate()
    const { setUserId } = useContext(UserContext)
    const { setAdmin } = useContext(AdminContext)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [number, setNumber] = useState()
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [houseNum, setHouseNum] = useState()

    const handleRegister = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await dbFetch.post("/user/create", {
                fullName,
                email,
                password,
                number: parseInt(number),
                city,
                street,
                houseNum: parseInt(houseNum),
            })

            setAdmin(res.data.isAdmin)
            setUserId(res.data.id)
            navigate("/")
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

  return (
    <div className={styles.register}>
        <form onSubmit={handleRegister}>
            <h1>Criar conta</h1>
            <p>Crie sua conta para fazer seus pedidos</p>

            {loading ? (
                <img src="/loading.svg" alt="Carregando" />
            ) : (
                step === 0 ? (
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

                        <p>Já possui conta? <Link to="/login">Logar</Link></p>
                    </>
                ) : (
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
                            onChange={(e) => setHouseNum(e.target.value)} 
                            value={houseNum}
                        />

                        <button onClick={() => setStep(0)}>Voltar</button>
                        <input type="submit" value="Criar" />

                        <p>Já possui conta? <Link to="/login">Logar</Link></p>
                    </>
                ))
            }
      </form>
    </div>
  )
}

export default Register