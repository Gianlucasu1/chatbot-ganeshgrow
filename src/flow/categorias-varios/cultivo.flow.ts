import BotWhatsapp from "@bot-whatsapp/bot";
import armarioCultivoFlow from "../categorias-varios-finales/armario-cultivo.flow";
import climaCutivoFlow from "../categorias-varios-finales/clima-cutivo.flow";
import iluminacionCultivoFlow from "../categorias-varios-finales/iluminacion-cultivo.flow";
import hidroponiaCultivoFlow from "../categorias-varios-finales/hidroponia-cultivo.flow";
import contenedorCultivoFlow from "../categorias-varios-finales/contenedor-cultivo.flow";
import biocidaCultivoFlow from "../categorias-varios-finales/biocida-cultivo.flow";
import fertilizantesCultivoFlow from "../categorias-varios-finales/fertilizantes-cultivo.flow";
import herramientasCultivoFlow from "../categorias-varios-finales/herramientas-cultivo.flow";
import medidaCultivoFlow from "../categorias-varios-finales/medida-cultivo.flow";
import riegoCultivoFlow from "../categorias-varios-finales/riego-cultivo.flow";
import sustratosCultivoFlow from "../categorias-varios-finales/sustratos-cultivo.flow";
import welcomeFlow from "../welcome.flow";
import comprarVariosFlow from "../comprar-varios.flow";



/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
  .addAnswer(
    "¿Qué tipo de producto de cultivo deseas buscar? \n 1. Armarios de cultivo \n 2. Clima \n 3. Iluminación \n 4. Hidroponia  \n 5. Biocidas  \n 6. Contenedores y bandejas  \n 7. Fertilizantes  \n 8. Herramientas y accesorios  \n 9. Instrumentos de medida  \n 10. Riego  \n 11. Sustratos \n 12. Volver atrás \n 13. Volver al inicio"
  )
  .addAction({capture:true},async (ctx, { state, gotoFlow, flowDynamic }) => {
    const message = "respondiste :" + ctx.body;
    

    if (ctx.body.length <= 1 && ctx.body.includes("1")){      
      return gotoFlow(armarioCultivoFlow);
    } else if(ctx.body.length <= 1 && ctx.body.includes("2")){
      return gotoFlow(climaCutivoFlow);
    } else if(ctx.body.length <= 1 && ctx.body.includes("3")){
      return gotoFlow(iluminacionCultivoFlow);
    } else if(ctx.body.length <= 1 && ctx.body.includes("4")){
      return gotoFlow(hidroponiaCultivoFlow);
    } else if(ctx.body.length <= 1 && ctx.body.includes("5")){
      return gotoFlow(biocidaCultivoFlow);
    } else if(ctx.body.length <= 1 && ctx.body.includes("6")){
      return gotoFlow(contenedorCultivoFlow);
    } else if(ctx.body.length <= 1 && ctx.body.includes("7")){
      return gotoFlow(fertilizantesCultivoFlow);
    } else if(ctx.body.length <= 1 && ctx.body.includes("8")){
      return gotoFlow(herramientasCultivoFlow);
    } else if(ctx.body.length <= 1 && ctx.body.includes("9")){
      return gotoFlow(medidaCultivoFlow);
    } else if(ctx.body.includes("10")){
      return gotoFlow(riegoCultivoFlow);
    } else if(ctx.body.includes("11")){
      return gotoFlow(sustratosCultivoFlow);
    } else if(ctx.body.includes("12")){
      return gotoFlow(comprarVariosFlow);
    } else if(ctx.body.includes("13")){
      return gotoFlow(welcomeFlow);
    } 
    

  });
