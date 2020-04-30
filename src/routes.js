const express = require("express")
const cativoFunct = require('./Simulador/cativo')
const livreFunct = require('./Simulador/livre')
const tarifas = require('./Simulador/tarifas')

const routes = express.Router()

routes.post('/simulacao', (request,response)=>{
    const {demanda,demandaUlt,consumoPonta,consumoPontaFora,usaGerador,consumoGerador,custoGeracaoDisel,distribuidora,grupoTarifa,icms,pis,cofin,fonte} = request.body
    const input = request.body
    const resultCativo = cativoFunct.cativoTarifa(tarifas,distribuidora,grupoTarifa,icms,pis,cofin,custoGeracaoDisel,demanda,demandaUlt,consumoPonta,consumoPontaFora,usaGerador,consumoGerador)
    const resultLivre = livreFunct.livreTarifa(demanda,consumoPonta,consumoPontaFora,consumoGerador,resultCativo.totalGerador,cativoFunct.vetorTarifa,icms,pis,cofin,fonte)
    const data = {input,resultCativo}
    return response.json(data)

})

module.exports = routes