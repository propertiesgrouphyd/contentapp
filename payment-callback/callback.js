"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Payment Callback Controller

   ========================================================================= */

import Storage from "../engine/storage.js";

const CallbackPage = {

    async init(){

        this.message = document.getElementById(
            "callbackMessage"
        );

        try{

            this.updateMessage(
                "Reading payment information..."
            );

            const params = new URLSearchParams(
                window.location.search
            );

            const paymentId =
                params.get("razorpay_payment_id");

            const orderId =
                params.get("razorpay_order_id");

            const signature =
                params.get("razorpay_signature");

            if(
                !paymentId ||
                !orderId ||
                !signature
            ){

                this.failed(
                    "Payment information was not received."
                );

                return;

            }

            this.updateMessage(
                "Preparing secure verification..."
            );

            await this.verify({

                paymentId,
                orderId,
                signature

            });

        }

        catch(error){

            console.error(error);

            this.failed(
                "Unable to verify payment."
            );

        }

    },



    async verify(payment){

        /*
            Next step:

            POST payment
            to Cloudflare Worker

            Receive:

            uniqueId
            expires

            Redirect to status page
        */

        console.log(
            "Verification payload:",
            payment
        );

    },



    updateMessage(text){

        if(this.message){

            this.message.textContent = text;

        }

    },



    failed(message){

        this.updateMessage(message);

        setTimeout(()=>{

            window.location.href =

                VW_CONFIG.PAYMENT.PAYMENT_STATUS +

                "?status=failed";

        },2000);

    }

};



document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        CallbackPage.init();

    }

);
