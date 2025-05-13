// src/tool-handlers.ts
import axios from 'axios';
import OpenAI, { fileFromPath } from 'openai';
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from 'zod';
import {
  SendMessageArgs,
  SendEmbedArgs,
  OpenAICompatibleEmbedSchema
} from './schema.js';

export async function handleDiscordSendMessage(params: SendMessageArgs, extra?: any) {
  const { webhookUrl, content, username, avatarUrl } = params;
  try {
    const payload: any = { content };
    if (username) payload.username = username;
    if (avatarUrl) payload.avatar_url = avatarUrl;
    await axios.post(webhookUrl, payload, { headers: { "Content-Type": "application/json" } });
    return { content: [{ type: "text", text: "Message sent successfully." }] };
  } catch (error: any) {
    const errorMessage = axios.isAxiosError(error) && error.response ?
      `Discord API Error (${error.response.status}): ${JSON.stringify(error.response.data?.message || error.response.data)}` :
      (error.message || "Unknown error sending message.");
    console.error("Error in discord-send-message tool:", errorMessage); // Log error details
    return { content: [{ type: "text", text: `Error: ${errorMessage}` }], isError: true };
  }
}

// Helper function to format content using OpenAI
async function formatContentWithOpenAI(content: string, customPrompt?: string): Promise<any> {
  // Check for OpenAI API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is required for autoFormat");
  }

  const openai = new OpenAI({ apiKey });

  // Default system prompt for formatting Discord embeds
  const defaultSystemPrompt = `
    You are a Discord embed formatter. Convert the given content into a well-structured Discord embed.
    
    You need to understand the content and create a title, description, and relevant fields based on the content following these instructions:
    - Generate a title based on the content.
    - Generate a description based on the content, make it short and concise within 15-20 words
    - Make sure to use the content to create "fields" in the embed.
    - Use appropriate formatting, emoji for the fields name, and structure to make the embed visually appealing.
    
    Return a JSON object for a Discord embed with the following structure:
    {
      "title": "Title of the embed",
      "description": "Description of content. Make it short and concise within 15-20 words",
      "color": 3447003, // A blue color in decimal, you need to understand the content and make it appropriate
      "fields": [
        {
          "name": "Header of section of field1",
          "value": "Content of section of field2",
          "inline": true/false
        }
      ], // You need to use the content to create fields, make sure to use the content to create fields
      "footer": {
        "text": "Optional footer text"
      }
    }
  `;

  try {
    // Use the beta.chat.completions.parse API with zodResponseFormat
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4.1-mini-2025-04-14",
      messages: [
        { role: "system", content: customPrompt || defaultSystemPrompt },
        { role: "user", content }
      ],
      response_format: zodResponseFormat(OpenAICompatibleEmbedSchema, "discordEmbed"),
      temperature: 0.0,
    });

    // Get the parsed result directly
    const formattedEmbed = completion.choices[0].message.parsed;

    if (!formattedEmbed) {
      throw new Error("Failed to generate formatted content");
    }

    return formattedEmbed;
  } catch (fallbackError: any) {
    console.error("Error formatting content with OpenAI:", fallbackError.message);

    // Return a basic embed if all attempts fail
    return {
      title: "Content Summary",
      description: content.substring(0, 2000),
      color: 3447003,
    };
  }
}

export async function handleDiscordSendEmbed(params: SendEmbedArgs, extra?: any) {
  const { webhookUrl, embeds, title, content, username, avatarUrl, autoFormat, autoFormatPrompt } = params;
  try {
    let finalEmbeds = embeds;

    // If autoFormat is enabled and we have content, use OpenAI to format it
    if (autoFormat && content) {
      try {
        const formattedEmbed = await formatContentWithOpenAI(content, autoFormatPrompt);
        finalEmbeds = [formattedEmbed];
      } catch (formatError: any) {
        console.error("Error formatting content with OpenAI:", formatError.message);
        // Fall back to original embeds if formatting fails
        if (embeds.length === 0) {
          // If no embeds were provided, create a basic one from the content
          finalEmbeds = [{
            title: title !== "" ? title : "Content Summary",
            description: content.substring(0, 2000),
            color: 3447003,
          }];
        }
      }
    }

    const payload: any = { embeds: finalEmbeds };
    if (username) payload.username = username;
    if (avatarUrl) payload.avatar_url = avatarUrl;
    if (content && !autoFormat) payload.content = content;
    if (title) payload.title = title;
    console.log("payload", payload);

    await axios.post(webhookUrl, payload, { headers: { "Content-Type": "application/json" } });
    return { content: [{ type: "text", text: "Embed message sent successfully." }] };
  } catch (error: any) {
    const errorMessage = axios.isAxiosError(error) && error.response ?
      `Discord API Error (${error.response.status}): ${JSON.stringify(error.response.data?.message || error.response.data)}` :
      (error.message || "Unknown error sending embed.");
    console.error("Error in discord-send-embed tool:", errorMessage); // Log error details
    return { content: [{ type: "text", text: `Error: ${errorMessage}` }], isError: true };
  }
}