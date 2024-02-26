import BotWhatsapp from "@bot-whatsapp/bot";
import { ChatCompletionMessageParam } from "openai/resources";
import {
  runCorrerAssistant,
  runDetermineFurtherQuestions,
  runExperto,
} from "src/services/openai";
import finalizarFlow from "./finalizar.flow";
import mantenerConversacionFlow from "./mantener-conversacion.flow";

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(["experto CBDgggg"])
  .addAction(
    { capture: true },
    async (ctx, { state, gotoFlow, fallBack, flowDynamic }) => {
      try {
        console.log("acá vamos bien");

        const newHistory = (state.getMyState()?.history ??
          []) as ChatCompletionMessageParam[];
        const name = ctx?.pushName ?? "";

        newHistory.push({
          role: "user",
          content: ctx.body,
        });

        const largeResponse = await runCorrerAssistant(
          name,
          newHistory,
          ctx.body
        );

        

        console.log(largeResponse);

        await flowDynamic(largeResponse);

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
  .addAction(async (ctx, { state, gotoFlow, fallBack }) => {
    return fallBack();
  });
