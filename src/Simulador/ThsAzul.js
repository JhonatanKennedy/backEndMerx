var tabela = require('./tabelaEnergia')

exports.TableAzul = function(input,TCP_TUSD,TCFP_TUSD,TCP_E,TCFP_E,TDMP,TDMFP,ICMS,COFINS,PIS) {
//demanda = demanda ponta
//demanda fora ponta = demandaP
    var {cliente,cnpj,distribuidora,ths,grupoTarifa,demanda,demandaFpu,consumoP,consumoPf,demandaP,demandaPu,usaGerador,consumoGerador,geradorACL,
        custoGeracaoDisel,calc,desconto,icms,pis,cofin} = input 
    
    var formatter = new Intl.NumberFormat('pt-BR',{     //transforma em real
        style:'currency',
        currency:'BRL',
        minimumFractionDigits:2,
    })

    var impostos = 1 - ICMS - COFINS - PIS
    var qtdGerador = (consumoPf*0.10 - consumoP)

    var cativoTarifaDemandaPonta = TDMP/impostos
    var cativoTarifaUltrapassagemPonta = cativoTarifaDemandaPonta*2
    var cativoTarifaDemandaForaPonta = TDMFP/impostos
    var cativoTarifaUltrapassagemForaPonta = cativoTarifaDemandaForaPonta*2
    var cativoTarifaConsumoPonta = (TCP_TUSD+TCP_E)/impostos/1000
    var cativoTarifaConsumoForaPonta = (TCFP_TUSD+TCFP_E)/impostos/1000
    var totalCativoConsumoGerador

    if(consumoGerador == "N/A"){
        totalCativoConsumoGerador = qtdGerador * custoGeracaoDisel
    }else{
        totalCativoConsumoGerador = consumoGerador*1 * custoGeracaoDisel
    }

    var totalCativoDemandaPonta = demanda * cativoTarifaDemandaPonta
    var totalCativoUltrapassagemPonta = demandaPu * cativoTarifaUltrapassagemPonta
    var totalCativoDemandaPontaFora = demandaP * cativoTarifaDemandaForaPonta
    var totalCativoUltrapassagemForaPonta = demandaFpu * cativoTarifaUltrapassagemForaPonta
    var totalCativoConsumoPonta = consumoP * cativoTarifaConsumoPonta
    var totalCativoConsumoForaPonta = consumoPf * cativoTarifaConsumoForaPonta

    var resultadoCativo = (totalCativoDemandaPonta+totalCativoUltrapassagemPonta+
        totalCativoDemandaPontaFora+totalCativoUltrapassagemForaPonta+
        totalCativoConsumoPonta+totalCativoConsumoForaPonta+totalCativoConsumoGerador)
    
    var totalCativo = resultadoCativo
        cativoTarifaDemandaPonta = formatter.format(cativoTarifaDemandaPonta)
        cativoTarifaUltrapassagemPonta = formatter.format(cativoTarifaUltrapassagemPonta)
        cativoTarifaDemandaForaPonta = formatter.format(cativoTarifaDemandaForaPonta)
        cativoTarifaUltrapassagemForaPonta = formatter.format(cativoTarifaUltrapassagemForaPonta)
        cativoTarifaConsumoPonta = formatter.format(cativoTarifaConsumoPonta)
        cativoTarifaConsumoForaPonta = formatter.format(cativoTarifaConsumoForaPonta)
        
        totalCativoConsumoGerador = formatter.format(totalCativoConsumoGerador)
        totalCativoDemandaPonta = formatter.format(totalCativoDemandaPonta)
        totalCativoUltrapassagemPonta = formatter.format(totalCativoUltrapassagemPonta)
        totalCativoDemandaPontaFora = formatter.format(totalCativoDemandaPontaFora)
        totalCativoUltrapassagemForaPonta = formatter.format(totalCativoUltrapassagemForaPonta)
        totalCativoConsumoPonta = formatter.format(totalCativoConsumoPonta)
        totalCativoConsumoForaPonta = formatter.format(totalCativoConsumoForaPonta) 
        totalCativo = formatter.format(totalCativo) 
        qtdGerador = formatter.format(qtdGerador)

    var ResultCativo = {cativoTarifaDemandaPonta,totalCativoUltrapassagemPonta,cativoTarifaUltrapassagemPonta,cativoTarifaDemandaForaPonta,
                           cativoTarifaUltrapassagemForaPonta,cativoTarifaConsumoPonta,cativoTarifaConsumoForaPonta,qtdGerador,
                           totalCativoDemandaPonta,totalCativoUltrapassagemForaPonta,totalCativoDemandaPontaFora,
                           totalCativoConsumoPonta,totalCativoConsumoForaPonta,totalCativoConsumoGerador,totalCativo
                        }
        //livre
    var livreDemanda
    if(demanda < 500){
        livreDemanda = 500
    }else{
        livreDemanda = demanda
    }
    var livreDemandaForaPonta = demandaP
    var livreConsumoPonta
    var livreGerador
    if(geradorACL == "NAO"){
        livreConsumoPonta = (consumoPf*0.1 - consumoP)+consumoP
        livreGerador = 0
    }else{
        livreConsumoPonta = consumoP
        livreGerador = consumoPf*0.1 - consumoP
    } 
    var livreConsumoForaPonta = consumoPf

    var livreTarifaDemanda = (1-desconto)*TDMP/impostos
    var livreTarifaDemandaForaPonta = (1-desconto)*TDMP/impostos
    var livreTarifaConsumoPonta = TCP_TUSD/impostos/1000
    var livreTarifaConsumoForaPonta = TCFP_TUSD/impostos/1000
    var livreTarifaGerador = custoGeracaoDisel

    var energiaACL = livreConsumoPonta*1 + livreConsumoForaPonta*1 + livreGerador*1
    var energiaACLTarifa

    for( let atr in tabela){
        for(let obj in tabela[atr]){
          if(tabela[atr][obj] == desconto*1){
            energiaACLTarifa = tabela[atr].preco
            var livreIcms = (energiaACLTarifa/(1-ICMS))-energiaACLTarifa
          }
        }
      }

    var totalLivreDemanda = livreDemanda * livreTarifaDemanda
    var totalLivreDemandaForaPonta = livreDemandaForaPonta * livreTarifaDemandaForaPonta
    var totalLivreConsumoPonta = livreConsumoPonta * livreTarifaConsumoPonta
    var totalLivreConsumoForaPonta = livreConsumoForaPonta * livreTarifaConsumoForaPonta
    var totalLivreGerador = livreGerador * custoGeracaoDisel
    var totalEnergiaACL = (energiaACLTarifa * energiaACL)/1000
    var totalICMS = (livreIcms * energiaACL)/1000
    var totalLivre = totalLivreDemanda + totalLivreDemandaForaPonta + totalLivreConsumoPonta + totalLivreConsumoForaPonta +totalLivreGerador +totalEnergiaACL + totalICMS
    var economia = resultadoCativo - totalLivre
    var economiaPorcetagem = (resultadoCativo-totalLivre)/resultadoCativo*100


    livreDemanda = formatter.format(livreDemanda)
    livreDemandaForaPonta = formatter.format(livreDemandaForaPonta)
    livreConsumoPonta = formatter.format(livreConsumoPonta)
    livreGerador = formatter.format(livreGerador)
    livreConsumoForaPonta = formatter.format(livreConsumoForaPonta)
    livreTarifaDemanda = formatter.format(livreTarifaDemanda)
    livreTarifaDemandaForaPonta = formatter.format(livreTarifaDemandaForaPonta)
    livreTarifaConsumoPonta = formatter.format(livreTarifaConsumoPonta)
    livreTarifaConsumoForaPonta = formatter.format(livreTarifaConsumoForaPonta)
    livreTarifaGerador = formatter.format(livreTarifaGerador)

    energiaACL = formatter.format(energiaACL)
    energiaACLTarifa = formatter.format(energiaACLTarifa)

    totalLivreDemanda = formatter.format(totalLivreDemanda)
    totalLivreDemandaForaPonta = formatter.format(totalLivreDemandaForaPonta)
    totalLivreConsumoPonta = formatter.format(totalLivreConsumoPonta)
    totalLivreConsumoForaPonta = formatter.format(totalLivreConsumoForaPonta)
    totalLivreGerador = formatter.format(totalLivreGerador)
    totalEnergiaACL = formatter.format(totalEnergiaACL)
    totalICMS = formatter.format(totalICMS)
    totalLivre = formatter.format(totalLivre)
    economia = formatter.format(economia)
    economiaPorcetagem = economiaPorcetagem.toFixed(1)+"%"


    var ResultLivre = {livreDemanda,livreDemandaForaPonta,livreConsumoPonta,livreGerador,livreConsumoForaPonta,
                          livreTarifaDemanda,livreTarifaDemandaForaPonta,livreTarifaConsumoPonta,livreTarifaConsumoForaPonta,
                          livreTarifaGerador,totalLivreDemanda,totalLivreDemandaForaPonta,totalLivreConsumoPonta,totalLivreConsumoForaPonta,
                          totalLivreGerador,energiaACL,energiaACLTarifa,totalEnergiaACL,totalICMS,totalLivre,economia,economiaPorcetagem,livreIcms
    }

    return {ResultCativo,ResultLivre}
}