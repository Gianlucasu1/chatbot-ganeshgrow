import BotWhatsapp from "@bot-whatsapp/bot";
import datos from "../data/marihuana-cbd.json";
import comprarMarihuanaCbdFlow from "./categorias-cbd/comprar-marihuana-cbd.flow";
import comprarFeminizadaFlow from "./categorias-semillas/comprar-feminizada.flow";
import comprarAutoflorecientesFlow from "./categorias-semillas/comprar-autoflorecientes.flow";
import comprarCertificadasFlow from "./categorias-semillas/comprar-certificadas.flow";
import comprarGranelFlow from "./categorias-semillas/comprar-granel.flow";
import comprarMedicinalFlow from "./categorias-semillas/comprar-medicinal.flow";
import welcomeFlow from "./welcome.flow";


/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
  .addAnswer(
    "¿Qué tipo de semilla  estás buscando? \n 1. Feminizada \n 2. Regulares \n 3. Autoflorecientes \n 4. Certificadas \n 5. A granel \n 6. Semillas CBD \n 0. Volver atrás "
  )
  .addAction({capture:true},async (ctx, { state, gotoFlow, flowDynamic }) => {
    const message = "respondiste :" + ctx.body;
    

    if (ctx.body.includes("1")){      
      return gotoFlow(comprarFeminizadaFlow);
    } else if(ctx.body.includes("2")){
      return gotoFlow(comprarAutoflorecientesFlow);
    } else if(ctx.body.includes("3")){
      return gotoFlow(comprarAutoflorecientesFlow);
    } else if(ctx.body.includes("4")){
      gotoFlow(comprarCertificadasFlow);
    } else if(ctx.body.includes("5")){
      gotoFlow(comprarGranelFlow);
    } else if(ctx.body.includes("6")){
      gotoFlow(comprarMedicinalFlow);
    } else if(ctx.body.includes("0")){
      gotoFlow(welcomeFlow);
    }
    

  });
