// Imports
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3000

// Configs
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

// Routes
app.get("/", (req, res) => {
  res.send("Bem-vindo a minha API, consulte o projeto para mais informações!")
})

const users = require("./Routes/users")
app.use("/", users)

app.listen(port, () => {
  console.log("Server running!")
})
