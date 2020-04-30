exports.cativoTarifa = function(tarifas,distribuidora,grupoTarifa,icms,pis,cofin,custoGeracaoDisel,demanda,demandaUlt,consumoPonta,consumoPontaFora,usaGerador,consumoGerador){
    for(var obj in tarifas){
        for(var atr in tarifas[obj]){
            if(tarifas[obj][atr].nome == distribuidora){
                if(grupoTarifa == "a3"){


                }else{
                    var vetorTarifa = tarifas[obj][atr].grupoTarifa.a4                          //nao enviar
                    var impostos = (1 - (icms/100)-(pis/100)-(cofin/100))                       //nao enviar

                    
                    var tarifaDemanda = (vetorTarifa[2] /impostos)

                    var tarifaUltDem = tarifaDemanda*2;

                    var tarifaConsumoPonta = ((vetorTarifa[0] + vetorTarifa[3])/impostos)/1000


                    var tarifaConsumoForaPonta = ((vetorTarifa[1] + vetorTarifa[4])/impostos)/1000


                    var totalDemanda = demanda*tarifaDemanda;
                    var totalUltDem = demandaUlt * tarifaUltDem;
                    var totalConsumoPonta = consumoPonta * tarifaConsumoPonta
                    var totalConsumoForaPonta = consumoPontaFora * tarifaConsumoForaPonta
                    var totalGerador = consumoGerador * custoGeracaoDisel

                    if(usaGerador == "nao"){
                        consumoGerador = 0
                        totalGerador = 0
                    }
                    
                    exports.vetorTarifa = vetorTarifa

                    var total = totalDemanda+totalUltDem+totalConsumoPonta+totalConsumoForaPonta+totalGerador
                    tarifaDemanda = tarifaDemanda.toFixed(2)
                    tarifaUltDem = tarifaUltDem.toFixed(2)
                    tarifaConsumoPonta = tarifaConsumoPonta.toFixed(2)
                    tarifaConsumoForaPonta = tarifaConsumoForaPonta.toFixed(2)
                    totalDemanda = totalDemanda.toFixed(2)
                    totalUltDem = totalUltDem.toFixed(2)
                    totalConsumoPonta = totalConsumoPonta.toFixed(2)
                    totalConsumoForaPonta = totalConsumoForaPonta.toFixed(2)
                    totalGerador = totalGerador.toFixed(2)
                    total = total.toFixed(2)
                    var data = {tarifaDemanda,tarifaUltDem,tarifaConsumoPonta,tarifaConsumoForaPonta,totalDemanda,totalUltDem,totalConsumoPonta,totalConsumoForaPonta,totalGerador,total}
                    return data
                }
            }
        }
    }
}

/*
a4[0] = tusd consumo de ponta
a4[1] = tusd consumo de fora ponta
a4[2] = tusd demanda 
a4[3] = tarifa de ponta
a5[4] = tarifa de fora ponta
*/
