const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Bem-vindo a minha API, consulte o projeto para mais informações!")
})

app.listen(port, () => {
  console.log("Server running!")
})
