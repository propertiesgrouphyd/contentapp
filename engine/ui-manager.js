"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   UI Manager
   Version : 2.0.0

   Responsibilities

   • Cache DOM elements
   • Initialize dropdowns
   • Handle cascading dropdowns
   • Return form values
   • Build rich selection context
   • Never manipulate business logic

   ========================================================================== */

import DropdownManager from "./dropdown-manager.js";
import DataManager from "./data-manager.js";

/* ==========================================================================
   DOM Cache
   ========================================================================== */

const UI = Object.create(null);

/* ==========================================================================
   Internal Helpers
   ========================================================================== */

function $(id) {

    return document.getElementById(id);

}

function cacheDOM() {

    UI.purpose = $("vw-purpose");

    UI.category = $("vw-category");

    UI.topic = $("vw-topic");

    UI.customTopic = $("vw-custom-topic");

    UI.customTopicWrapper = $("vw-custom-topic-wrapper");

    UI.goal = $("vw-goal");

    UI.contentStyle = $("vw-style");

    UI.tone = $("vw-tone");

    UI.audience = $("vw-audience");

    UI.length = $("vw-length");

    UI.platform = $("vw-platform");

    UI.language = $("vw-language");

    UI.creativity = $("vw-creativity");

    UI.emoji = $("vw-emoji");

    UI.cta = $("vw-cta");

}

function ensureDOM() {

    if (!UI.purpose) {

        cacheDOM();

    }

}

/* ==========================================================================
   Dropdown Initialization
   ========================================================================== */

function initializeDropdowns() {

    ensureDOM();

    DropdownManager.populatePurposes(
        UI.purpose
    );

    DropdownManager.clearCategories(
        UI.category
    );

    DropdownManager.clearTopics(
        UI.topic
    );

    DropdownManager.populateGoals(
        UI.goal
    );

    DropdownManager.populateContentStyles(
        UI.contentStyle
    );

    DropdownManager.populateTones(
        UI.tone
    );

    DropdownManager.populateAudiences(
        UI.audience
    );

    DropdownManager.populateLengths(
        UI.length
    );

    DropdownManager.populatePlatforms(
        UI.platform
    );

    DropdownManager.populateLanguages(
        UI.language
    );

    DropdownManager.populateCreativity(
        UI.creativity
    );

    DropdownManager.populateEmojis(
        UI.emoji
    );

    DropdownManager.populateCTAs(
        UI.cta
    );

    if (UI.customTopicWrapper) {

        UI.customTopicWrapper.hidden = true;

    }

    setupCascade();

}

/* ==========================================================================
   Cascading Dropdowns
   ========================================================================== */

function setupCascade() {

    ensureDOM();

    /* ==========================================================
       Purpose → Category
       ========================================================== */

    if (UI.purpose) {

        UI.purpose.addEventListener("change", onPurposeChange);

    }

    /* ==========================================================
       Category → Topic
       ========================================================== */

    if (UI.category) {

        UI.category.addEventListener("change", onCategoryChange);

    }

    /* ==========================================================
       Topic → Custom Topic
       ========================================================== */

    if (UI.topic) {

        UI.topic.addEventListener("change", onTopicChange);

    }

}

/* ==========================================================================
   Event Handlers
   ========================================================================== */

function onPurposeChange() {

    DropdownManager.populateCategoriesByPurpose(

        UI.category,

        UI.purpose.value

    );

    DropdownManager.clearTopics(

        UI.topic

    );

    hideCustomTopic();

}

function onCategoryChange() {

    DropdownManager.populateTopicsByCategory(

        UI.topic,

        UI.category.value

    );

    hideCustomTopic();

}

function onTopicChange() {

    if (!UI.customTopicWrapper) {

        return;

    }

    const isCustom =

        UI.topic.value === "custom-topic";

    UI.customTopicWrapper.hidden = !isCustom;

    if (!isCustom && UI.customTopic) {

        UI.customTopic.value = "";

    }

}

/* ==========================================================================
   Helpers
   ========================================================================== */

function hideCustomTopic() {

    if (UI.customTopicWrapper) {

        UI.customTopicWrapper.hidden = true;

    }

    if (UI.customTopic) {

        UI.customTopic.value = "";

    }

}

/* ==========================================================================
   Form Values
   ========================================================================== */

function getValues() {

    ensureDOM();

    const topic =

        UI.topic?.value === "custom-topic"

            ? (UI.customTopic?.value || "").trim()

            : (UI.topic?.value || "");

    return {

        purpose: UI.purpose?.value || "",

        category: UI.category?.value || "",

        topic,

        customTopic: (UI.customTopic?.value || "").trim(),

        goal: UI.goal?.value || "",

        contentStyle: UI.contentStyle?.value || "",

        tone: UI.tone?.value || "",

        audience: UI.audience?.value || "",

        length: UI.length?.value || "",

        platform: UI.platform?.value || "",

        language: UI.language?.value || "",

        creativity: UI.creativity?.value || "",

        emoji: UI.emoji?.value || "",

        cta: UI.cta?.value || ""

    };

}

/* ==========================================================================
   Rich Selection Context
   ========================================================================== */

function getSelectionContext() {

    const values = getValues();

    return {

        values,

        context: DataManager.getSelectionContext(values)

    };

}

/* ==========================================================================
   Utility Methods
   ========================================================================== */

function resetForm() {

    ensureDOM();

    const controls = [

        UI.purpose,
        UI.category,
        UI.topic,
        UI.goal,
        UI.contentStyle,
        UI.tone,
        UI.audience,
        UI.length,
        UI.platform,
        UI.language,
        UI.creativity,
        UI.emoji,
        UI.cta

    ];

    controls.forEach(control => {

        if (control) {

            control.selectedIndex = 0;

        }

    });

    if (UI.customTopic) {

        UI.customTopic.value = "";

    }

    hideCustomTopic();

    DropdownManager.clearCategories(

        UI.category

    );

    DropdownManager.clearTopics(

        UI.topic

    );

}

/* ==========================================================================
   Debug
   ========================================================================== */

function logSummary() {

    if (

        typeof location !== "undefined" &&

        (

            location.hostname === "localhost" ||

            location.hostname === "127.0.0.1"

        )

    ) {

        console.group("VIDHWAAN AI Writer - UI Manager");

        console.log("UI Elements", UI);

        console.log("Current Values", getValues());

        console.groupEnd();

    }

}

/* ==========================================================================
   Initialize
   ========================================================================== */

function initialize() {

    cacheDOM();

    initializeDropdowns();

    logSummary();

}

/* ==========================================================================
   Exports
   ========================================================================== */

export {

    UI,

    initialize,

    initializeDropdowns,

    getValues,

    getSelectionContext,

    resetForm

};






