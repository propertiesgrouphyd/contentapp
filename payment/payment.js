"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Payment Page Controller

   Flow:

   Accept Terms
        ↓
   Create Order Worker
        ↓
   Razorpay Checkout
        ↓
   Verify Payment Worker
        ↓
   Payment Status Page

   ========================================================================== */


const CONFIG = {


    WORKER_URL:

    "https://bold-fire-78f8.propertiesgrouphyd.workers.dev",


    PAYMENT_STATUS:

    "https://create.vidhwaan.com/paymentstatus",


    AMOUNT:

    3540,


    CURRENCY:

    "INR"


};




const PaymentPage = {



    init(){


        const accept =

            document.getElementById(
                "acceptTerms"
            );


        const payButton =

            document.getElementById(
                "payButton"
            );


        const backButton =

            document.getElementById(
                "backButton"
            );



        if(accept && payButton){


            accept.addEventListener(

                "change",

                ()=>{


                    payButton.disabled =
                        !accept.checked;


                }

            );


        }



        if(backButton){


            backButton.addEventListener(

                "click",

                ()=>{


                    window.location.href =

                    "https://create.vidhwaan.com";


                }

            );


        }



        if(payButton){


            payButton.addEventListener(

                "click",

                ()=>{


                    this.startPayment();


                }

            );


        }



    },





    async startPayment(){



        const payButton =

            document.getElementById(
                "payButton"
            );



        try{


            payButton.disabled = true;


            payButton.textContent =
                "Preparing Payment...";



            const orderResponse =

                await fetch(

                    CONFIG.WORKER_URL +
                    "/create-order",

                    {

                        method:"POST",

                        headers:{

                            "Content-Type":
                            "application/json"

                        },

                        body:JSON.stringify({

                            amount:
                            CONFIG.AMOUNT,

                            currency:
                            CONFIG.CURRENCY


                        })

                    }

                );



            const order =

                await orderResponse.json();




            if(!order.id){


                throw new Error(
                    "Unable to create payment order."
                );


            }




            const razorpay =

                new Razorpay({



                    key:

                    order.key,



                    amount:

                    order.amount,



                    currency:

                    order.currency,



                    name:

                    "VIDHWAAN AI Writer",



                    description:

                    "Monthly Subscription",



                    order_id:

                    order.id,



                    handler:

                    async(response)=>{


                        await this.verify(

                            response

                        );


                    },



                    modal:{


                        ondismiss:()=>{


                            payButton.disabled =
                                false;


                            payButton.textContent =
                                "Pay ₹35.40";


                        }


                    }



                });



            razorpay.open();



        }


        catch(error){


            console.error(
                error
            );


            alert(

                error.message ||

                "Payment failed."

            );



            payButton.disabled =
                false;


            payButton.textContent =
                "Pay ₹35.40";


        }


    },






    async verify(response){



        const result =

            await fetch(

                CONFIG.WORKER_URL +
                "/verify-payment",

                {


                    method:"POST",


                    headers:{


                        "Content-Type":
                        "application/json"


                    },


                    body:

                    JSON.stringify(response)


                }

            );



        const data =

            await result.json();



        if(

            data.success

        ){



            window.location.href =

            CONFIG.PAYMENT_STATUS +

            "?status=success&id=" +

            encodeURIComponent(

                data.uniqueId || ""

            );


        }

        else{


            window.location.href =

            CONFIG.PAYMENT_STATUS +

            "?status=failed";


        }



    }



};





document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        PaymentPage.init();


    }

);
