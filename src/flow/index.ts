import BotWhatsapp from '@bot-whatsapp/bot';
import helloFlow from './hello.flow';
import welcomeFlow from './welcome.flow';
import comprarCbdFlow from './comprar-cbd.flow';
import comprarMarihuanaCbdFlow from './categorias-cbd/comprar-marihuana-cbd.flow';
import expertoFlow from './experto.flow';
import comprarSemillasFlow from './comprar-semillas.flow';
import comprarAceitesFlow from './categorias-cbd/comprar-aceites.flow';
import comprarCosmeticosFlow from './categorias-cbd/comprar-cosmeticos.flow';
import comprarMascotasFlow from './categorias-cbd/comprar-mascotas.flow';
import comprarExtractosFlow from './categorias-cbd/comprar-extractos.flow';
import comprarFeminizadaFlow from './categorias-semillas/comprar-feminizada.flow';
import comprarAutoflorecientesFlow from './categorias-semillas/comprar-autoflorecientes.flow';
import comprarCertificadasFlow from './categorias-semillas/comprar-certificadas.flow';
import comprarGranelFlow from './categorias-semillas/comprar-granel.flow';
import comprarMedicinalFlow from './categorias-semillas/comprar-medicinal.flow';
import mantenerConversacionFlow from './mantener-conversacion.flow';
import finalizarFlow from './finalizar.flow';
import comprarVariosFlow from './comprar-varios.flow';
import cultivoFlow from './categorias-varios/cultivo.flow';
import armarioCultivoFlow from './categorias-varios-finales/armario-cultivo.flow';
import climaCutivoFlow from './categorias-varios-finales/clima-cutivo.flow';
import iluminacionCultivoFlow from './categorias-varios-finales/iluminacion-cultivo.flow';
import hidroponiaCultivoFlow from './categorias-varios-finales/hidroponia-cultivo.flow';
import contenedorCultivoFlow from './categorias-varios-finales/contenedor-cultivo.flow';
import biocidaCultivoFlow from './categorias-varios-finales/biocida-cultivo.flow';
import fertilizantesCultivoFlow from './categorias-varios-finales/fertilizantes-cultivo.flow';
import herramientasCultivoFlow from './categorias-varios-finales/herramientas-cultivo.flow';
import medidaCultivoFlow from './categorias-varios-finales/medida-cultivo.flow';
import riegoCultivoFlow from './categorias-varios-finales/riego-cultivo.flow';
import sustratosCultivoFlow from './categorias-varios-finales/sustratos-cultivo.flow';
import vaporizadoresFlow from './categorias-varios/vaporizadores.flow';
import setasFlow from './categorias-varios/setas.flow';
import loopFlow from './loop.flow';


/**
 * Debes de implementasr todos los flujos
 */
export default BotWhatsapp.createFlow(
    [        
        welcomeFlow,   
        comprarCbdFlow,     
        comprarMarihuanaCbdFlow,
        comprarAceitesFlow,
        comprarCosmeticosFlow,
        comprarMascotasFlow,
        comprarExtractosFlow,
        comprarSemillasFlow,
        comprarFeminizadaFlow,
        comprarAutoflorecientesFlow,
        comprarCertificadasFlow,
        comprarGranelFlow,
        comprarMedicinalFlow,
        comprarVariosFlow,
        cultivoFlow,
        armarioCultivoFlow,
        climaCutivoFlow,
        iluminacionCultivoFlow,
        hidroponiaCultivoFlow,
        biocidaCultivoFlow,
        contenedorCultivoFlow,
        fertilizantesCultivoFlow,
        herramientasCultivoFlow,
        medidaCultivoFlow,
        riegoCultivoFlow,
        sustratosCultivoFlow,
        vaporizadoresFlow,
        setasFlow,
        expertoFlow,
        mantenerConversacionFlow,
        finalizarFlow,
        loopFlow
        
    ]
)