// Imports
const prisma = require("../db/client")
const bcrypt = require("bcryptjs")

const userController = {
  create: async (req, res) => {
    const fullName = req.body.fullName
    const email = req.body.email
    const number = req.body.number
    const password = req.body.password
    const city = req.body.city
    const street = req.body.street
    const houseNum = req.body.houseNum

    // Checks if some info is missing
    if (
      fullName === "" ||
      email === "" ||
      number === "" ||
      password === "" ||
      city === "" ||
      street === "" ||
      houseNum === ""
    ) {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    // Checks if the email or the number is already cadastered
    const searchEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const searchNumber = await prisma.user.findUnique({
      where: {
        number,
      },
    })

    if (searchEmail != null && searchNumber != null) {
      res.status(400).json({ msg: "Email ou numero já cadastrado" })
      return
    }

    // Hashing the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    try {
      await prisma.user.create({
        data: {
          fullName,
          email,
          number,
          password: hash,
          city,
          street,
          houseNum,
        },
      })
      res.status(200).json({ msg: "Usuario criado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getById: async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id) || null) {
      res.status(400).json({ msg: "ID não especificado" })
      return
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      res.status(400).json({ msg: "Usuario inexistente" })
      return
    }

    res.status(200).json(user)
  },

  update: async (req, res) => {
    const id = parseInt(req.body.id)
    const fullName = req.body.fullName
    const email = req.body.email
    const number = req.body.number
    const password = req.body.password
    const city = req.body.city
    const street = req.body.street
    const houseNum = req.body.houseNum

    // Checks if some info is missing
    if (
      fullName === "" ||
      email === "" ||
      number === "" ||
      password === "" ||
      city === "" ||
      street === "" ||
      houseNum === ""
    ) {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    // Checks if the email or the number is already cadastered in other user
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    const searchEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const searchNumber = await prisma.user.findUnique({
      where: {
        number,
      },
    })

    if (
      searchEmail != null &&
      searchNumber != null &&
      searchEmail.id != user.id &&
      searchNumber.id != user.id
    ) {
      res.status(400).json({ msg: "Email ou numero já cadastrado" })
      return
    }

    // Hashing the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    try {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          fullName,
          email,
          number,
          password: hash,
          city,
          street,
          houseNum,
        }
      })
      res.status(200).json({ msg: "Usuario atualizado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = userController
