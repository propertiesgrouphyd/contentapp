"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Simple Production Payment Controller

   Flow:

   Pay Button
        ↓
   Create Order
        ↓
   Razorpay
        ↓
   Verify
        ↓
   Payment Status

   ========================================================================== */


const PaymentPage = {


    busy:false,


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

            accept.onchange = ()=>{

                payButton.disabled =
                    !accept.checked;

            };

        }



        if(backButton){

            backButton.onclick = ()=>{

                location.href =
                "https://create.vidhwaan.com";

            };

        }



        if(payButton){

            payButton.onclick = ()=>{

                this.pay();

            };

        }


    },



    async pay(){


        if(this.busy){

            return;

        }


        this.busy = true;



        const button =

            document.getElementById(
                "payButton"
            );



        button.disabled = true;

        button.textContent =
        "Preparing Payment...";



        try{


            const config =
            window.VW_CONFIG.PAYMENT;



            const response =

            await fetch(

                config.WORKER_URL +
                config.CREATE_ORDER,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },

                    body:JSON.stringify({

                        amount:
                        config.AMOUNT,

                        currency:
                        "INR"

                    })

                }

            );



            if(!response.ok){

                throw new Error(
                    "Unable to create payment order."
                );

            }


            const order =

            await response.json();



            if(
                !order.orderId
            ){

                throw new Error(
                    "Order creation failed"
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
                "Subscription",


                order_id:
                order.orderId,



                handler:

                async(payment)=>{


                    button.textContent =
                    "Verifying...";



                    const verify =

                    await fetch(

                        config.WORKER_URL +
                        config.VERIFY_PAYMENT,

                        {

                            method:"POST",

                            headers:{

                                "Content-Type":
                                "application/json"

                            },

                            body:

                            JSON.stringify(payment)

                        }

                    );



                    const data =

                    await verify.json();



                    if(
                        data.uniqueId &&
                        data.expires
                    ){


                        location.href =

                        config.PAYMENT_STATUS +

                        "?status=success&id=" +

                        encodeURIComponent(
                            data.uniqueId
                        ) +

                        "&expires=" +

                        encodeURIComponent(
                            data.expires
                        );


                    }
                    else{


                        location.href =

                        config.PAYMENT_STATUS +

                        "?status=failed";


                    }


                },


                modal:{


                    ondismiss:()=>{


                        this.busy = false;


                        button.disabled =
                        false;


                        button.textContent =
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
                "Payment failed. Please try again."
            );


            this.busy = false;


            button.disabled =
            false;


            button.textContent =
            "Pay ₹35.40";


        }


    }


};




document.addEventListener(

"DOMContentLoaded",

()=>{

    PaymentPage.init();

}

);
