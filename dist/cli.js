#!/usr/bin/env node
// src/cli.ts
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createDiscordMcpServerInstance } from './server-setup.js'; // Import the setup function
async function runStdioServer() {
    console.error("Starting MCP Discord Webhook Server (stdio mode)...");
    const server = createDiscordMcpServerInstance("DiscordWebhookServiceCLI", process.env.npm_package_version || "1.0.0" // Get version from package.json
    );
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Discord Webhook Server connected via stdio. Listening for messages...");
}
runStdioServer().catch(err => {
    console.error("Failed to start MCP server:", err);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map