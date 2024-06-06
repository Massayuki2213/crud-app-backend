
const bcryptjs = require('bcryptjs')
const auth = require("../../middlewares/authentication")
const UserModel = require("../../models/user")

const express = require('express')
const userController = express.Router()

userController.get("/", auth, async (req, res) => {
    try {
        let users = await UserModel.find()
        return res.status(200).json(users)
    } catch (err) {
        console.log(`Um erro ocorreu ao buscar usuários. ${err}`)
        return res.status(500).json({error: err})
    } 
})

userController.get("/:email", auth, async (req, res) => {
    var email = req.params.email

    try {
        let user = await UserModel.findOne({email: email})
        if(!user) {
            return res.status(404).json({mensagem: "Usuário não encontrado"})            
        }

        return res.status(200).json(user)
    } catch (err) {
        console.log(`Um erro ocorreu ao buscar usuários. ${err}`)
        return res.status(500).json({error: err})
    } 
})

userController.post("/", async (req, res) => {
    const {nome, email, senha } = req.body
    const senhaEncrypt = await bcryptjs.hash(senha, 10)
    var user = {
        nome: nome,
        email: email,
        senha: senhaEncrypt
    }

    try {
        await UserModel.create(user)
        return res.status(201).json({
            mensagem: "Usuário criado com sucesso!"
        })
    } catch(error) {
        return res.status(500).json({
            error: error
        })
    }
})

module.exports = userController

