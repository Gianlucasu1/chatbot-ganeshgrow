import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import {
  generatePrompt,
  generatePromptDetermine,
  generatePromptDetermineFurtherQuestions,
  generatePromptExperto,
  generatePromptVenderAceiteCBD,
  generatePromptVenderCosmeticoCBD,
  generatePromptVenderCultivo,
  generatePromptVenderExtractoCBD,
  generatePromptVenderMarihuanaCBD,
  generatePromptVenderMascotaCBD,
  generatePromptVenderSemillaAutofloreciente,
  generatePromptVenderSemillaCertificada,
  generatePromptVenderSemillaFeminizada,
  generatePromptVenderSemillaGranel,
  generatePromptVenderSemillaMedicinal,
  runAssistantPrompt,
} from "./prompt";
import { FormattedProduct } from "src/types";
import { MessageCreateParams } from "openai/resources/beta/threads/messages/messages";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 *
 * @param name
 * @param history
 */
const run = async (
  name: string,
  history: ChatCompletionMessageParam[]
): Promise<string> => {
  const prompt = generatePrompt(name);
  console.log(prompt);
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runDetermineFurtherQuestions = async (
  message: string,
  history: ChatCompletionMessageParam[]
): Promise<string> => {
  const promtp = generatePromptDetermineFurtherQuestions(message);
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: promtp,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 800,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runDetermine = async (
  history: ChatCompletionMessageParam[]
): Promise<string> => {
  const promtp = generatePromptDetermine();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: promtp,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 800,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runExperto = async (
  name: string,
  history: ChatCompletionMessageParam[],
  question: string
): Promise<string> => {
  const prompt = generatePromptExperto(name, question);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVender = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderMarihuanaCBD(name, productos, question);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderAceite = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderAceiteCBD(name, productos, question);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderCosmetico = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderCosmeticoCBD(name, productos, question);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderMascota = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderMascotaCBD(name, productos, question);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderExtracto = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderExtractoCBD(name, productos, question);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderSemillaFeminizada = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderSemillaFeminizada(
    name,
    productos,
    question
  );

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderSemillaAutofloreciente = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderSemillaAutofloreciente(
    name,
    productos,
    question
  );

  const assistant = await openai.beta.assistants.create({
    name: "Luisito - Cultivador experto en cannabis",
    instructions:
      "Eres un experto en cultivo de cannabis sativa L, trabaja para la empresa Ganesh grow y recomienda productos de la pagina web www.ganeshgrow.es capaz de responder a todas las preguntas sobre el desarrollo del cultivo, tanto en interior como en exterior. Ofrece asesoramiento detallado sobre la germinación de semillas, producción de esquejes, desarrollo de la planta y la etapa de floración. Es un especialista en enfermedades y control de plagas, iluminación para cultivos, así como en el manejo y uso de sustratos y fertilizantes. Luisito tiene la habilidad para identificar carencias, deficiencias y excesos en las plantas a través de los síntomas en las hojas en todas las etapas de desarrollo con sólo observar una fotografía. Se comunica de manera profesional, proporcionando información precisa y con base en conocimientos actualizados. Luisito es un experto de alto nivel en todas las siguientes áreas y tiene amplio conocimiento sobre Química de la Cannabis Sativa L., Química de la separación del cannabis, Ciencia de laboratorio del cannabis, Ciencia hortícola aplicada, Extracción biotecnológica del cannabis,  Fisiología Vegetal, Gestión de Invernaderos y Viveros, Principios de fitomejoramiento y Biotecnología de cultivos, Botánica del cannabis, genética y mejoramiento, aspectos agronómicos y hortícolas de la producción, y tecnologías de procesamiento y poscosecha. Basarás tus respuestas de cultivo en el libro 'TheMarijuanaGrowersGuide.pdf' que te pre cargué como documento.",
    tools: [{ type: "retrieval" }],
    model: "gpt-4-turbo-preview",
  });

  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: prompt,
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions:
      "Please address the user as Gianluca Casu. The user has a premium account.",
  });

  const messages = await openai.beta.threads.messages.list(thread.id);

  const mensajes = messages.data;

  mensajes.forEach((mensaje) => {
    if (Array.isArray(mensaje.content)) {
      mensaje.content.forEach((contenido) => {
        console.log(contenido); // Imprime cada elemento del arreglo 'content'
      });
    } else {
      // Si 'content' no es un arreglo, simplemente imprímelo
      console.log(mensaje.content);
    }
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderSemillaCertificada = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderSemillaCertificada(
    name,
    productos,
    question
  );

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderSemillaGranel = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderSemillaGranel(name, productos, question);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderSemillaMedicinal = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderSemillaMedicinal(
    name,
    productos,
    question
  );

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runVenderCultivo = async (
  name: string,
  history: ChatCompletionMessageParam[],
  productos: FormattedProduct[],
  question: string
): Promise<string> => {
  console.log("[PRODUCTOS]", productos[0].nombre);

  const prompt = generatePromptVenderCultivo(name, productos, question);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...history,
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const runCorrerAssistant = async (
  name: string,
  history: ChatCompletionMessageParam[],
  question: string
): Promise<string> => {
  const lastMessage: MessageCreateParams = {
    role: "user",
    content: history[history.length - 1].content.toString(),
  };

  console.log(lastMessage);

  /*const assistant = await openai.beta.assistants.retrieve(
    "asst_ofiS58VKhhkakr4NSuiEgG0r"
  );

  console.log("ASISTANT---", assistant);*/

  const thread = await openai.beta.threads.create();
  console.log("THREAD---", thread);

  const message = await openai.beta.threads.messages.create(
    thread.id,
    lastMessage
  );

  console.log("MESSAGE---", message);

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: "asst_ofiS58VKhhkakr4NSuiEgG0r",
  });


  await new Promise((resolve) => {
    setTimeout(resolve, 35000);
  });
  

  let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  console.log("RUNSTATUS---", runStatus);


  /*while (runStatus.status !== "completed") {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }
*/

  const messages = await openai.beta.threads.messages.list(thread.id);

  const index:number = messages.data.length - 1;

  console.log("MESSAGES",messages.data);
  console.log("MESSAGE-0----",messages.data[0].content[0]);

  return ("Función corrió");
};

export {
  run,
  runDetermine,
  runVender,
  runExperto,
  runVenderAceite,
  runVenderCosmetico,
  runVenderMascota,
  runVenderExtracto,
  runVenderSemillaFeminizada,
  runVenderSemillaAutofloreciente,
  runVenderSemillaCertificada,
  runVenderSemillaGranel,
  runVenderSemillaMedicinal,
  runDetermineFurtherQuestions,
  runVenderCultivo,
  runCorrerAssistant,
};
