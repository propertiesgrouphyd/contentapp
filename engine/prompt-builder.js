"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Prompt Builder
   Version : 3.0.0

   AI Instruction Engine

   Responsibilities

   • Convert complete user selections into AI instructions
   • Use selection metadata intelligently
   • Generate premium human-quality content
   • Maintain global professional standards
   • Keep prompts efficient and model-agnostic

   ========================================================================== */

const PromptBuilder = {

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



    normalize(value, fallback = "") {

        return String(value || "").trim() || fallback;

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



    addContextInstruction(list, title, item) {

        if (!item) {

            return;

        }


        this.addInstruction(

            list,

            `${title}: ${item.label || ""}`

        );


        if (item.description) {

            this.addInstruction(

                list,

                item.description

            );

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



    buildMission() {

        return [

            "MISSION",

            "",

            "Create exceptional human-quality content.",

            "Understand the complete user intent before writing.",

            "Use every selected requirement intelligently.",

            "Think like an expert writer, editor, strategist, and subject specialist.",

            "Return only the final polished content."

        ].join("\n");

    },



    buildUserIntent(values = {}, context = {}) {

        const instructions = [];


        this.addContextInstruction(

            instructions,

            "Purpose",

            context.purpose

        );


        this.addContextInstruction(

            instructions,

            "Category",

            context.category

        );


        const topic = this.getTopic(values);


        if (topic) {

            this.addInstruction(

                instructions,

                `Topic focus: ${topic}`

            );

        }


        this.addContextInstruction(

            instructions,

            "Goal",

            context.goal

        );


        this.addContextInstruction(

            instructions,

            "Content Style",

            context.contentStyle

        );


        this.addContextInstruction(

            instructions,

            "Tone",

            context.tone

        );


        this.addContextInstruction(

            instructions,

            "Audience",

            context.audience

        );


        this.addContextInstruction(

            instructions,

            "Length",

            context.length

        );


        this.addContextInstruction(

            instructions,

            "Platform",

            context.platform

        );


        this.addContextInstruction(

            instructions,

            "Language",

            context.language

        );


        this.addContextInstruction(

            instructions,

            "Creativity Level",

            context.creativity

        );


        this.addContextInstruction(

            instructions,

            "Emoji Preference",

            context.emoji

        );


        this.addContextInstruction(

            instructions,

            "Call To Action",

            context.cta

        );


        return this.section(

            "USER INTENT",

            instructions

        );

    },



    buildWritingStrategy() {

        return [

            "WRITING STRATEGY",

            "",

            "Determine the best approach automatically.",

            "Choose the most effective structure for the requested content.",

            "Match the writing style to the selected audience and platform.",

            "Create valuable, original, and useful content.",

            "Use practical examples when they improve understanding.",

            "Avoid filler, repetition, and generic statements.",

            "Make every sentence meaningful."

        ].join("\n");

    },



    buildFormattingRules() {

        return [

            "FORMATTING",

            "",

            "Create an excellent reading experience.",

            "Use short readable paragraphs.",

            "Avoid large text blocks.",

            "Use headings when useful.",

            "Use bullet points when information is list-based.",

            "Use numbered steps when sequence matters.",

            "Use tables only for meaningful comparisons.",

            "Use examples, FAQs, timelines, or checklists only when they improve clarity.",

            "Let the content decide the structure."

        ].join("\n");

    },



    buildQualityReview() {

        return [

            "FINAL REVIEW",

            "",

            "Before returning content silently improve:",

            "- Accuracy",

            "- Grammar",

            "- Clarity",

            "- Structure",

            "- Readability",

            "- Professional quality",

            "- Human writing quality",

            "",

            "Return only the final content.",

            "Do not explain reasoning."

        ].join("\n");

    },



    buildUserRequest(values = {}) {

        const lines = [];


        const topic = this.getTopic(values);


        lines.push("USER REQUEST");


        lines.push("");



        if (topic) {

            lines.push(

                `Topic: ${topic}`

            );

        }


        if (values.instructions) {

            lines.push("");

            lines.push(

                "Additional Instructions:"

            );


            lines.push(

                values.instructions.trim()

            );

        }


        if (values.keywords) {

            lines.push("");

            lines.push(

                `Keywords: ${values.keywords}`

            );

        }


        return lines.join("\n");

    }


};


Object.freeze(PromptBuilder);


export default PromptBuilder;
