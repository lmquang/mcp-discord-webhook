// src/tool-handlers.ts
import axios from 'axios';
export async function handleDiscordSendMessage(params, extra) {
    const { webhookUrl, content, username, avatarUrl } = params;
    try {
        const payload = { content };
        if (username)
            payload.username = username;
        if (avatarUrl)
            payload.avatar_url = avatarUrl;
        await axios.post(webhookUrl, payload, { headers: { "Content-Type": "application/json" } });
        return { content: [{ type: "text", text: "Message sent successfully." }] };
    }
    catch (error) {
        const errorMessage = axios.isAxiosError(error) && error.response ?
            `Discord API Error (${error.response.status}): ${JSON.stringify(error.response.data?.message || error.response.data)}` :
            (error.message || "Unknown error sending message.");
        console.error("Error in discord-send-message tool:", errorMessage); // Log error details
        return { content: [{ type: "text", text: `Error: ${errorMessage}` }], isError: true };
    }
}
export async function handleDiscordSendEmbed(params, extra) {
    const { webhookUrl, embeds, content, username, avatarUrl } = params;
    try {
        const payload = { embeds };
        if (content)
            payload.content = content;
        if (username)
            payload.username = username;
        if (avatarUrl)
            payload.avatar_url = avatarUrl;
        await axios.post(webhookUrl, payload, { headers: { "Content-Type": "application/json" } });
        return { content: [{ type: "text", text: "Embed message sent successfully." }] };
    }
    catch (error) {
        const errorMessage = axios.isAxiosError(error) && error.response ?
            `Discord API Error (${error.response.status}): ${JSON.stringify(error.response.data?.message || error.response.data)}` :
            (error.message || "Unknown error sending embed.");
        console.error("Error in discord-send-embed tool:", errorMessage); // Log error details
        return { content: [{ type: "text", text: `Error: ${errorMessage}` }], isError: true };
    }
}
//# sourceMappingURL=tool-handlers.js.map