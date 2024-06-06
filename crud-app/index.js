require('dotenv').config()

const userController = require('./controllers/autentication/users')
const loginController = require('./controllers/login')

const mongoose = require('mongoose')
const express = require('express')
const servidor = express()
servidor.use(express.json())

const PORT = process.env.PORT
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@{suas informações de conexao}/${DB_NAME}?retryWrites=true&w=majority&appName=crup-app`

servidor.use("/login", loginController)
servidor.use("/users", userController)

mongoose.connect(DB_URL)
.then( () => {
    console.log("Banco de dados conectado com sucesso")
    servidor.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })
})
.catch( (error) => {
    console.log(`Erro ao conectar no bando de dados. ${error}`)
}) 
