import BotWhatsapp from "@bot-whatsapp/bot";
import { ChatCompletionMessageParam } from "openai/resources";
import { runDetermineFurtherQuestions, runExperto } from "src/services/openai";
import finalizarFlow from "./finalizar.flow";
import mantenerConversacionFlow from "./mantener-conversacion.flow";

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(["experto CBD"])
  .addAnswer("Especifíca por favor la duda que tienes un poco más...")
  .addAction(
    { capture: true },
    async (ctx, { state, gotoFlow,fallBack, flowDynamic }) => {
      try {
        console.log("acá vamos bien");

        const newHistory = (state.getMyState()?.history ??
          []) as ChatCompletionMessageParam[];
        const name = ctx?.pushName ?? "";

        newHistory.push({
          role: "user",
          content: ctx.body,
        });

        const largeResponse = await runExperto(name, newHistory, ctx.body);

        if(largeResponse == "False"){
          return fallBack("Por favor especifíca tu duda un poco mejor")
        }

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
  .addAnswer("¿Sigues teniendo dudas?")
  .addAction({ capture: true }, async (ctx, { state, gotoFlow }) => {
    const newHistory = (state.getMyState()?.history ??
      []) as ChatCompletionMessageParam[];

    const response = await runDetermineFurtherQuestions(ctx.body, newHistory)
    console.log(response);

    if (response == "True") {
      return gotoFlow(mantenerConversacionFlow);
    } else if(response == "False") {
      return gotoFlow(finalizarFlow);
    }
  });
