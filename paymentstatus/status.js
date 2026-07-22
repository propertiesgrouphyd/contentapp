"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Payment Status
   Production
   ========================================================================== */

const StatusPage = {

    elements:{},

    init(){

        this.cacheElements();

        this.bindEvents();

        this.loadStatus();

    },

    cacheElements(){

        const $ = id => document.getElementById(id);

        this.elements={

            icon: $("statusIcon"),

            title: $("statusTitle"),

            message: $("statusMessage"),

            subscriptionBox: $("subscriptionBox"),

            subscriptionId: $("subscriptionId"),

            expiryDate: $("expiryDate"),

            failedBox: $("failedBox"),

            backButton: $("backButton")

        };

    },

    bindEvents(){

        if(this.elements.backButton){

            this.elements.backButton.addEventListener(

                "click",

                ()=>{

                    window.location.href="https://create.vidhwaan.com";

                }

            );

        }

    },

    loadStatus(){

        const params=

            new URLSearchParams(

                window.location.search

            );

        const status=

            params.get("status") || "failed";

        const id=

            params.get("id") || "-";

        const expires=

            params.get("expires") || "-";

        if(status==="success"){

            this.showSuccess(

                id,

                expires

            );

        }

        else{

            this.showFailure();

        }

    },

    showSuccess(id,expires){

        const e=this.elements;

        e.icon.textContent="✓";

        e.icon.classList.remove("failed");

        e.title.textContent=

            "Payment Successful";

        e.message.textContent=

            "Your subscription has been activated successfully. You can continue using VIDHWAAN AI Writer.";

        e.subscriptionBox.hidden=false;

        e.failedBox.hidden=true;

        e.subscriptionId.textContent=id;

        e.expiryDate.textContent=

            this.formatDate(expires);

    },

    showFailure(){

        const e=this.elements;

        e.icon.textContent="!";

        e.icon.classList.add("failed");

        e.title.textContent=

            "Payment Not Completed";

        e.message.textContent=

            "Your payment could not be verified.";

        e.subscriptionBox.hidden=true;

        e.failedBox.hidden=false;

    },

    formatDate(value){

        if(

            !value ||

            value==="-" ||

            value==="null"

        ){

            return "-";

        }

        const date=

            new Date(value);

        if(

            Number.isNaN(

                date.getTime()

            )

        ){

            return value;

        }

        return date.toLocaleDateString(

            undefined,

            {

                year:"numeric",

                month:"long",

                day:"numeric"

            }

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        StatusPage.init();

    }

);
