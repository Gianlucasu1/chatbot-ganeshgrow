import BotWhatsapp from "@bot-whatsapp/bot";
import datos from "../data/marihuana-cbd.json";
import comprarMarihuanaCbdFlow from "./categorias-cbd/comprar-marihuana-cbd.flow";
import comprarAceitesFlow from "./categorias-cbd/comprar-aceites.flow";
import comprarCosmeticosFlow from "./categorias-cbd/comprar-cosmeticos.flow";
import comprarMascotasFlow from "./categorias-cbd/comprar-mascotas.flow";
import comprarExtractosFlow from "./categorias-cbd/comprar-extractos.flow";
import welcomeFlow from "./welcome.flow";


/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
  .addAnswer(
    "¿Qué tipo de producto CBD estás buscando? \n 1. Marihuana CBD \n 2. Aceites CBD \n 3. Cosméticos CBD \n 4. Extractos CBD \n 5. Mascotas CBD \n 0. Volver al inicio"
  )
  .addAction({capture:true},async (ctx, { state, gotoFlow, flowDynamic }) => {
    const message = "respondiste :" + ctx.body;
    

    if (ctx.body.includes("1")){      
      return gotoFlow(comprarMarihuanaCbdFlow);
    } else if(ctx.body.includes("2")){
      return gotoFlow(comprarAceitesFlow);
    } else if(ctx.body.includes("3")){
      return gotoFlow(comprarCosmeticosFlow);
    } else if(ctx.body.includes("4")){
      return gotoFlow(comprarExtractosFlow);
    } else if( ctx.body.includes("5")){ 
      return gotoFlow(comprarMascotasFlow);
    } else if( ctx.body.includes("0")){ 
      return gotoFlow(welcomeFlow);
    }
    

  });
