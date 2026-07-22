"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Data Manager
   Version : 2.0.0

   Central access layer for all application data.

   Responsibilities

   • Provide access to all data libraries
   • Filter dependent dropdown data
   • Lookup individual items
   • Build rich selection context for PromptBuilder
   • Never mutate source data

   ========================================================================== */

import * as data from "../data/index.js";

/* ==========================================================================
   Internal Helpers
   ========================================================================== */

function safeArray(value) {

    return Array.isArray(value)
        ? value
        : [];

}

function findById(collection, id) {

    if (!id) {
        return null;
    }

    return collection.find(item => item.id === id) || null;

}

function uniqueById(items) {

    return items.filter(

        (item, index, array) =>

            index === array.findIndex(
                x => x.id === item.id
            )

    );

}

function clone(item) {

    return item
        ? { ...item }
        : null;

}

/* ==========================================================================
   Data Manager
   ========================================================================== */

const DataManager = {

    /* ==============================================================
       Libraries
       ============================================================== */

    getPurposes() {

        return safeArray(data.purposes);

    },

    getCategories() {

        return safeArray(data.categories);

    },

    getTopics() {

        return safeArray(data.topics);

    },

    getGoals() {

        return safeArray(data.goals);

    },

    getContentStyles() {

        return safeArray(data.contentStyles);

    },

    getTones() {

        return safeArray(data.tones);

    },

    getAudiences() {

        return safeArray(data.audiences);

    },

    getLengths() {

        return safeArray(data.lengths);

    },

    getPlatforms() {

        return safeArray(data.platforms);

    },

    getLanguages() {

        return safeArray(data.languages);

    },

    getCreativityLevels() {

        return safeArray(data.creativity);

    },

    getEmojiOptions() {

        return safeArray(data.emojis);

    },

    getCTAOptions() {

        return safeArray(data.ctas);

    },

    /* ==============================================================
       Dependent Data
       ============================================================== */

    getCategoriesByPurpose(purposeId) {

        if (!purposeId) {

            return [];

        }

        return this
            .getCategories()
            .filter(category => category.purpose === purposeId);

    },

    getTopicsByCategory(categoryId) {

        if (!categoryId) {

            return [];

        }

        return uniqueById(

            this
                .getTopics()
                .filter(topic => topic.category === categoryId)

        );

    },

    /* ==============================================================
       Individual Lookups
       ============================================================== */

    getPurpose(id) {

        return findById(

            this.getPurposes(),
            id

        );

    },

    getCategory(id) {

        return findById(

            this.getCategories(),
            id

        );

    },

    getTopic(id) {

        return findById(

            this.getTopics(),
            id

        );

    },

    getGoal(id) {

        return findById(

            this.getGoals(),
            id

        );

    },

    getContentStyle(id) {

        return findById(

            this.getContentStyles(),
            id

        );

    },

    getTone(id) {

        return findById(

            this.getTones(),
            id

        );

    },

    getAudience(id) {

        return findById(

            this.getAudiences(),
            id

        );

    },

    getLength(id) {

        return findById(

            this.getLengths(),
            id

        );

    },

    getPlatform(id) {

        return findById(

            this.getPlatforms(),
            id

        );

    },

    getLanguage(id) {

        return findById(

            this.getLanguages(),
            id

        );

    },

    getCreativity(id) {

        return findById(

            this.getCreativityLevels(),
            id

        );

    },

    getEmoji(id) {

        return findById(

            this.getEmojiOptions(),
            id

        );

    },

    getCTA(id) {

        return findById(

            this.getCTAOptions(),
            id

        );

    },

    /* ==============================================================
       Rich Selection Context
       ============================================================== */

    getSelectionContext(values = {}) {

        return Object.freeze({

            purpose: clone(
                this.getPurpose(values.purpose)
            ),

            category: clone(
                this.getCategory(values.category)
            ),

            topic: clone(
                this.getTopic(values.topic)
            ),

            goal: clone(
                this.getGoal(values.goal)
            ),

            contentStyle: clone(
                this.getContentStyle(values.contentStyle)
            ),

            tone: clone(
                this.getTone(values.tone)
            ),

            audience: clone(
                this.getAudience(values.audience)
            ),

            length: clone(
                this.getLength(values.length)
            ),

            platform: clone(
                this.getPlatform(values.platform)
            ),

            language: clone(
                this.getLanguage(values.language)
            ),

            creativity: clone(
                this.getCreativity(values.creativity)
            ),

            emoji: clone(
                this.getEmoji(values.emoji)
            ),

            cta: clone(
                this.getCTA(values.cta)
            )

        });

    },

    /* ==============================================================
       Validation
       ============================================================== */

    isValidPurpose(id) {

        return !!this.getPurpose(id);

    },

    isValidCategory(id) {

        return !!this.getCategory(id);

    },

    isValidTopic(id) {

        return !!this.getTopic(id);

    },

    isValidGoal(id) {

        return !!this.getGoal(id);

    },

    isValidContentStyle(id) {

        return !!this.getContentStyle(id);

    },

    isValidTone(id) {

        return !!this.getTone(id);

    },

    isValidAudience(id) {

        return !!this.getAudience(id);

    },

    isValidLength(id) {

        return !!this.getLength(id);

    },

    isValidPlatform(id) {

        return !!this.getPlatform(id);

    },

    isValidLanguage(id) {

        return !!this.getLanguage(id);

    },

    isValidCreativity(id) {

        return !!this.getCreativity(id);

    },

    isValidEmoji(id) {

        return !!this.getEmoji(id);

    },

    isValidCTA(id) {

        return !!this.getCTA(id);

    },

    /* ==============================================================
       Statistics
       ============================================================== */

    getCounts() {

        return Object.freeze({

            purposes: this.getPurposes().length,

            categories: this.getCategories().length,

            topics: this.getTopics().length,

            goals: this.getGoals().length,

            contentStyles: this.getContentStyles().length,

            tones: this.getTones().length,

            audiences: this.getAudiences().length,

            lengths: this.getLengths().length,

            platforms: this.getPlatforms().length,

            languages: this.getLanguages().length,

            creativity: this.getCreativityLevels().length,

            emojis: this.getEmojiOptions().length,

            ctas: this.getCTAOptions().length

        });

    },

    /* ==============================================================
       Debug
       ============================================================== */

    logSummary() {

        if (
            typeof location !== "undefined" &&
            (
                location.hostname === "localhost" ||
                location.hostname === "127.0.0.1"
            )
        ) {

            console.group("VIDHWAAN AI Writer - Data Manager");

            console.table(this.getCounts());

            console.groupEnd();

        }

    }

};

/* ==========================================================================
   Freeze
   ========================================================================== */

Object.freeze(DataManager);

/* ==========================================================================
   Development Summary
   ========================================================================== */

DataManager.logSummary();

/* ==========================================================================
   Export
   ========================================================================== */

export default DataManager;
   
   

