import BotWhatsapp from "@bot-whatsapp/bot";
import setas from "../../data/varios/setas.json";
import { FormattedProduct } from "src/types";
import { ChatCompletionMessageParam } from "openai/resources";
import { runVenderCultivo } from "src/services/openai";
import welcomeFlow from "../welcome.flow";
import expertoFlow from "../experto.flow";
import comprarVariosFlow from "../comprar-varios.flow";

const panesDeSetas: FormattedProduct[] = setas.map((dato) => ({
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
export default BotWhatsapp.addKeyword(["Panes de setas"])
.addAnswer(
  "¿Tienes algo en mente del pan de setas que estás buscando? "
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
        panesDeSetas,
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
  .addAnswer(" Encuentra estos y más panes de setas en: https://ganeshgrowshop.com/es/panes-de-setas/ ")
  .addAnswer(
    "\n1. Volver atrás \n 2. Volver al inicio \n 3. Resuelve dudas generales que tengas.",
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
