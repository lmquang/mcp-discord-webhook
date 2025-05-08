# MCP Discord Webhook

A Model Context Protocol (MCP) server that provides tools to send messages and embeds to Discord webhooks.

## Features

- Send simple text messages to Discord webhooks
- Send rich embeds to Discord webhooks with customizable content
- Supports both stdio and HTTP transport modes

## Installation

```bash
npm install @lmquang/mcp-discord-webhook
```

## Usage

### As a CLI Tool

```bash
# Install globally
npm install -g @lmquang/mcp-discord-webhook

# Run the CLI
mcp-discord-webhook
```

### Using npx (without installation)

```bash
# Run directly with npx
npx -y @lmquang/mcp-discord-webhook
```

### As a Library

```javascript
import { createDiscordMcpServerInstance } from '@lmquang/mcp-discord-webhook';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

async function runServer() {
  const server = createDiscordMcpServerInstance(
    "MyDiscordWebhookService",
    "1.0.0"
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### HTTP Server Mode

```javascript
import { startHttpServer } from '@lmquang/mcp-discord-webhook/server';

// Start the HTTP server
startHttpServer().catch(console.error);
```

## Available Tools

### discord-send-message

Sends a simple text message to a Discord webhook.

Parameters:
- `webhookUrl` (string, required): The Discord webhook URL
- `content` (string, required): The message content
- `username` (string, optional): Override the webhook's default username
- `avatarUrl` (string, optional): Override the webhook's default avatar

### discord-send-embed

Sends a message with one or more embeds to a Discord webhook.

Parameters:
- `webhookUrl` (string, required): The Discord webhook URL
- `embeds` (array, required): Array of embed objects
- `content` (string, optional): Optional text content
- `username` (string, optional): Override the webhook's default username
- `avatarUrl` (string, optional): Override the webhook's default avatar

## Development

```bash
# Clone the repository
git clone https://github.com/lmquang/mcp-discord-webhook.git
cd mcp-discord-webhook

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm start
```

## License

MIT 