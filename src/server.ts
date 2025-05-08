// src/server.ts (Example if this is for an HTTP server)
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createDiscordMcpServerInstance } from './server-setup.js'; // Use the shared setup

export async function startHttpServer() {
    const app = express();
    app.use(express.json());
    const PORT = process.env.PORT || 3001; // Maybe a different port for HTTP

    console.log("Setting up HTTP MCP Server...");

    // For a stateless HTTP server:
    app.post('/mcp', async (req, res) => {
        console.log(`Received POST /mcp request`);
        const serverInstance = createDiscordMcpServerInstance(
            "DiscordWebhookServiceHTTP",
            process.env.npm_package_version || "1.0.0"
        );
        const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

        res.on('close', () => {
            console.log('HTTP Request closed, closing transport and server.');
            transport.close();
            serverInstance.close(); // Important for resource cleanup
        });

        try {
            await serverInstance.connect(transport);
            await transport.handleRequest(req, res, req.body);
        } catch (error) {
            console.error('Error handling MCP request:', error);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: { code: -32603, message: 'Internal server error' },
                    id: req.body?.id || null,
                });
            }
        }
    });

    // Add GET/DELETE for Streamable HTTP if needed (see MCP SDK docs for proper session handling)
    app.get('/mcp', async (req, res) => {
        res.status(405).send('Method Not Allowed for GET /mcp in this simple setup');
    });
    
    app.delete('/mcp', async (req, res) => {
        res.status(405).send('Method Not Allowed for DELETE /mcp in this simple setup');
    });

    app.listen(PORT, () => {
        console.log(`Discord Webhook MCP HTTP Server listening on http://localhost:${PORT}/mcp`);
    });
}

// To run this specific server (e.g., `node dist/server.js start-http`):
if (process.argv.includes('start-http')) {
    startHttpServer().catch(error => {
        console.error("Failed to start HTTP server:", error);
        process.exit(1);
    });
}