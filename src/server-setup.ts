// src/server-setup.ts (or directly in server.ts if it's the primary module)
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { handleDiscordSendMessage, handleDiscordSendEmbed } from './tool-handlers.js'; // Note .js
import { z } from "zod";

export function registerDiscordWebhookTools(server: McpServer) {
  // Register the discord-send-message tool
  server.tool(
    "discord-send-message",
    {
      webhookUrl: z.string().url(),
      content: z.string().min(1).max(2000),
      username: z.string().optional(),
      avatarUrl: z.string().url().optional()
    },
    async (args, extra) => {
      const result = await handleDiscordSendMessage(args, extra);
      return {
        content: result.content.map(item => ({
          ...item,
          type: item.type as "text"
        })),
        isError: result.isError
      };
    }
  );

  // Register the discord-send-embed tool
  server.tool(
    "discord-send-embed",
    {
      webhookUrl: z.string().url(),
      embeds: z.array(z.object({}).passthrough()),
      content: z.string().max(2000).optional(),
      username: z.string().optional(),
      avatarUrl: z.string().url().optional(),
      autoFormat: z.boolean().optional().default(false),
      autoFormatPrompt: z.string().optional()
    },
    async (args, extra) => {
      const result = await handleDiscordSendEmbed(args, extra);
      return {
        content: result.content.map(item => ({
          ...item,
          type: item.type as "text"
        })),
        isError: result.isError
      };
    }
  );
}

// If this file is also your main server.ts for HTTP, you might have:
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
// import express from 'express';

export function createDiscordMcpServerInstance(name: string, version: string) {
    const server = new McpServer({
        name,
        version,
        description: "MCP server to send messages and embeds to Discord webhooks.",
    });
    registerDiscordWebhookTools(server);
    return server;
}

/*
// Example of how server.ts might use this for an HTTP server
export async function startHttpServer() {
    const app = express();
    app.use(express.json());
    const PORT = process.env.PORT || 3000;

    app.post('/mcp', async (req, res) => {
        const mcpInstance = createDiscordMcpServerInstance(
            "DiscordWebhookServiceHTTP",
            process.env.npm_package_version || "1.0.0"
        );
        const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
        // ... connect transport and handle request ...
        // Remember to clean up transport and mcpInstance on res.close() for stateless
    });

    app.listen(PORT, () => {
        console.log(`HTTP MCP Server listening on port ${PORT}`);
    });
}
*/