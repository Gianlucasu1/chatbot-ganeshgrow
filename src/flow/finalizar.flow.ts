import BotWhatsapp from '@bot-whatsapp/bot';

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(['funcion finalizar'])
    .addAnswer('Un placer haber sido de tu ayuda, no dudes en visitarnos en https://ganeshgrowshop.com/es/ para mantener al tanto de nuestras ofertas. ')
    .addAction((ctx, {state, endFlow})=>{
      endFlow("Chat finalizado");
    })

