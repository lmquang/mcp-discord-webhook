# MCP Discord Webhook

A Model Context Protocol (MCP) server that provides tools to send messages and embeds to Discord webhooks.

## Features

- Send simple text messages to Discord webhooks
- Send rich embeds to Discord webhooks with customizable content
- Auto-format content into Discord embeds using OpenAI
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

### Environment Variables

When using the autoFormat feature, you need to set your OpenAI API key:

```bash
export OPENAI_API_KEY=your_openai_api_key
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
- `autoFormat` (boolean, optional): When set to true, uses OpenAI to automatically format the content into a Discord embed
- `autoFormatPrompt` (string, optional): Custom system prompt for the OpenAI formatting (only used when autoFormat is true)

## Auto-Formatting with OpenAI

When the `autoFormat` parameter is set to `true`, the tool will use OpenAI's API to convert your content into a well-structured Discord embed. This is particularly useful when you want to quickly format plain text or unstructured content into an attractive Discord embed.

The auto-formatting feature includes Zod schema validation to ensure that the generated embeds conform to Discord's requirements. If the AI generates an invalid embed format, the tool will automatically fall back to a simple embed containing the original content.

**Note:** When `autoFormat` is enabled, the content is only used to generate the embed and is not included separately in the Discord message. This prevents duplicate content from appearing in your Discord messages.

Example:
```javascript
{
  "webhookUrl": "https://discord.com/api/webhooks/your_webhook_url",
  "content": "Project Status Update: We've completed the backend API and are now working on the frontend. Current progress is at 65%. Next milestone is scheduled for Friday.",
  "embeds": [], // Can be empty when using autoFormat
  "autoFormat": true
}
```

You can also customize the formatting by providing a custom system prompt:

```javascript
{
  "webhookUrl": "https://discord.com/api/webhooks/your_webhook_url",
  "content": "Project Status Update: We've completed the backend API and are now working on the frontend. Current progress is at 65%. Next milestone is scheduled for Friday.",
  "embeds": [],
  "autoFormat": true,
  "autoFormatPrompt": "Format this as a project status report with color-coded sections based on urgency. Use red for critical items, yellow for warnings, and green for completed items."
}
```

**Note:** Using the `autoFormat` feature requires an OpenAI API key set as the `OPENAI_API_KEY` environment variable.

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

## Publishing

This package uses GitHub Actions to automatically publish to npm when a new version tag is pushed.

### To publish a new version:

#### Option 1: Using npm scripts (recommended)

We provide npm scripts that handle versioning and publishing:

```bash
# For bug fixes (1.0.0 -> 1.0.1)
npm run publish:patch

# For new features (1.0.0 -> 1.1.0)
npm run publish:minor

# For breaking changes (1.0.0 -> 2.0.0)
npm run publish:major
```

#### Option 2: Using the helper script directly

You can also run the helper script directly:

```bash
./scripts/publish.sh patch  # or minor/major
```

The script will:
1. Check for uncommitted changes
2. Update the version in package.json
3. Create a git tag
4. Push changes and tags
5. Trigger the GitHub Action workflow

#### Option 3: Manual process

1. Update the version in `package.json`:
   ```bash
   npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
   npm version minor  # for new features (1.0.0 -> 1.1.0)
   npm version major  # for breaking changes (1.0.0 -> 2.0.0)
   ```
   
   **Note:** The `npm version` command will automatically create a git tag for you.

2. Push the changes and the new tag:
   ```bash
   git push && git push --tags
   ```

3. The GitHub Action will automatically:
   - Check if the version already exists on npm
   - Build the project
   - Publish to npm if the version is new

### Version naming convention

Follow semantic versioning (SemVer) principles:
- **MAJOR** version for incompatible API changes
- **MINOR** version for adding functionality in a backward compatible manner
- **PATCH** version for backward compatible bug fixes

### Setting up npm authentication

To enable the GitHub Action to publish to npm, you need to add your npm token as a repository secret:

1. Generate an npm access token from your npm account settings
2. Go to your GitHub repository settings > Secrets > Actions
3. Add a new repository secret named `NPM_TOKEN` with your npm access token as the value

## License

MIT 