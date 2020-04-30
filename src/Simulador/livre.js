const tarifas = require('./tarifas')

const {demanda,demandaUlt,consumoPonta,consumoPontaFora,usaGerador,consumoGerador,custoGeracaoDisel,distribuidora,grupoTarifa,icms,pis,cofin,fonte} = 0

exports.livreTarifa = function(demanda,consumoPonta,consumoPontaFora,consumoGerador,totalGerador,vetorTarifa,icms,pis,cofin,fonte){
    now = new Date()    
    if(demanda<500){
        demanda = 500
    }
    const energiaACL = parseFloat(consumoPonta) + parseFloat(consumoPontaFora) + parseFloat(consumoGerador)
    for(obj in tarifas.energia){
        console.log(tarifas.energia[obj].tipo)
    }

}