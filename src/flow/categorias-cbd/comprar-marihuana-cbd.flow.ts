import BotWhatsapp from "@bot-whatsapp/bot";
import datos from "../../data/marihuana-cbd.json";
import { FormattedProduct } from "src/types";
import { ChatCompletionMessageParam } from "openai/resources";
import { runVender } from "src/services/openai";
import welcomeFlow from "../welcome.flow";
import comprarCbdFlow from "../comprar-cbd.flow";
import expertoFlow from "../experto.flow";

const floresCBD: FormattedProduct[] = datos.map((dato) => ({
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
export default BotWhatsapp.addKeyword(["marihuana CBD"])
.addAnswer(
  "¿hay algo de información acerca de la flor CBD que buscas o vienes sin información? "
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

      const largeResponse = await runVender(
        name,
        newHistory,
        floresCBD,
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
  .addAnswer(" Todos estos productos los encuentras en https://ganeshgrowshop.com/es/marihuana-cbd/ ")
  .addAnswer(
    "1. Volver a productos CBD \n 2. Volver al inicio \n 3. Resuelve dudas generales con nuestro chatbot asistente.",
    { capture: true },
    async (ctx, { state, gotoFlow, fallBack }) => {
      if (ctx.body.includes("1")) {
        gotoFlow(comprarCbdFlow);
      } else if(ctx.body.includes("2")){
        gotoFlow(welcomeFlow);
      } else if( ctx.body.includes("3")){
        gotoFlow(expertoFlow);;
      }
      
    }
  );
