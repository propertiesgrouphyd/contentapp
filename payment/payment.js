"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Production Payment Controller
   ========================================================================== */

const PaymentPage = {

    busy: false,

    elements: {},

    config: null,

    init() {

        this.config = window.VW_CONFIG.PAYMENT;

        this.cacheElements();

        this.bindEvents();

    },

    cacheElements() {

        const $ = id => document.getElementById(id);

        this.elements = {

            accept: $("acceptTerms"),

            payButton: $("payButton"),

            backButton: $("backButton")

        };

    },

    bindEvents() {

        const e = this.elements;

        if (e.accept) {

            e.accept.addEventListener(

                "change",

                () => {

                    e.payButton.disabled =
                        !e.accept.checked ||
                        this.busy;

                }

            );

        }

        if (e.backButton) {

            e.backButton.addEventListener(

                "click",

                () => {

                    window.location.href =
                        "https://writer.vidhwaan.com";

                }

            );

        }

        if (e.payButton) {

            e.payButton.addEventListener(

                "click",

                () => {

                    this.startPayment();

                }

            );

        }

    },

    setBusy(active, text) {

        this.busy = active;

        const button = this.elements.payButton;

        if (!button) {

            return;

        }

        button.disabled =

            active ||

            !this.elements.accept.checked;

        if (text) {

            button.textContent = text;

        }

    },

    resetButton() {

        this.busy = false;

        this.elements.payButton.disabled =

            !this.elements.accept.checked;

        this.elements.payButton.textContent =

            "Pay ₹35.40";

    },

    async startPayment() {

        if (this.busy) {

            return;

        }

        this.setBusy(

            true,

            "Preparing Payment..."

        );

        try {

            const order =

                await this.createOrder();

            this.openCheckout(order);

        }

        catch (error) {

            console.error(error);

            alert(

                error.message ||

                "Unable to start payment."

            );

            this.resetButton();

        }

    },

    async createOrder() {

        const controller =

            new AbortController();

        const timer =

            setTimeout(

                () => controller.abort(),

                15000

            );

        try {

            const response =

                await fetch(

                    this.config.WORKER_URL +

                    this.config.CREATE_ORDER,

                    {

                        method: "POST",

                        headers: {

                            "Content-Type":

                            "application/json"

                        },

                        body: JSON.stringify({

                            amount:

                            this.config.AMOUNT,

                            currency: "INR"

                        }),

                        signal:

                        controller.signal

                    }

                );

            clearTimeout(timer);

            if (!response.ok) {

                throw new Error(

                    "Unable to create payment order."

                );

            }

            const order =

                await response.json();

            if (

                !order ||

                !order.orderId ||

                !order.key

            ) {

                throw new Error(

                    "Invalid payment response."

                );

            }

            return order;

        }

        catch (error) {

            clearTimeout(timer);

            if (

                error.name ===

                "AbortError"

            ) {

                throw new Error(

                    "Request timed out."

                );

            }

            throw error;

        }

    },

    openCheckout(order) {

        this.setBusy(

            true,

            "Opening Secure Payment..."

        );

        const razorpay =

            new Razorpay({

                key:
                order.key,

                amount:
                order.amount,

                currency:
                order.currency,

                order_id:
                order.orderId,

                name:
                "VIDHWAAN AI Writer",

                description:
                "Monthly Subscription",

                handler:

                async(payment)=>{

                    await this.verifyPayment(
                        payment
                    );

                },

                modal:{

                    escape:true,

                    backdropclose:false,

                    confirm_close:true,

                    ondismiss:()=>{

                        this.resetButton();

                    }

                },

                theme:{

                    color:"#111827"

                }

            });

        razorpay.open();

    },



    async verifyPayment(payment){

        this.setBusy(

            true,

            "Verifying Payment..."

        );

        const controller =

            new AbortController();

        const timer =

            setTimeout(

                ()=>controller.abort(),

                20000

            );

        try{

            const response =

                await fetch(

                    this.config.WORKER_URL +

                    this.config.VERIFY_PAYMENT,

                    {

                        method:"POST",

                        headers:{

                            "Content-Type":
                            "application/json"

                        },

                        body:

                        JSON.stringify(
                            payment
                        ),

                        signal:
                        controller.signal

                    }

                );

            clearTimeout(
                timer
            );

            if(
                !response.ok
            ){

                throw new Error(

                    "Payment verification failed."

                );

            }

            const data =

                await response.json();

            if(

                data &&

                data.uniqueId &&

                data.expires

            ){

                this.redirectSuccess(

                    data

                );

                return;

            }

            this.redirectFailure();

        }

        catch(error){

            clearTimeout(
                timer
            );

            console.error(
                error
            );

            this.redirectFailure();

        }

    },



    redirectSuccess(data){

        const url =

            this.config.PAYMENT_STATUS +

            "?status=success" +

            "&id=" +

            encodeURIComponent(

                data.uniqueId

            ) +

            "&expires=" +

            encodeURIComponent(

                data.expires

            );

        window.location.replace(
            url
        );

    },



    redirectFailure(){

        window.location.replace(

            this.config.PAYMENT_STATUS +

            "?status=failed"

        );

    }

};



document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        PaymentPage.init();

    }

);


   
