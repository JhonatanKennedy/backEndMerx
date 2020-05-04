const express = require("express")
const Tarifas = require('./controllers/TarifasController')
const simulador = require('./controllers/SimuladorController')
const routes = express.Router()


routes.post('/simulacao', simulador.Simulation)


//adm
routes.post('/elivelton',Tarifas.CadTarifas)

module.exports = routes