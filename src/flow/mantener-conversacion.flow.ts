import BotWhatsapp from '@bot-whatsapp/bot';
import { generatePaymentLink } from 'src/services/paypal';
import expertoFlow from './experto.flow';
import loopFlow from './loop.flow';

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAction(async (ctx, {flowDynamic, gotoFlow, state}) => {
        gotoFlow(loopFlow);
    })

