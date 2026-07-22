"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   AI Client
   Version : 2.0.0

   Responsibilities

   • Build AI request payloads
   • Execute API requests
   • Parse AI responses
   • Handle network failures
   • Handle API errors
   • Support future streaming
   • Keep API layer isolated

   ========================================================================== */

const DEFAULT_TIMEOUT = 60000;

const DEFAULT_OPTIONS = Object.freeze({

    temperature: 0.8,

    top_p: 0.9,

    max_tokens: 2048,

    frequency_penalty: 0.2,

    presence_penalty: 0.1

});

const AIClient = {

    /* ==============================================================
       Public API
       ============================================================== */

    async generate(prompt, apiKey, options = {}) {

        this.validatePrompt(prompt);

        this.validateApiKey(apiKey);

        const payload = this.buildPayload(

            prompt,

            options

        );

        return this.sendRequest(

            payload,

            apiKey

        );

    },

    /* ==============================================================
       Validation
       ============================================================== */

    validatePrompt(prompt) {

        if (

            typeof prompt !== "string" ||

            !prompt.trim()

        ) {

            throw new Error(

                "Prompt is required."

            );

        }

    },

    validateApiKey(apiKey) {

        if (

            typeof apiKey !== "string" ||

            !apiKey.trim()

        ) {

            throw new Error(

                "API key not configured."

            );

        }

    },

    /* ==============================================================
       Payload Builder
       ============================================================== */

    buildPayload(prompt, options = {}) {

        const config = {

            ...DEFAULT_OPTIONS,

            ...options

        };

        return {

            model:

                VW_CONFIG.API.MODEL,

            messages: [

                {

                    role: "system",

                    content:
                    "You are VIDHWAAN AI Writer, a world-class professional content creation engine. Create high-quality human-like content following the user's requirements."

                },

                {

                    role: "user",

                    content: prompt.trim()

                }

            ],

            temperature:

                config.temperature,

            top_p:

                config.top_p,

            max_tokens:

                config.max_tokens,

            frequency_penalty:

                config.frequency_penalty,

            presence_penalty:

                config.presence_penalty

        };

    },

    /* ==============================================================
       Request
       ============================================================== */

    async sendRequest(payload, apiKey) {

        const controller = new AbortController();

        const timeout = setTimeout(() => {

            controller.abort();

        }, DEFAULT_TIMEOUT);

        try {

            const response = await fetch(

                VW_CONFIG.API.BASE_URL +
                VW_CONFIG.API.CHAT_ENDPOINT,

                {

                    method: "POST",

                    signal: controller.signal,

                    cache: "no-store",

                    headers: {

                        "Content-Type": "application/json",

                        "Authorization": `Bearer ${apiKey.trim()}`

                    },

                    body: JSON.stringify(payload)

                }

            );

            clearTimeout(timeout);

            if (!response.ok) {

                throw await this.parseError(response);

            }

            return await this.parseResponse(response);

        }

        catch (error) {

            clearTimeout(timeout);

            if (error.name === "AbortError") {

                throw new Error(

                    "Request timed out. Please try again."

                );

            }

            if (error instanceof TypeError) {

                throw new Error(

                    "Unable to connect to AI service."

                );

            }

            throw error;

        }

    },

    /* ==============================================================
       Response Parser
       ============================================================== */

    async parseResponse(response) {

        let json;

        try {

            json = await response.json();

        }

        catch {

            throw new Error(

                "Invalid AI server response."

            );

        }

        const content =

            json?.choices?.[0]?.message?.content;

        if (

            typeof content !== "string" ||

            !content.trim()

        ) {

            throw new Error(

                "AI returned an empty response."

            );

        }

        return content.trim();

    },

    /* ==============================================================
       Error Parser
       ============================================================== */

    async parseError(response) {

        let message = `HTTP ${response.status}`;

        try {

            const json = await response.json();

            message =
                json?.error?.message ||
                json?.message ||
                message;

        }

        catch {

            /* Ignore invalid error payload */

        }

        switch (response.status) {

            case 400:

                return new Error(
                    "Invalid request."
                );

            case 401:

                return new Error(
                    "Invalid API key."
                );

            case 403:

                return new Error(
                    "Access denied."
                );

            case 404:

                return new Error(
                    "AI service unavailable."
                );

            case 408:

                return new Error(
                    "Request timed out."
                );

            case 413:

                return new Error(
                    "Prompt is too large. Reduce the content and try again."
                );

            case 422:

                return new Error(
                    "Unable to process the request."
                );

            case 429:

                return new Error(
                    "Rate limit reached. Please wait and try again."
                );

            case 500:
            case 502:
            case 503:
            case 504:

                return new Error(
                    "AI service is temporarily unavailable."
                );

            default:

                return new Error(message);

        }

    },

    /* ==============================================================
       Utilities
       ============================================================== */

    getDefaultOptions() {

        return {

            ...DEFAULT_OPTIONS

        };

    }

};

/* ==========================================================================
   Freeze
   ========================================================================== */

Object.freeze(AIClient);

/* ==========================================================================
   Export
   ========================================================================== */

export default AIClient;
