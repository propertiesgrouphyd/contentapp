"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Payment Manager

   Flow:

   Frontend
      |
      |
   Worker /create-order
      |
      |
   Razorpay Checkout
      |
      |
   Worker /verify-payment
      |
      |
   Receive uniqueId + expiry
      |
      |
   Store locally

   ========================================================================== */


const PaymentManager = {



    async start(){


        const order =

        await this.createOrder();



        return await this.openRazorpay(order);


    },








    async createOrder(){


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

                })


            }

        );





        const data =

        await response.json();






        if(!data.success){


            throw new Error(

                data.error ||

                "Unable to create payment order"

            );


        }






        return data;


    },









    openRazorpay(order){


        return new Promise(

            (resolve,reject)=>{



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


                            const result =

                            await this.verifyPayment(

                                response

                            );



                            resolve(result);


                        }


                        catch(error){


                            reject(error);


                        }


                    },







                    modal:{


                        ondismiss(){


                            reject(

                                new Error(

                                    "Payment cancelled"

                                )

                            );


                        }


                    }






                };






                const razorpay =

                new Razorpay(options);



                razorpay.open();



            }

        );



    },









    async verifyPayment(response){



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







        const data =

        await result.json();







        if(!data.success){


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



};





export default PaymentManager;
