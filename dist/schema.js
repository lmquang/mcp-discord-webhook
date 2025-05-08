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
// --- Tool Parameter Schemas ---
export const SendMessageParamsSchema = z.object({
    webhookUrl: z.string().url({ message: "Invalid Discord webhook URL" }),
    content: z.string().min(1).max(2000),
    username: z.string().optional(),
    avatarUrl: z.string().url().optional(),
});
export const SendEmbedParamsSchema = z.object({
    webhookUrl: z.string().url({ message: "Invalid Discord webhook URL" }),
    embeds: z.array(DiscordEmbedSchema).min(1).max(10),
    title: z.string().optional(),
    description: z.string().optional(),
    content: z.string().max(2000).optional(),
    username: z.string().optional(),
    avatarUrl: z.string().url().optional(),
    autoFormat: z.boolean().optional().default(false),
    autoFormatPrompt: z.string().optional(),
});
//# sourceMappingURL=schema.js.map