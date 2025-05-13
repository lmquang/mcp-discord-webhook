import { z } from "zod";
export declare const DiscordEmbedFooterSchema: z.ZodOptional<z.ZodObject<{
    text: z.ZodString;
    icon_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text: string;
    icon_url?: string | undefined;
}, {
    text: string;
    icon_url?: string | undefined;
}>>;
export declare const DiscordEmbedImageSchema: z.ZodOptional<z.ZodObject<{
    url: z.ZodString;
    height: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    url: string;
    height?: number | undefined;
    width?: number | undefined;
}, {
    url: string;
    height?: number | undefined;
    width?: number | undefined;
}>>;
export declare const DiscordEmbedThumbnailSchema: z.ZodOptional<z.ZodObject<{
    url: z.ZodString;
    height: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    url: string;
    height?: number | undefined;
    width?: number | undefined;
}, {
    url: string;
    height?: number | undefined;
    width?: number | undefined;
}>>;
export declare const DiscordEmbedAuthorSchema: z.ZodOptional<z.ZodObject<{
    name: z.ZodString;
    url: z.ZodOptional<z.ZodString>;
    icon_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    icon_url?: string | undefined;
    url?: string | undefined;
}, {
    name: string;
    icon_url?: string | undefined;
    url?: string | undefined;
}>>;
export declare const DiscordEmbedFieldSchema: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
    inline: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    value: string;
    name: string;
    inline?: boolean | undefined;
}, {
    value: string;
    name: string;
    inline?: boolean | undefined;
}>;
export declare const DiscordEmbedSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodNumber>;
    footer: z.ZodOptional<z.ZodObject<{
        text: z.ZodString;
        icon_url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        icon_url?: string | undefined;
    }, {
        text: string;
        icon_url?: string | undefined;
    }>>;
    image: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        height: z.ZodOptional<z.ZodNumber>;
        width: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    }, {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    }>>;
    thumbnail: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        height: z.ZodOptional<z.ZodNumber>;
        width: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    }, {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    }>>;
    author: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        icon_url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        icon_url?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        icon_url?: string | undefined;
        url?: string | undefined;
    }>>;
    fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
        inline: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
        inline?: boolean | undefined;
    }, {
        value: string;
        name: string;
        inline?: boolean | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    timestamp?: string | undefined;
    color?: number | undefined;
    footer?: {
        text: string;
        icon_url?: string | undefined;
    } | undefined;
    image?: {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    thumbnail?: {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    author?: {
        name: string;
        icon_url?: string | undefined;
        url?: string | undefined;
    } | undefined;
    fields?: {
        value: string;
        name: string;
        inline?: boolean | undefined;
    }[] | undefined;
}, {
    url?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    timestamp?: string | undefined;
    color?: number | undefined;
    footer?: {
        text: string;
        icon_url?: string | undefined;
    } | undefined;
    image?: {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    thumbnail?: {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    author?: {
        name: string;
        icon_url?: string | undefined;
        url?: string | undefined;
    } | undefined;
    fields?: {
        value: string;
        name: string;
        inline?: boolean | undefined;
    }[] | undefined;
}>;
export declare const OpenAICompatibleEmbedFieldSchema: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
    inline: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    value: string;
    name: string;
    inline?: boolean | undefined;
}, {
    value: string;
    name: string;
    inline?: boolean | undefined;
}>;
export declare const OpenAICompatibleEmbedFooterSchema: z.ZodOptional<z.ZodObject<{
    text: z.ZodString;
    icon_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text: string;
    icon_url?: string | undefined;
}, {
    text: string;
    icon_url?: string | undefined;
}>>;
export declare const OpenAICompatibleEmbedImageSchema: z.ZodOptional<z.ZodObject<{
    url: z.ZodString;
    height: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    url: string;
    height?: number | undefined;
    width?: number | undefined;
}, {
    url: string;
    height?: number | undefined;
    width?: number | undefined;
}>>;
export declare const OpenAICompatibleEmbedThumbnailSchema: z.ZodOptional<z.ZodObject<{
    url: z.ZodString;
    height: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    url: string;
    height?: number | undefined;
    width?: number | undefined;
}, {
    url: string;
    height?: number | undefined;
    width?: number | undefined;
}>>;
export declare const OpenAICompatibleEmbedAuthorSchema: z.ZodOptional<z.ZodObject<{
    name: z.ZodString;
    url: z.ZodOptional<z.ZodString>;
    icon_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    icon_url?: string | undefined;
    url?: string | undefined;
}, {
    name: string;
    icon_url?: string | undefined;
    url?: string | undefined;
}>>;
export declare const OpenAICompatibleEmbedSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodNumber>;
    footer: z.ZodOptional<z.ZodObject<{
        text: z.ZodString;
        icon_url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        icon_url?: string | undefined;
    }, {
        text: string;
        icon_url?: string | undefined;
    }>>;
    image: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        height: z.ZodOptional<z.ZodNumber>;
        width: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    }, {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    }>>;
    thumbnail: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        height: z.ZodOptional<z.ZodNumber>;
        width: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    }, {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    }>>;
    author: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        icon_url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        icon_url?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        icon_url?: string | undefined;
        url?: string | undefined;
    }>>;
    fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
        inline: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
        inline?: boolean | undefined;
    }, {
        value: string;
        name: string;
        inline?: boolean | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    url?: string | undefined;
    description?: string | undefined;
    timestamp?: string | undefined;
    color?: number | undefined;
    footer?: {
        text: string;
        icon_url?: string | undefined;
    } | undefined;
    image?: {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    thumbnail?: {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    author?: {
        name: string;
        icon_url?: string | undefined;
        url?: string | undefined;
    } | undefined;
    fields?: {
        value: string;
        name: string;
        inline?: boolean | undefined;
    }[] | undefined;
}, {
    title: string;
    url?: string | undefined;
    description?: string | undefined;
    timestamp?: string | undefined;
    color?: number | undefined;
    footer?: {
        text: string;
        icon_url?: string | undefined;
    } | undefined;
    image?: {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    thumbnail?: {
        url: string;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    author?: {
        name: string;
        icon_url?: string | undefined;
        url?: string | undefined;
    } | undefined;
    fields?: {
        value: string;
        name: string;
        inline?: boolean | undefined;
    }[] | undefined;
}>;
export declare const SendMessageParamsSchema: z.ZodObject<{
    webhookUrl: z.ZodString;
    content: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    webhookUrl: string;
    content: string;
    username?: string | undefined;
    avatarUrl?: string | undefined;
}, {
    webhookUrl: string;
    content: string;
    username?: string | undefined;
    avatarUrl?: string | undefined;
}>;
export declare const SendEmbedParamsSchema: z.ZodObject<{
    webhookUrl: z.ZodString;
    embeds: z.ZodArray<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodNumber>;
        footer: z.ZodOptional<z.ZodObject<{
            text: z.ZodString;
            icon_url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            icon_url?: string | undefined;
        }, {
            text: string;
            icon_url?: string | undefined;
        }>>;
        image: z.ZodOptional<z.ZodObject<{
            url: z.ZodString;
            height: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        }, {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        }>>;
        thumbnail: z.ZodOptional<z.ZodObject<{
            url: z.ZodString;
            height: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        }, {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        }>>;
        author: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            icon_url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            icon_url?: string | undefined;
            url?: string | undefined;
        }, {
            name: string;
            icon_url?: string | undefined;
            url?: string | undefined;
        }>>;
        fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
            inline: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            name: string;
            inline?: boolean | undefined;
        }, {
            value: string;
            name: string;
            inline?: boolean | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        timestamp?: string | undefined;
        color?: number | undefined;
        footer?: {
            text: string;
            icon_url?: string | undefined;
        } | undefined;
        image?: {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        } | undefined;
        thumbnail?: {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        } | undefined;
        author?: {
            name: string;
            icon_url?: string | undefined;
            url?: string | undefined;
        } | undefined;
        fields?: {
            value: string;
            name: string;
            inline?: boolean | undefined;
        }[] | undefined;
    }, {
        url?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        timestamp?: string | undefined;
        color?: number | undefined;
        footer?: {
            text: string;
            icon_url?: string | undefined;
        } | undefined;
        image?: {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        } | undefined;
        thumbnail?: {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        } | undefined;
        author?: {
            name: string;
            icon_url?: string | undefined;
            url?: string | undefined;
        } | undefined;
        fields?: {
            value: string;
            name: string;
            inline?: boolean | undefined;
        }[] | undefined;
    }>, "many">;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
    autoFormat: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    autoFormatPrompt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    webhookUrl: string;
    embeds: {
        url?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        timestamp?: string | undefined;
        color?: number | undefined;
        footer?: {
            text: string;
            icon_url?: string | undefined;
        } | undefined;
        image?: {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        } | undefined;
        thumbnail?: {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        } | undefined;
        author?: {
            name: string;
            icon_url?: string | undefined;
            url?: string | undefined;
        } | undefined;
        fields?: {
            value: string;
            name: string;
            inline?: boolean | undefined;
        }[] | undefined;
    }[];
    autoFormat: boolean;
    title?: string | undefined;
    description?: string | undefined;
    content?: string | undefined;
    username?: string | undefined;
    avatarUrl?: string | undefined;
    autoFormatPrompt?: string | undefined;
}, {
    webhookUrl: string;
    embeds: {
        url?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        timestamp?: string | undefined;
        color?: number | undefined;
        footer?: {
            text: string;
            icon_url?: string | undefined;
        } | undefined;
        image?: {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        } | undefined;
        thumbnail?: {
            url: string;
            height?: number | undefined;
            width?: number | undefined;
        } | undefined;
        author?: {
            name: string;
            icon_url?: string | undefined;
            url?: string | undefined;
        } | undefined;
        fields?: {
            value: string;
            name: string;
            inline?: boolean | undefined;
        }[] | undefined;
    }[];
    title?: string | undefined;
    description?: string | undefined;
    content?: string | undefined;
    username?: string | undefined;
    avatarUrl?: string | undefined;
    autoFormat?: boolean | undefined;
    autoFormatPrompt?: string | undefined;
}>;
export type SendMessageArgs = z.infer<typeof SendMessageParamsSchema>;
export type SendEmbedArgs = z.infer<typeof SendEmbedParamsSchema>;
