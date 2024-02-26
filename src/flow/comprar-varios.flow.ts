import BotWhatsapp from "@bot-whatsapp/bot";
import cultivoFlow from "./categorias-varios/cultivo.flow";
import vaporizadoresFlow from "./categorias-varios/vaporizadores.flow";
import setasFlow from "./categorias-varios/setas.flow";
import welcomeFlow from "./welcome.flow";



/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
  .addAnswer(
    "¿Qué tipo de producto  estás buscando? \n 1. Productos para cultivar \n 2. Vaporizadores \n 3. Parafernalia \n 4. Setas \n 0. Volver atrás"
  )
  .addAction({capture:true},async (ctx, { state, gotoFlow, flowDynamic }) => {
    const message = "respondiste :" + ctx.body;
    

    if (ctx.body.includes("1")){      
      return gotoFlow(cultivoFlow);
    } else if(ctx.body.includes("2")){
      return gotoFlow(vaporizadoresFlow);
    } else if(ctx.body.includes("3")){
      return gotoFlow(cultivoFlow);
    } else if(ctx.body.includes("4")){
      return gotoFlow(setasFlow);
    } else if(ctx.body.includes("0")){
      gotoFlow(welcomeFlow);
    }
    

  });
