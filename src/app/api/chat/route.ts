import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  fromOpenAICompletion,
  templatesToResponseFormat,
  toOpenAIMessages,
} from "@crayonai/stream";
import { Message } from "@crayonai/react-core";
import { RecipeTemplateSchema } from "@/types/recipe";


// Check if OpenAI API key is configured
if (!process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set in environment variables');
}

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: Message[] };
  const client = new OpenAI({
    baseURL: 'https://pulseiq-poc.vercel.app/api/chat'
  });
  const llmStream = await client.chat.completions.create({
    model: "gpt-4o",
    messages: toOpenAIMessages(
      messages
    ) as OpenAI.Chat.ChatCompletionMessageParam[],
    stream: true,
    response_format: templatesToResponseFormat({
      schema: RecipeTemplateSchema,
      name: "recipe",
      description: "Use this template to generate a recipe"
    })
  });
  const responseStream = fromOpenAICompletion(llmStream);

  return new Response(
    responseStream as unknown as ReadableStream<Uint8Array>,
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    }
  );
}