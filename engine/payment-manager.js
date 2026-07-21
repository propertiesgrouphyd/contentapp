"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Payment Manager
   --------------------------------------------------------------------------
   Responsibility:
   - Create Razorpay Order
   - Open Razorpay Checkout
   - Verify Payment
   - Return Subscription Details

   This module does NOT:
   - Update UI
   - Save localStorage
   - Close modals
   - Show toasts
   ========================================================================== */

const PaymentManager = {

    processing: false,

    requestTimeout: 30000,

    async request(endpoint, body = {}) {

        const controller = new AbortController();

        const timeout = setTimeout(
            () => controller.abort(),
            this.requestTimeout
        );

        try {

            const response = await fetch(

                `${VW_CONFIG.PAYMENT.WORKER_URL}${endpoint}`,

                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(body),

                    signal: controller.signal,

                    cache: "no-store"

                }

            );

            clearTimeout(timeout);

            let data = {};

            try {

                data = await response.json();

            }

            catch {

                throw new Error(
                    "Invalid server response."
                );

            }

            if (!response.ok) {

                throw new Error(

                    data.error ||

                    "Request failed."

                );

            }

            return data;

        }

        catch (error) {

            clearTimeout(timeout);

            if (error.name === "AbortError") {

                throw new Error(

                    "Request timed out."

                );

            }

            throw error;

        }

    },



    async createOrder() {

        if (this.processing) {

            throw new Error(
                "Payment already in progress."
            );

        }

        this.processing = true;

        try {

            const order = await this.request(
                VW_CONFIG.PAYMENT.CREATE_ORDER
            );


            if(
                !order ||
                typeof order !== "object"
            ){

                throw new Error(
                    "Unable to create payment order."
                );

            }

            if (

                !order ||

                !order.orderId ||

                !order.key

            ) {

                throw new Error(

                    "Invalid order response."

                );

            }

            return order;

        }

        catch (error) {

            this.processing = false;

            throw error;

        }

    },

    openCheckout(order) {


        if(
            !order ||
            !order.key ||
            !order.orderId
        ){

            return Promise.reject(
                new Error(
                    "Invalid payment order."
                )
            );

        }


        if(this.processing){

            return Promise.reject(
                new Error(
                    "Payment already opening."
                )
            );

        }


        return new Promise(

            (resolve, reject) => {

                let finished = false;

                if(
                    typeof Razorpay === "undefined"
                ){

                    this.processing = false;


                    reject(
                        new Error(
                            "Payment service unavailable. Please refresh and try again."
                        )
                    );


                    return;

                }



                const checkout = new Razorpay({

                    key: order.key,

                    order_id: order.orderId,

                    amount: order.amount,

                    currency: order.currency || "INR",

                    name: VW_CONFIG.APP_NAME,

                    description: "Monthly Subscription",

                    modal: {

                        ondismiss: () => {

                            if (finished) {

                                return;

                            }

                            finished = true;

                            this.processing = false;

                            reject(

                                new Error(

                                    "Payment cancelled."

                                )

                            );

                        }

                    },

                    handler: response => {

                        if (finished) {

                            return;

                        }

                        finished = true;

                        this.processing = false;

                        resolve(response);

                    }

                });

                checkout.on(

                    "payment.failed",

                    event => {

                        if (finished) {

                            return;

                        }

                        finished = true;

                        this.processing = false;

                        reject(

                            new Error(

                                event?.error?.description ||

                                "Payment failed."

                            )

                        );

                    }

                );

                try {

                    checkout.open();

                }
                catch(error){

                    this.processing = false;

                    reject(error);

                }

            }

        );

    },



    async verifyPayment(paymentResponse) {


        if(
            !paymentResponse ||
            !paymentResponse.razorpay_payment_id ||
            !paymentResponse.razorpay_order_id ||
            !paymentResponse.razorpay_signature
        ){

            throw new Error(
                "Invalid payment response."
            );

        }

        try {

            const result = await this.request(

                VW_CONFIG.PAYMENT.VERIFY_PAYMENT,

                {

                    razorpay_payment_id:

                        paymentResponse.razorpay_payment_id,

                    razorpay_order_id:

                        paymentResponse.razorpay_order_id,

                    razorpay_signature:

                        paymentResponse.razorpay_signature

                }

            );

            if (

                !result ||

                !result.uniqueId ||

                !result.expires

            ) {

                throw new Error(

                    "Invalid verification response."

                );

            }

            return {

                success: true,

                uniqueId: result.uniqueId,

                expires: Number(result.expires)

            };

        }

        finally {

            this.processing = false;

        }

    },

    async start() {

        if (this.processing) {

            throw new Error(
                "Payment already in progress."
            );

        }

        try {

            const order =

                await this.createOrder();

            const paymentResponse =

                await this.openCheckout(order);

            const subscription =

                await this.verifyPayment(
                    paymentResponse
                );

            return subscription;

        }

        catch (error) {

            this.processing = false;

            throw error;

        }

    },



    reset() {

        this.processing = false;

    }

};



export default PaymentManager;
