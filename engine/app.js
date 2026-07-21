"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Application Controller
   Global Production Build
   ========================================================================== */

import {
    initializeDropdowns,
    getValues
} from "./ui-manager.js";

import Storage from "./storage.js";
import SubscriptionManager from "./subscription-manager.js";
import AIClient from "./ai-client.js";
import PromptBuilder from "./prompt-builder.js";
import ContentRenderer from "./content-renderer.js";
import * as OutputRenderer from "./output-renderer.js";
import PWAManager from "./pwa-manager.js";
import EditorManager from "./editor-manager.js";
import PDFExporter from "./pdf-exporter.js";

const App = {

    elements: {},

    state: {

        generating: false,

        subscription: null

    },

    async init() {

        this.cacheElements();

        initializeDropdowns();

        this.restoreApiKey();

        this.bindEvents();

        PWAManager.init();

        EditorManager.init();

        this.refreshSubscriptionUI();

        this.updateStatus(
            "Ready"
        );

    },

    cacheElements() {

        const $ = id => document.getElementById(id);

        this.elements = {

            form: $("vw-generator-form"),

            generateButton: $("vw-generate-btn"),

            paymentButton: $("vw-payment-btn"),

            paymentCancelButton: $("vw-payment-cancel-btn"),

            paymentCloseButton: $("vw-payment-close-btn"),

            paymentModal: $("vw-payment-modal"),

            subscriptionButton: $("vw-subscription-btn"),

            subscriptionStatus: $("vw-subscription-status"),

            appStatus: $("vw-app-status"),

            apiModal: $("vw-api-modal"),

            apiInput: $("vw-api-key"),

            apiSaveButton: $("vw-save-api-btn"),

            apiLinkButton: $("vw-api-link-btn"),

            copyButton: $("vw-copy-btn"),

            regenerateButton: $("vw-regenerate-btn"),

            clearButton: $("vw-clear-btn"),

            pdfButton: $("vw-pdf-btn"),

            wordCount: $("vw-word-count"),

            characterCount: $("vw-character-count")

        };

    },

    bindEvents() {

        const e = this.elements;

        if (e.form) {

            e.form.addEventListener(

                "submit",

                this.generate.bind(this)

            );

        }

        if (e.subscriptionButton) {

            e.subscriptionButton.addEventListener(

                "click",

                async () => {

                    const sub = await SubscriptionManager.check();

                    if (sub.active) {

                        this.showToast( "Subscription already active." );
                        return;

                    }

                    if (this.state.generating) {

                        return;

                    }

                    this.showModal(
                        e.paymentModal
                    );

                }

            );

        }

        if (e.paymentButton) {

            e.paymentButton.addEventListener(

                "click",

                () => {


                    window.location.href =
                        "https://create.vidhwaan.com/payment";


                }

            );

        }


        if (e.paymentCancelButton) {

            e.paymentCancelButton.addEventListener(

                "click",

                () => {

                    this.hideModal(
                        e.paymentModal
                    );

                }

            );

        }

        if (e.paymentCloseButton) {

            e.paymentCloseButton.addEventListener(

                "click",

                () => {

                    this.hideModal(
                        e.paymentModal
                    );

                }

            );

        }



        if (e.copyButton) {

            e.copyButton.addEventListener(

                "click",

                async () => {

                    const copied =

                        await OutputRenderer.copy();

                    if (copied) {

                        this.updateStatus("Copied");

                        this.showToast(
                            "Copied"
                        );

                    }

                }

            );

        }

        if (e.clearButton) {

            e.clearButton.addEventListener(

                "click",

                () => {


                    EditorManager.reset();

                    OutputRenderer.clear();

                    this.updateWordCount("");

                    this.updateStatus("Ready");

                }

            );

        }



        if (e.pdfButton) {

            e.pdfButton.addEventListener(

                "click",

                async()=>{

                    try {

                        await PDFExporter.download();

                        this.updateStatus(
                            "PDF Downloaded"
                        );

                    }

                    catch(error){

                        console.error(
                            "PDF error:",
                            error
                        );

                        this.showToast(
                            "PDF creation failed."
                        );

                    }

                }

            );

        }



        if (e.regenerateButton) {

            e.regenerateButton.addEventListener(

                "click",

                () => {

                    if (!this.state.generating) {

                        e.form?.requestSubmit();

                    }

                }

            );

        }

        if (e.apiLinkButton) {

            e.apiLinkButton.addEventListener(

                "click",

                () => {

                    window.open(

                        "https://console.groq.com/keys",

                        "_blank",

                        "noopener,noreferrer"

                    );

                }

            );

        }

        if (e.apiSaveButton) {

            e.apiSaveButton.addEventListener(

                "click",

                () => {

                    const key =

                        e.apiInput.value.trim();

                    if(
                        !key ||
                        key.length < 30
                    ){

                        this.showToast(
                            "Enter a valid API key."
                        );

                        return;

                    }

                    Storage.saveApiKey(key);

                    this.hideModal(e.apiModal);

                    e.form?.requestSubmit();

                }

            );

        }

    },

    restoreApiKey() {

        const key = Storage.getApiKey();

        if (this.elements.apiInput && key) {

            this.elements.apiInput.value = key;

        }

    },

    async generate(event) {

        event.preventDefault();

        if (this.state.generating) {

            return;

        }

        this.setGenerating(true);

        const e = this.elements;

        try {

            this.updateStatus("Checking Subscription...");

            const apiKey = Storage.getApiKey();

            if (!apiKey) {


                this.setGenerating(false);


                this.showModal(
                    e.apiModal
                );


                return;

            }

            const subscription =

                await SubscriptionManager.check();

            this.state.subscription = subscription;

            if (!subscription.active) {


                this.setGenerating(false);


                this.showModal(
                    e.paymentModal
                );


                this.updateStatus(
                    "Subscription Required"
                );


                return;

            }


            this.updateStatus("Preparing Prompt...");

            const values =

                getValues();

            const prompt =

                PromptBuilder.build(values);

            this.setGenerating(true);

            this.updateStatus("Generating Content...");

            const aiResponse =

                await AIClient.generate(

                    prompt,

                    apiKey

                );

            EditorManager.reset();


            const html =

                ContentRenderer.render(

                    aiResponse

                );


            OutputRenderer.render(html);


            EditorManager.saveDraft();


            this.updateWordCount(

                OutputRenderer.getText()

            );

            this.updateStatus("Completed");

        }

        catch (error) {

            console.error(error);

            this.updateStatus("Generation Failed");

            this.showToast(

                error.message ||

                "Unable to generate content."

            );

        }

        finally {

            this.state.generating = false;

            this.setGenerating(false);

        }

    },

    async refreshSubscriptionUI() {

        try {

            const sub =

                await SubscriptionManager.check();

            this.state.subscription = sub;

            if (sub.active) {

                if (this.elements.subscriptionStatus) {

                    this.elements.subscriptionStatus.textContent =

                        "Activated";

                }

                if (this.elements.subscriptionButton) {

                    this.elements.subscriptionButton.textContent =

                        "Subscription Active";

                    this.elements.subscriptionButton.disabled = true;

                }

            }

            else {

                if (this.elements.subscriptionStatus) {

                    this.elements.subscriptionStatus.textContent =

                        "Not Activated";

                }

                if (this.elements.subscriptionButton) {

                    this.elements.subscriptionButton.textContent =

                        "Get Subscription ₹30 / Month";

                    this.elements.subscriptionButton.disabled = false;

                }

            }

        }

        catch (error) {

            console.error(error);

        }

    },

    setGenerating(active) {

        this.state.generating = active;

        if (!this.elements.generateButton) {

            return;

        }

        this.elements.generateButton.disabled = active;

        this.elements.generateButton.textContent =

            active

            ? "Generating..."

            : "Generate Content";

    },

    updateWordCount(text) {

        const content = (text || "").trim();

        const words =

            content.length === 0

                ? 0

                : content.split(/\s+/).length;

        const characters =

            text ? text.length : 0;

        if (this.elements.wordCount) {

            this.elements.wordCount.textContent = words;

        }

        if (this.elements.characterCount) {

            this.elements.characterCount.textContent = characters;

        }

    },

    updateStatus(status) {

        if (this.elements.appStatus) {

            this.elements.appStatus.textContent = status;

        }

    },


    showToast(message = "") {


        const toast =

            document.getElementById(
                "vw-toast"
            );


        if (!toast) {

            return;

        }


        toast.textContent = message;


        toast.hidden = false;


        clearTimeout(
            this.toastTimer
        );


        this.toastTimer = setTimeout(() => {


            toast.hidden = true;


        }, 2500);


    },

    showModal(modal) {


        if(!modal){

            console.error(
                "Modal element missing"
            );

            return;

        }


        modal.removeAttribute(
            "hidden"
        );


        modal.hidden = false;


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


    },



    hideModal(modal) {

        if (!modal) {

            return;

        }

        modal.hidden = true;

        modal.setAttribute(

            "aria-hidden",

            "true"

        );

    },

    showLoading(message = "Please wait...") {

        const loading =

            document.getElementById(

                "vw-loading"

            );

        if (!loading) {

            return;

        }

        loading.hidden = false;

        loading.removeAttribute(

            "aria-hidden"

        );

        const text =

            loading.querySelector("p");

        if (text) {

            text.textContent = message;

        }

    },

    hideLoading() {

        const loading =

            document.getElementById(

                "vw-loading"

            );

        if (!loading) {

            return;

        }

        loading.hidden = true;

        loading.setAttribute(

            "aria-hidden",

            "true"

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        try {

            await App.init();

        }

        catch (error) {

            console.error(

                "Application startup failed:",

                error

            );

            const status =

                document.getElementById(

                    "vw-app-status"

                );

            if (status) {

                status.textContent =

                    "Startup Failed";

            }

        }

    }

);


