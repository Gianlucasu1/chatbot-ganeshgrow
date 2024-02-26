import BotWhatsapp from "@bot-whatsapp/bot";
import hidroponias from "../../data/varios/hidroponia-cultivo.json";
import { FormattedProduct } from "src/types";
import { ChatCompletionMessageParam } from "openai/resources";
import { runVenderCultivo,  } from "src/services/openai";
import welcomeFlow from "../welcome.flow";
import expertoFlow from "../experto.flow";
import comprarVariosFlow from "../comprar-varios.flow";

const hidroponiasCultivo: FormattedProduct[] = hidroponias.map((dato) => ({
  nombre: dato.Name,
  product_id: dato["Product ID"],
  categorias: dato.Categories,
  precio: dato["Price tax included"],
  referencia: dato["Reference #"],
  marca: dato.Manufacturer,
  descripcion_corta: dato["Unit price"],  
  descripcion: dato["Short description"],
}));

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(["Hidroponia Cultivo"])
.addAnswer(
  "¿Tienes algo en mente del producto de hidroponia para cultivo que estás buscando? "
)
.addAction(
  { capture: true },
  async (ctx, { state, gotoFlow, flowDynamic }) => {
    try {
      const newHistory = (state.getMyState()?.history ??
        []) as ChatCompletionMessageParam[];
      const name = ctx?.pushName ?? "";

      newHistory.push({
        role: "user",
        content: ctx.body,
      });

      const largeResponse = await runVenderCultivo(
        name,
        newHistory,
        hidroponiasCultivo,
        ctx.body
      );

      const chunks = largeResponse.split(/(?<!\d)\.\s+/g);

      const sendMessagesToWpp = async() => {
        for (const chunk of chunks) {
          await flowDynamic(chunk);
        }
      };

      flowDynamic(largeResponse);

      newHistory.push({
        role: "assistant",
        content: largeResponse,
      });

      await state.update({ history: newHistory });
    } catch (err) {
      console.log(`[ERROR]:`, err);
    }
  }
)
  .addAnswer(" Encuentra estos y más productos de Hidroponia y cultivo en: https://ganeshgrowshop.com/es/sistemas-hidrop%C3%B3nicos-y-aerop%C3%B3nicos/ ")
  .addAnswer(
    "\n1. Volver atrás \n 2. Volver al inicio \n 3. Resuelve dudas generales que tengas con respecto a los armarios de cultivo.",
    { capture: true },
    async (ctx, { state, gotoFlow, fallBack }) => {
      if (ctx.body.includes("1")) {
        gotoFlow(comprarVariosFlow);
      } else if(ctx.body.includes("2")){
        gotoFlow(welcomeFlow);
      } else if( ctx.body.includes("3")){
        gotoFlow(expertoFlow);
      } else {
        fallBack("Por favor indica una de las opciones indicadas.\n1. Volver atrás \n 2. Volver al inicio \n 3. Resuelve dudas generales que tengas.");
      }
      
    }
  );
