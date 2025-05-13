// src/schemas.ts
import { z } from "zod";

// --- Discord Embed Schemas ---
export const DiscordEmbedFooterSchema = z.object({
  text: z.string().max(2048),
  icon_url: z.string().url().optional(),
}).optional();

export const DiscordEmbedImageSchema = z.object({
  url: z.string().url(),
  height: z.number().int().positive().optional(),
  width: z.number().int().positive().optional(),
}).optional();

export const DiscordEmbedThumbnailSchema = z.object({
  url: z.string().url(),
  height: z.number().int().positive().optional(),
  width: z.number().int().positive().optional(),
}).optional();

export const DiscordEmbedAuthorSchema = z.object({
  name: z.string().max(256),
  url: z.string().url().optional(),
  icon_url: z.string().url().optional(),
}).optional();

export const DiscordEmbedFieldSchema = z.object({
  name: z.string().max(256),
  value: z.string().max(1024),
  inline: z.boolean().optional(),
});

export const DiscordEmbedSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  timestamp: z.string().datetime().optional(),
  color: z.number().int().min(0).max(0xFFFFFF).optional(),
  footer: DiscordEmbedFooterSchema,
  image: DiscordEmbedImageSchema,
  thumbnail: DiscordEmbedThumbnailSchema,
  author: DiscordEmbedAuthorSchema,
  fields: z.array(DiscordEmbedFieldSchema).optional(),
});

// --- OpenAI-Compatible Discord Embed Schemas ---
// These are simplified versions for use with OpenAI's zodResponseFormat
// Avoids validators that aren't compatible with OpenAI's response_format

export const OpenAICompatibleEmbedFieldSchema = z.object({
  name: z.string(),
  value: z.string(),
  inline: z.boolean().nullable(),
});

export const OpenAICompatibleEmbedFooterSchema = z.object({
  text: z.string(),
  icon_url: z.string().nullable(),
}).nullable();

export const OpenAICompatibleEmbedImageSchema = z.object({
  url: z.string(),
  height: z.number().nullable(),
  width: z.number().nullable(),
}).nullable();

export const OpenAICompatibleEmbedThumbnailSchema = z.object({
  url: z.string(),
  height: z.number().nullable(),
  width: z.number().nullable(),
}).nullable();

export const OpenAICompatibleEmbedAuthorSchema = z.object({
  name: z.string(),
  url: z.string().nullable(),
  icon_url: z.string().nullable(),
}).nullable();

export const OpenAICompatibleEmbedSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  url: z.string().nullable(),
  timestamp: z.string().nullable(),
  color: z.number().nullable(),
  footer: OpenAICompatibleEmbedFooterSchema,
  image: OpenAICompatibleEmbedImageSchema,
  thumbnail: OpenAICompatibleEmbedThumbnailSchema,
  author: OpenAICompatibleEmbedAuthorSchema,
  fields: z.array(OpenAICompatibleEmbedFieldSchema).nullable(),
});

// --- Tool Parameter Schemas ---
export const SendMessageParamsSchema = z.object({
  webhookUrl: z.string().url({ message: "Invalid Discord webhook URL" }),
  content: z.string().min(1).max(2000),
  username: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

export const SendEmbedParamsSchema = z.object({
  webhookUrl: z.string().url({ message: "Invalid Discord webhook URL" }),
  embeds: z.array(z.object({}).passthrough()),
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().max(2000).optional(),
  username: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  autoFormat: z.boolean().optional().default(false),
  autoFormatPrompt: z.string().optional(),
});


// --- Type Aliases (inferred from Zod schemas for better type safety in handlers) ---
export type SendMessageArgs = z.infer<typeof SendMessageParamsSchema>;
export type SendEmbedArgs = z.infer<typeof SendEmbedParamsSchema>;