import axios from "axios"

axios.defaults.withCredentials = true
const dbFetch = axios.create({
    baseURL: "https://shop-project-hwt4.onrender.com",
})

export default dbFetch
