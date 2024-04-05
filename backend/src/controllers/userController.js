// Imports
const prisma = require("../db/client")
const bcrypt = require("bcryptjs")
const { json } = require("body-parser")
const jwt = require("jsonwebtoken")

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
      number === undefined ||
      password === "" ||
      city === "" ||
      street === "" ||
      houseNum === undefined
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

    if (searchEmail != null || searchNumber != null) {
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

    if (isNaN(id)) {
      res.status(400).json({ msg: "ID não especificado" })
      return
    }

    try {
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
    } catch (err) {
      res.status(500).json(err)
    }
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
      isNaN(id) ||
      fullName === "" ||
      email === "" ||
      number === undefined ||
      password === "" ||
      city === "" ||
      street === "" ||
      houseNum === undefined
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
      (searchEmail != null || searchNumber != null) &&
      (searchEmail.id != user.id || searchNumber.id != user.id)
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
        },
      })
      res.status(200).json({ msg: "Usuario atualizado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ msg: "ID não especificado" })
      return
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        res.status(400).json({ msg: "Usuario inexistente" })
        return
      }

      await prisma.user.delete({
        where: {
          id,
        },
      })

      res.status(200).json({ msg: "Usuario deletado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  login: async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined
    ) {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        res.status(400).json({ msg: "Login incorreto" })
        return
      }

      const testPassword = bcrypt.compareSync(password, user.password)

      if (!testPassword) {
        res.status(400).json({ msg: "Login incorreto" })
        return
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "120h" }
      )

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 120 * 60 * 60 * 1000,
      })
      res.status(200).json({ msg: "Logado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = userController
