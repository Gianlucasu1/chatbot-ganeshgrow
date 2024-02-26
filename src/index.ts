import "dotenv/config"
import BotWhatsapp from '@bot-whatsapp/bot'
import database from './database';
import provider from './provider';
import flow from './flow';
import { initServer } from "./services/http";
import MockAdapter from '@bot-whatsapp/database/mock';
import ProviderWS from '@bot-whatsapp/provider/baileys';

const flujoDeSaludar = BotWhatsapp.addKeyword(['hola', 'buenas', ]).addAnswer('Bienvenido a mi chatbot');

/**
 * Funcion principal del bot
 */
const main = async () => {


    await BotWhatsapp.createBot({
        database,
        flow,
        provider,
    })
    
}


main()