// Imports
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 3000

const users = require("./Routes/users")
const requests = require("./Routes/requests")
const items = require("./Routes/items")

// Configs
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))
app.use(express.json())
app.use(
  cors({
    origin: "https://nk-shop-project.netlify.app",
    credentials: true,
  })
)

// Routes
app.get("/", (req, res) => {
  res.send("Bem-vindo a minha API, consulte o projeto para mais informações!")
})
app.use("/", users)
app.use("/", requests)
app.use("/", items)

app.listen(port, () => {
  console.log("Server running!")
})
