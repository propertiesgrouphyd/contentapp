"use strict";

/*
==========================================================================

VIDHWAAN AI Writer

Production Payment Manager

Flow:

Create Order
      |
Razorpay Checkout
      |
PhonePe / UPI
      |
Capture Payment Response
      |
Verify With Worker
      |
Receive Subscription
      |
Save Locally

==========================================================================

*/


const PaymentManager = {


    processing:false,



    async start(){


        if(this.processing){

            throw new Error(
                "Payment already processing"
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





            if(

                !response.ok ||

                !data.success

            ){


                throw new Error(

                    data.error ||

                    "Payment order failed"

                );


            }




            return data;



        }


        catch(error){


            clearTimeout(timer);


            throw error;


        }


    },









    openRazorpay(order){



        return new Promise(

        (resolve,reject)=>{



            let completed=false;




            const finish=(callback,value)=>{


                if(completed){

                    return;

                }


                completed=true;


                this.processing=false;


                window.vwRazorpay=null;


                callback(value);


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



                    if(

                        !response.razorpay_payment_id ||

                        !response.razorpay_order_id ||

                        !response.razorpay_signature

                    ){


                        finish(

                            reject,

                            new Error(

                                "Invalid payment response"

                            )

                        );


                        return;


                    }





                    /*
                       Backup payment response

                       Recovery if app closes
                    */


                    localStorage.setItem(

                        "vidhwaan_payment_response",

                        JSON.stringify(response)

                    );





                    /*
                       Verify after payment

                       Razorpay UI is already done
                    */


                    this.verifyPayment(response)

                    .then(

                    result=>{


                        localStorage.removeItem(

                            "vidhwaan_payment_response"

                        );


                        localStorage.removeItem(

                            "vidhwaan_pending_payment"

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



                    escape:true,



                    backdropclose:true,



                    ondismiss(){



                        localStorage.removeItem(

                            "vidhwaan_pending_payment"

                        );



                        finish(

                            reject,

                            new Error(

                                "Payment cancelled"

                            )

                        );


                    }



                },







                retry:{


                    enabled:false


                }





            };









            try {



                if(

                    typeof Razorpay ===

                    "undefined"

                ){


                    throw new Error(

                        "Payment gateway unavailable"

                    );


                }





                const razorpay=

                new Razorpay(options);



                window.vwRazorpay=

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


                    }

                );







                setTimeout(()=>{


                    razorpay.open();



                },200);






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





            if(

                !result.ok ||

                !data.success

            ){


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


            if(error.name==="AbortError"){


                throw new Error(

                    "Verification timeout"

                );


            }



            throw error;


        }



    }





};





export default PaymentManager;
