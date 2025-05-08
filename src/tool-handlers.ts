// src/tool-handlers.ts
import axios from 'axios';
import OpenAI from 'openai';
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from 'zod';
import type { SendMessageArgs, SendEmbedArgs } from './schema.js'; // Import types

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

// Define Zod schema for Discord embed with nullable() for optional fields
const DiscordEmbedFieldSchema = z.object({
  name: z.string(),
  value: z.string(),
  inline: z.boolean().nullable().optional(),
});

const DiscordEmbedFooterSchema = z.object({
  text: z.string(),
  icon_url: z.string().url().nullable().optional(),
}).nullable().optional();

const DiscordEmbedImageSchema = z.object({
  url: z.string().url(),
  height: z.number().int().positive().nullable().optional(),
  width: z.number().int().positive().nullable().optional(),
}).nullable().optional();

const DiscordEmbedThumbnailSchema = z.object({
  url: z.string().url(),
  height: z.number().int().positive().nullable().optional(),
  width: z.number().int().positive().nullable().optional(),
}).nullable().optional();

const DiscordEmbedAuthorSchema = z.object({
  name: z.string(),
  url: z.string().url().nullable().optional(),
  icon_url: z.string().url().nullable().optional(),
}).nullable().optional();

const DiscordEmbedSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  url: z.string().url().nullable().optional(),
  timestamp: z.string().datetime().nullable().optional(),
  color: z.number().int().min(0).max(0xFFFFFF).nullable().optional(),
  footer: DiscordEmbedFooterSchema,
  image: DiscordEmbedImageSchema,
  thumbnail: DiscordEmbedThumbnailSchema,
  author: DiscordEmbedAuthorSchema,
  fields: z.array(DiscordEmbedFieldSchema).nullable().optional(),
});

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
    Create a title, description, and relevant fields based on the content. Make use content is always in emebed fields.
    Use appropriate formatting and structure to make the embed visually appealing.
    
    Return a JSON object for a Discord embed with the following structure:
    {
      "title": "Title of the embed",
      "description": "Description of the embed",
      "color": 3447003, // A blue color in decimal
      "fields": [
        {
          "name": "Field name",
          "value": "Field value",
          "inline": true/false
        }
      ],
      "footer": {
        "text": "Optional footer text"
      }
    }
    
    Ensure your response is valid JSON format.
  `;

  try {
    // Use the beta.chat.completions.parse API with zodResponseFormat
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4.1-mini-2025-04-14",
      messages: [
        { role: "system", content: customPrompt || defaultSystemPrompt },
        { role: "user", content }
      ],
      response_format: zodResponseFormat(DiscordEmbedSchema, "discordEmbed"),
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
  const { webhookUrl, embeds, content, username, avatarUrl, autoFormat, autoFormatPrompt } = params;
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
            title: "Content Summary",
            description: content.substring(0, 2000),
            color: 3447003,
          }];
        }
      }
    }

    const payload: any = { embeds: finalEmbeds };
    if (username) payload.username = username;
    if (avatarUrl) payload.avatar_url = avatarUrl;

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