"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Payment Manager

   Production Payment Flow:

   Frontend
      |
      |
   Worker /create-order
      |
      |
   Razorpay Checkout
      |
      |
   UPI / Card / Netbanking
      |
      |
   Worker /verify-payment
      |
      |
   Receive uniqueId + expiry

   ========================================================================== */


const PaymentManager = {



    async start(){


        const order =

        await this.createOrder();



        localStorage.setItem(

            "vidhwaan_payment_pending",

            Date.now().toString()

        );



        return await this.openRazorpay(order);


    },







    async createOrder(){


        const controller =

        new AbortController();



        const timer =

        setTimeout(

            ()=>controller.abort(),

            15000

        );



        try {


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


                    signal:

                    controller.signal,


                    body:JSON.stringify({

                        deviceId:

                        crypto.randomUUID()

                    })


                }

            );



            clearTimeout(timer);




            const data =

            await response.json();





            if(!response.ok || !data.success){


                throw new Error(

                    data.error ||

                    "Unable to create payment order"

                );


            }





            return data;



        }

        catch(error){


            clearTimeout(timer);



            if(error.name === "AbortError"){


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



                let completed = false;



                const finish =

                (callback,value)=>{


                    if(completed){

                        return;

                    }


                    completed = true;


                    window.vwRazorpay = null;


                    callback(value);


                };







                const options = {



                    key:

                    order.key,



                    amount:

                    order.amount,



                    currency:

                    "INR",



                    name:

                    "VIDHWAAN AI Writer",



                    description:

                    "Monthly AI Writer Subscription",



                    order_id:

                    order.orderId,







                    handler:

                    async(response)=>{


                        try{


                            if(

                                !response.razorpay_payment_id ||

                                !response.razorpay_order_id ||

                                !response.razorpay_signature

                            ){


                                throw new Error(

                                    "Invalid payment response"

                                );


                            }





                            const result =

                            await this.verifyPayment(

                                response

                            );





                            localStorage.removeItem(

                                "vidhwaan_payment_pending"

                            );





                            finish(

                                resolve,

                                result

                            );



                        }


                        catch(error){


                            finish(

                                reject,

                                error

                            );


                        }


                    },







                    modal:{



                        ondismiss(){



                            localStorage.removeItem(

                                "vidhwaan_payment_pending"

                            );



                            finish(

                                reject,

                                new Error(

                                    "Payment cancelled"

                                )

                            );


                        }



                    }





                };







                try {



                    const razorpay =

                    new Razorpay(options);





                    window.vwRazorpay = razorpay;







                    razorpay.on(

                        "payment.failed",

                        error=>{


                            localStorage.removeItem(

                                "vidhwaan_payment_pending"

                            );



                            finish(

                                reject,

                                new Error(

                                    error?.error?.description ||

                                    "Payment failed"

                                )

                            );


                        }

                    );






                    razorpay.open();




                }

                catch(error){


                    finish(

                        reject,

                        error

                    );


                }



            }

        );


    },









    async verifyPayment(response){



        const controller =

        new AbortController();



        const timer =

        setTimeout(

            ()=>controller.abort(),

            15000

        );




        try {



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




            const data =

            await result.json();







            if(!result.ok || !data.success){


                throw new Error(

                    data.error ||

                    "Payment verification failed"

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



            if(error.name === "AbortError"){


                throw new Error(

                    "Payment verification timeout"

                );


            }



            throw error;


        }



    }



};





export default PaymentManager;
