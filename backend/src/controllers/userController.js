const prisma = require("../db/client")

const UserController = {
  create: async (req, res) => {
    const fullName = req.body.fullName
    const email = req.body.email
    const number = req.body.number
    const city = req.body.city
    const street = req.body.street
    const houseNum = req.body.houseNum

    if (
      fullName === "" ||
      email === "" ||
      city === "" ||
      street === "" ||
      houseNum === ""
    ) {
      res.status(400).json({ msg: "Informações insuficientes" })
      return
    }

    const searchEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    const searchNumber = await prisma.user.findUnique({
        where: {
            number: number
        }
    })

    if (searchEmail != null && searchNumber != null) {
        res.status(400).json({ msg: "Email ou numero já cadastrado" })
        return
    }

    try {
        await prisma.user.create({
            data: {
                fullName,
                email,
                number,
                city,
                street,
                houseNum
            }
        })
        res.status(200).json({ msg: "Usuario criado com sucesso" })
    } catch (err) {
      res.status(400).json(err)
    }
  },
}
