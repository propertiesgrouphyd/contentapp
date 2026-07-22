"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Prompt Builder
   Version : 2.0.0

   AI Instruction Engine

   Responsibilities

   • Build compact high-quality prompts
   • Convert UI selections into AI instructions
   • Minimize prompt tokens
   • Improve reasoning quality
   • Keep prompts model-agnostic

   ========================================================================== */

const PromptBuilder = {

    /* ==============================================================
       Public API
       ============================================================== */

    build(input = {}) {

        const values = input.values || input;
        const context = input.context || {};

        const sections = [

            this.buildMission(),

            this.buildUserIntent(values, context),

            this.buildWritingStrategy(),

            this.buildFormattingRules(),

            this.buildQualityReview(),

            this.buildUserRequest(values)

        ].filter(Boolean);

        return sections.join("\n\n");

    },

    /* ==============================================================
       Helpers
       ============================================================== */

    normalize(value, fallback = "") {

        return String(value || "")
            .trim() || fallback;

    },

    getTopic(values) {

        if (!values) {

            return "";

        }

        if (values.topic === "custom-topic") {

            return this.normalize(
                values.customTopic
            );

        }

        return this.normalize(
            values.topic
        );

    },

    addInstruction(list, instruction) {

        if (!instruction) {

            return;

        }

        const text = String(instruction).trim();

        if (!text) {

            return;

        }

        if (!list.includes(text)) {

            list.push(text);

        }

    },

    section(title, items) {

        if (!items.length) {

            return "";

        }

        return [

            title,

            "",

            ...items

        ].join("\n");

    },

    /* ==============================================================
       Mission
       ============================================================== */

    buildMission() {

        return [

            "MISSION",

            "",

            "Create exceptional human-quality content.",

            "Fully satisfy the user's objective.",

            "Think before writing.",

            "Understand all user selections together.",

            "Determine the best writing strategy before generating content.",

            "Write naturally like an experienced human professional.",

            "Return only the final polished content."

        ].join("\n");

    },

    /* ==============================================================
       User Intent
       ============================================================== */

    buildUserIntent(values = {}, context = {}) {

        const instructions = [];

        const purpose = context.purpose;
        const category = context.category;
        const topic = context.topic;
        const goal = context.goal;
        const style = context.contentStyle;
        const tone = context.tone;
        const audience = context.audience;
        const length = context.length;
        const platform = context.platform;
        const language = context.language;
        const creativity = context.creativity;
        const emoji = context.emoji;
        const cta = context.cta;

        /* ----------------------------------------------------------
           Purpose
           ---------------------------------------------------------- */

        if (purpose) {

            this.addInstruction(

                instructions,

                `Primary objective: ${purpose.label}.`

            );

            if (purpose.description) {

                this.addInstruction(

                    instructions,

                    purpose.description

                );

            }

        }

        /* ----------------------------------------------------------
           Category
           ---------------------------------------------------------- */

        if (category) {

            this.addInstruction(

                instructions,

                `Focus exclusively on ${category.label}.`

            );

            if (category.description) {

                this.addInstruction(

                    instructions,

                    category.description

                );

            }

        }

        /* ----------------------------------------------------------
           Topic
           ---------------------------------------------------------- */

        const selectedTopic = this.getTopic(values);

        if (selectedTopic) {

            this.addInstruction(

                instructions,

                `The entire content must remain focused on "${selectedTopic}".`

            );

        }

        if (topic?.description) {

            this.addInstruction(

                instructions,

                topic.description

            );

        }

        /* ----------------------------------------------------------
           Goal
           ---------------------------------------------------------- */

        if (goal) {

            this.addInstruction(

                instructions,

                `Primary goal: ${goal.label}.`

            );

            if (goal.description) {

                this.addInstruction(

                    instructions,

                    goal.description

                );

            }

        }

        /* ----------------------------------------------------------
           Content Style
           ---------------------------------------------------------- */

        if (style) {

            this.addInstruction(

                instructions,

                `Writing style: ${style.label}.`

            );

            if (style.description) {

                this.addInstruction(

                    instructions,

                    style.description

                );

            }

        }

        /* ----------------------------------------------------------
           Tone
           ---------------------------------------------------------- */

        if (tone) {

            this.addInstruction(

                instructions,

                `Maintain a ${tone.label.toLowerCase()} tone throughout.`

            );

            if (tone.description) {

                this.addInstruction(

                    instructions,

                    tone.description

                );

            }

        }

        return this.section(

            "USER INTENT",

            instructions

        );

    },
    /* ==============================================================
       Writing Strategy
       ============================================================== */

    buildWritingStrategy() {

        return [

            "WRITING STRATEGY",

            "",

            "Before writing, determine the best approach automatically.",

            "Choose the most effective structure for the requested content.",

            "Create a strong opening that immediately captures attention.",

            "Maintain a logical flow from beginning to end.",

            "Expand important ideas sufficiently without unnecessary repetition.",

            "Use clear transitions between sections.",

            "Support explanations with practical examples whenever beneficial.",

            "Prefer clarity over complexity.",

            "Keep every sentence purposeful.",

            "Remove filler, redundancy and generic statements.",

            "Adapt naturally to the user's objective, audience and platform."

        ].join("\n");

    },

    /* ==============================================================
       Formatting Rules
       ============================================================== */

    buildFormattingRules() {

        return [

            "FORMATTING",

            "",

            "Optimize readability for both desktop and mobile.",

            "Keep paragraphs short.",

            "Normally use 1–3 sentences per paragraph.",

            "Separate ideas with appropriate spacing.",

            "Avoid large blocks of text.",

            "Use headings only when they improve clarity.",

            "Use bullet lists only when they improve understanding.",

            "Use numbered steps when sequence matters.",

            "Use tables only when comparison is beneficial.",

            "Use checklists, FAQs, timelines, quotes or examples only when they genuinely improve the content.",

            "Never force formatting.",

            "Let the content determine the presentation."

        ].join("\n");

    },

    /* ==============================================================
       Quality Review
       ============================================================== */

    buildQualityReview() {

        return [

            "FINAL REVIEW",

            "",

            "Before returning the response, silently review and improve the content.",

            "Check factual consistency.",

            "Improve clarity and readability.",

            "Correct grammar and punctuation.",

            "Improve sentence flow.",

            "Remove repetitive wording.",

            "Strengthen weak sections.",

            "Ensure the writing sounds natural and human.",

            "Ensure every paragraph provides value.",

            "Return only the final polished content.",

            "Do not explain your reasoning."

        ].join("\n");

    },


    /* ==============================================================
       User Request
       ============================================================== */

    buildUserRequest(values = {}) {

        const lines = [];

        const topic = this.getTopic(values);

        lines.push("USER REQUEST");
        lines.push("");

        if (topic) {

            lines.push(`Topic: ${topic}`);

        }

        if (values.instructions) {

            lines.push("");
            lines.push("Additional Instructions:");
            lines.push(values.instructions.trim());

        }

        if (values.keywords) {

            lines.push("");
            lines.push(`Keywords: ${values.keywords}`);

        }

        return lines.join("\n");

    }

};

/* ==========================================================================
   Export
   ========================================================================== */

Object.freeze(PromptBuilder);

export default PromptBuilder;
   
