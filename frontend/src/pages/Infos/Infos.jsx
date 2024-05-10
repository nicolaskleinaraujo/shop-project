// CSS
import styles from "./Infos.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

// Context
import { UserContext } from "../../context/UserContext"

const Infos = () => {
    const { userId } = useContext(UserContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [step, setStep] = useState(0)

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [number, setNumber] = useState()
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [houseNum, setHouseNum] = useState()

    const getInfos = async() => {
        const res = await dbFetch.get(`/user/${userId}`)

        setFullName(res.data.fullName)
        setEmail(res.data.email)

        setNumber(res.data.number)
        setCity(res.data.city)
        setStreet(res.data.street)
        setHouseNum(res.data.houseNum)

        setLoading(false)
    }

    const updateInfos = async(e) => {
        e.preventDefault()

        if (password === "") {
            toast.error("Coloque uma senha")
            return
        }

        setLoading(true)

        try {
            const res = await dbFetch.post("/user/update", {
                id: userId,
                fullName,
                email,
                password,
                number: parseInt(number),
                city,
                street,
                houseNum: parseInt(houseNum),
            })

            toast.success(res.data.msg)
            navigate("/")
        } catch (err) {
            setLoading(false)
            toast.error(err.response.data.msg)
        }
    }

    useEffect(() => {
        getInfos()
    }, [])

    return (
        <div className={styles.infos}>
            <form onSubmit={updateInfos}>
                <h1>Atualizar Dados</h1>

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
                                required 
                            />

                            <button onClick={() => setStep(1)} className={styles.infos_btn}>Continuar</button>
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

                            <input type="submit" value="Atualizar" className={styles.infos_btn} />
                            <button onClick={() => setStep(0)} className={styles.infos_btn}>Voltar</button>
                        </>
                    ))
                }
            </form>
        </div>
    )
}

export default Infos