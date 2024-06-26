// Imports
const prisma = require("../db/client")
const bcrypt = require("bcryptjs")
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

    // Checks for missing info
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

    // Creating the JWT
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "120h",
    })

    try {
      const user = await prisma.user.create({
        data: {
          fullName,
          email,
          number,
          password: hash,
          city,
          street,
          houseNum,
          jwt: token,
        },
      })

      res.cookie("jwt", token, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: 'none',
        maxAge: 120 * 60 * 60 * 1000, // 120 hours = 5 days
      })
      res.status(200).json({ msg: "Usuario criado com sucesso", id: user.id, isAdmin: user.isAdmin })
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

    // Checks for missing info
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

    // Checks if the email or the number is already cadastered
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      res.status(400).json({ msg: "Usuario inexistente" })
      return
    }

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

    if (searchEmail != null && searchEmail.id != user.id) {
      res.status(400).json({ msg: "Email já cadastrado" })
      return
    }

    if (searchNumber != null && searchNumber.id != user.id) {
      res.status(400).json({ msg: "Numero já cadastrado" })
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
      // Search and delete user based on his id
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        res.status(400).json({ msg: "Usuario inexistente" })
        return
      }

      await prisma.request.deleteMany({
        where: {
          authorId: id,
        },
      })

      await prisma.user.delete({
        where: {
          id,
        },
      })

      // Clear the jwt cookie
      res.clearCookie("jwt")
      res.status(200).json({ msg: "Usuario deletado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  login: async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // Checks for missing info
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

      // Testing the password with the hashed password
      const testPassword = bcrypt.compareSync(password, user.password)

      if (!testPassword) {
        res.status(400).json({ msg: "Login incorreto" })
        return
      }

      // Creating a new jwt token
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "120h",
      })

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          jwt: token,
        },
      })
      
      res.cookie("jwt", token, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: 'none',
        maxAge: 120 * 60 * 60 * 1000, // 120 hours = 5 days
      })
      res.status(200).json({ msg: "Logado com sucesso", id: user.id, isAdmin: user.isAdmin })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  leave: async (req, res) => {
    try {
      res.clearCookie("jwt")
      res.status(200).json({ msg: "Sessão Finalizada" })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  tryAuth: async (req, res) => {
    const jwtCookie = req.signedCookies.jwt

    if (!jwtCookie) {
      res.status(400).json({ msg: "Não possui cookie jwt" })
      return
    }

    try {
      // Check if the jwt have expired
      jwt.verify(jwtCookie, process.env.JWT_SECRET, (err) => {
        if (err) {
          res.status(400).json({ msg: "Cookie não autenticado" })
          return
        }
      })

      // Checks if user exist
      const user = await prisma.user.findUnique({
        where: { jwt: jwtCookie }
      })

      if (!user) {
        res.status(400).json({ msg: "Usuario inexistente" })
        return
      }

      res.status(200).json({ msg: "Logado com sucesso", id: user.id, isAdmin: user.isAdmin })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: { 
          id: true,
          fullName: true,
          isAdmin: true,
        },
      })
      
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  changeAdmin: async (req, res) => {
    const id = parseInt(req.body.id)
    const isAdmin = req.body.isAdmin

    if (isNaN(id) || isAdmin === null || isAdmin === "") {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    try {
      await prisma.user.update({
        where: { id },
        data: { isAdmin }
      })
      res.status(200).json({ msg: "Admin mudado com sucesso" })
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = userController
