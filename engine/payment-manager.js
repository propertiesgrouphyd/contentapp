"use strict";


/*
==========================================================================

VIDHWAAN AI Writer

Production Payment Manager

Safe Flow:

Create Order
      |
Razorpay Checkout
      |
UPI / PhonePe
      |
Payment Response Backup
      |
Worker Verification
      |
Subscription Result


==========================================================================

*/


const PaymentManager = {


    processing:false,

    verifyRunning:false,





    async start(){


        if(this.processing){

            throw new Error(
                "Payment already in progress"
            );

        }


        this.processing=true;



        try{


            const order =

            await this.createOrder();




            localStorage.setItem(

                "vidhwaan_pending_payment",

                JSON.stringify({

                    orderId:
                    order.orderId,

                    created:
                    Date.now()

                })

            );



            return this.openRazorpay(order);



        }

        catch(error){


            this.processing=false;


            throw error;


        }


    },









    async createOrder(){


        const controller =

        new AbortController();



        const timer =

        setTimeout(

            ()=>controller.abort(),

            15000

        );



        try{


            const response =

            await fetch(

                VW_CONFIG.PAYMENT.WORKER_URL +

                VW_CONFIG.PAYMENT.CREATE_ORDER,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },

                    body:JSON.stringify({

                        deviceId:
                        crypto.randomUUID()

                    }),

                    signal:controller.signal

                }

            );



            clearTimeout(timer);



            const data =

            await response.json();



            if(

                !response.ok ||

                !data.success

            ){

                throw new Error(

                    data.error ||

                    "Unable to create order"

                );

            }



            return data;


        }


        catch(error){


            clearTimeout(timer);


            if(error.name==="AbortError"){

                throw new Error(
                    "Payment server timeout"
                );

            }


            throw error;


        }


    },









    openRazorpay(order){


        return new Promise(

        (resolve,reject)=>{



            let completed=false;

        

            let paymentReceived=false;



            const finish=(fn,value)=>{


                if(completed){

                    return;

                }


                completed=true;


                this.processing=false;


                window.vwRazorpay=null;


                fn(value);


            };








            const options={



                key:
                order.key,


                amount:
                order.amount,


                currency:
                "INR",



                name:
                "VIDHWAAN AI Writer",



                description:
                "Monthly Subscription",



                order_id:
                order.orderId,







                handler:(response)=>{


                    paymentReceived=true;



                    localStorage.setItem(

                        "vidhwaan_payment_response",

                        JSON.stringify(response)

                    );





                    this.verifyPayment(response)

                    .then(

                    result=>{


                        localStorage.removeItem(

                            "vidhwaan_pending_payment"

                        );


                        localStorage.removeItem(

                            "vidhwaan_payment_response"

                        );



                        finish(

                            resolve,

                            result

                        );


                    })


                    .catch(

                    error=>{


                        finish(

                            reject,

                            error

                        );


                    });



                },







                modal:{



                    escape:false,


                    backdropclose:false,



                    ondismiss:()=>{



                        /*
                         Razorpay may dismiss
                         during PhonePe switching.

                         Wait before cancelling.
                        */


                        setTimeout(()=>{


                            if(

                                completed ||

                                paymentReceived

                            ){

                                return;

                            }



                            finish(

                                reject,

                                new Error(

                                    "Payment cancelled"

                                )

                            );



                        },2000);



                    }



                },






                retry:{


                    enabled:true


                }



            };







            try{


                if(

                    typeof Razorpay ===

                    "undefined"

                ){

                    throw new Error(

                        "Payment gateway unavailable"

                    );

                }




                const razorpay =

                new Razorpay(options);



                window.vwRazorpay =

                razorpay;






                razorpay.on(

                "payment.failed",

                error=>{


                    finish(

                        reject,

                        new Error(

                            error?.error?.description ||

                            "Payment failed"

                        )

                    );


                });






                /*
                    IMPORTANT FOR MOBILE PWA

                    Open Razorpay immediately.
                    Do not use setTimeout.
                    Do not delay.

                */


                razorpay.open();

                razorpay.open();


                setTimeout(()=>{

                    window.scrollTo(
                        0,
                        0
                    );

                },100);



            }

            catch(error){


                finish(

                    reject,

                    error

                );


            }



        });


    },









    async verifyPayment(response){



        if(this.verifyRunning){


            throw new Error(

                "Verification already running"

            );


        }


        this.verifyRunning=true;




        const controller =

        new AbortController();



        const timer =

        setTimeout(

            ()=>controller.abort(),

            20000

        );





        try{



            const result =

            await fetch(

                VW_CONFIG.PAYMENT.WORKER_URL +

                VW_CONFIG.PAYMENT.VERIFY_PAYMENT,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":

                        "application/json"

                    },


                    signal:

                    controller.signal,


                    body:JSON.stringify({

                        paymentId:

                        response.razorpay_payment_id,


                        orderId:

                        response.razorpay_order_id,


                        signature:

                        response.razorpay_signature


                    })


                }

            );



            clearTimeout(timer);



            const data=

            await result.json();





            if(

                !result.ok ||

                !data.success

            ){

                throw new Error(

                    data.error ||

                    "Verification failed"

                );


            }




            return {


                uniqueId:

                data.uniqueId,


                expires:

                data.expires


            };



        }


        catch(error){


            clearTimeout(timer);



            if(error.name==="AbortError"){


                throw new Error(

                    "Verification timeout"

                );


            }



            throw error;


        }



        finally{


            this.verifyRunning=false;


        }



    }



};



export default PaymentManager;
