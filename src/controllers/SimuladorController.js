const ThsVerde = require("../Simulador/ThsVerde");
var mongoose = require("mongoose");
require("../models/Tarifa");
var Tarifa = mongoose.model("Tarifa");

exports.Simulation = async (request, response) => {
  const input = request.body;
  
  var tipo = "CONV"
  if(input.calc==="APE"){
    tipo = "APE"
  }

  var {TCP_TUSD,TCFP_TUSD,TCP_E,TCFP_E,TDMP,TDMFP,ICMS,COFINS,PIS} = await Tarifa.findOne({
    THS: `${input.ths}`,
    GRUPO: `${input.grupoTarifa}`,
    DISTRIBUIDORA: `${input.distribuidora}`,
    TIPO_CONV_APE: `${tipo}`,
  });

  if(input.ths ==="VERDE"){
    const {ResultCativo,ResultLivre} = ThsVerde.TableVerde(input,TCP_TUSD,TCFP_TUSD,TCP_E,TCFP_E,TDMP,TDMFP,ICMS,COFINS,PIS);
    const data = { input, ResultCativo,ResultLivre };
    return response.json(data);
  }else{
    
  }


};
