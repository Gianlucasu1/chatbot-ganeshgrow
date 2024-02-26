import BotWhatsapp from "@bot-whatsapp/bot";
import comprarCbdFlow from "./comprar-cbd.flow";
import comprarSemillasFlow from "./comprar-semillas.flow";
import expertoFlow from "./experto.flow";
import comprarVariosFlow from "./comprar-varios.flow";
import { ChatCompletionMessageParam } from "openai/resources";
import { runCorrerAssistant } from "src/services/openai";
import loopFlow from "./loop.flow";

/**
 * Un flujo conversacion que es por defecto cunado no se contgiene palabras claves en otros flujos
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)

.addAction(async (ctx, { state, gotoFlow, flowDynamic }) => {
    return flowDynamic("¡Hola! ¿En qué puedo ayudarte?");
  })
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
  
        const largeResponse = await runCorrerAssistant(
          name,
          newHistory,          
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
  .addAction(async (ctx, { state, gotoFlow, flowDynamic }) => {
    return gotoFlow(loopFlow);
  })
/* .addAction( async (ctx, { flowDynamic, state }) => {

        try{
            const newHistory = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[]
            const name = ctx?.pushName ?? ''
                            
            newHistory.push({
                role: 'user',
                content: ctx.body
            })
                        
            const largeResponse = await run(name, newHistory)
            
            const chunks = largeResponse.split(/(?<!\d)\.\s+/g);
            for (const chunk of chunks) {
                await flowDynamic(chunk)
            }

            newHistory.push({
                role: 'assistant',
                content: largeResponse
            })
        
            await state.update({history: newHistory})
    
        }catch(err){
            console.log(`[ERROR]:`,err)
        }
    }) */
