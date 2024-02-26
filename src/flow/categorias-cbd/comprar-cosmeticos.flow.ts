import BotWhatsapp from "@bot-whatsapp/bot";
import cosmeticos from "../../data/cosmeticos-cbd.json";
import { FormattedProduct } from "src/types";
import { ChatCompletionMessageParam } from "openai/resources";
import { runVenderAceite, runVenderCosmetico } from "src/services/openai";
import welcomeFlow from "../welcome.flow";
import comprarCbdFlow from "../comprar-cbd.flow";
import expertoFlow from "../experto.flow";

const cosmeticosCBD: FormattedProduct[] = cosmeticos.map((dato) => ({
  nombre: dato.Name,
  product_id: dato["Product ID"],
  categorias: dato.Categories,
  precio: dato["Price tax included"],
  referencia: dato["Reference #"],
  marca: dato.Manufacturer,
  descripcion_corta: dato["Unit price"],
}));

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(["Cosmeticos CBD"])
.addAnswer(
  "¿Tienes algo de información acerca del cosmético CBD que buscas o deseas que te recomendemos productos cosméticos CBD? "
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

      const largeResponse = await runVenderCosmetico(
        name,
        newHistory,
        cosmeticosCBD,
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
  .addAnswer(" Encuentra estos y más cosméticos CBD en: https://ganeshgrowshop.com/es/cosméticos-cbd/ ")
  .addAnswer(
    "\n1. Volver a productos CBD \n 2. Volver al inicio \n 3. Resuelve dudas generales que tengas con respecto al CBD.",
    { capture: true },
    async (ctx, { state, gotoFlow, fallBack }) => {
      if (ctx.body.includes("1")) {
        gotoFlow(comprarCbdFlow);
      } else if(ctx.body.includes("2")){
        gotoFlow(welcomeFlow);
      } else if( ctx.body.includes("3")){
        gotoFlow(expertoFlow);
      } else {
        fallBack("Por favor indica una de las opciones indicadas.\n1. Volver a productos CBD \n 2. Volver al inicio \n 3. Resuelve dudas generales que tengas con respecto al CBD.");
      }
      
    }
  );
