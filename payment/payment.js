"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Production Payment Controller
   Version 3.0
   ========================================================================== */


const PaymentPage = {


    busy:false,


    elements:{},


    config:null,



    init(){


        this.config =
        window.VW_CONFIG.PAYMENT;


        this.cacheElements();


        this.bindEvents();


        this.updateGSTDisplay();


    },





    cacheElements(){


        const $ =
        id => document.getElementById(id);



        this.elements = {


            accept:
            $("acceptTerms"),


            payButton:
            $("payButton"),


            backButton:
            $("backButton"),



            firstName:
            $("firstName"),


            lastName:
            $("lastName"),


            email:
            $("email"),


            phone:
            $("phone"),



            customerType:
            $("customerType"),


            companySection:
            $("companySection"),


            companyName:
            $("companyName"),


            gstin:
            $("gstin"),



            state:
            $("state"),


            address:
            $("address"),




            cgstAmount:
            $("cgstAmount"),


            sgstAmount:
            $("sgstAmount"),


            igstAmount:
            $("igstAmount"),


            totalAmount:
            $("totalAmount")


        };


    },







    bindEvents(){


        const e =
        this.elements;



        if(e.accept){


            e.accept.addEventListener(

                "change",

                ()=>{


                    this.updatePayButton();


                }

            );


        }





        if(e.customerType){


            e.customerType.addEventListener(

                "change",

                ()=>{


                    this.toggleCompany();


                }

            );


        }





        if(e.state){


            e.state.addEventListener(

                "change",

                ()=>{


                    this.updateGSTDisplay();


                }

            );


        }





        if(e.backButton){


            e.backButton.addEventListener(

                "click",

                ()=>{


                    window.location.href =

                    "https://writer.vidhwaan.com";


                }

            );


        }





        if(e.payButton){


            e.payButton.addEventListener(

                "click",

                ()=>{


                    this.startPayment();


                }

            );


        }


    },








    toggleCompany(){


        const e =
        this.elements;



        if(

            e.customerType.value === "company"

        ){


            e.companySection.hidden = false;


        }

        else{


            e.companySection.hidden = true;


            e.companyName.value = "";


            e.gstin.value = "";


        }


    },








    updateGSTDisplay(){


        const e =
        this.elements;



        let cgst = 0;

        let sgst = 0;

        let igst = 0;



        const baseAmount = 30;



        const companyState =
        "Andhra Pradesh";



        if(e.state.value){



            if(

                e.state.value === companyState

            ){


                cgst = 2.70;


                sgst = 2.70;


            }

            else{


                igst = 5.40;


            }


        }





        e.cgstAmount.textContent =

        "₹" + cgst.toFixed(2);




        e.sgstAmount.textContent =

        "₹" + sgst.toFixed(2);




        e.igstAmount.textContent =

        "₹" + igst.toFixed(2);




        e.totalAmount.textContent =

        "₹" +

        (

            baseAmount +

            cgst +

            sgst +

            igst

        ).toFixed(2);



    },


    getCustomerData(){


        const e =
        this.elements;



        return {


            firstName:
            e.firstName.value.trim(),


            lastName:
            e.lastName.value.trim(),


            email:
            e.email.value.trim(),


            phone:
            e.phone.value.trim(),


            customerType:
            e.customerType.value,


            companyName:
            e.companyName.value.trim(),


            gstin:
            e.gstin.value.trim()
            .toUpperCase(),


            state:
            e.state.value.trim(),


            address:
            e.address.value.trim()


        };


    },







    validateCustomer(){


        const e =
        this.elements;



        const required = [


            [
                e.firstName,
                "Enter first name"
            ],


            [
                e.lastName,
                "Enter last name"
            ],


            [
                e.email,
                "Enter email address"
            ],


            [
                e.phone,
                "Enter phone number"
            ],


            [
                e.customerType,
                "Select customer type"
            ],


            [
                e.state,
                "Select state"
            ],


            [
                e.address,
                "Enter billing address"
            ]

        ];





        for(
            const item of required
        ){


            if(
                !item[0].value.trim()
            ){


                alert(item[1]);


                item[0].focus();


                return false;


            }


        }





        if(

            e.customerType.value === "company" &&

            !e.companyName.value.trim()

        ){


            alert(
                "Enter company name"
            );


            e.companyName.focus();


            return false;


        }



        return true;


    },








    updatePayButton(){


        const e =
        this.elements;


        e.payButton.disabled =

        !e.accept.checked ||

        this.busy;



    },








    setBusy(
        active,
        text
    ){


        this.busy =
        active;


        this.updatePayButton();



        if(text){


            this.elements.payButton.textContent =
            text;


        }


    },








    resetButton(){


        this.busy =
        false;


        this.updatePayButton();


        this.elements.payButton.textContent =

        "Pay " +

        this.elements.totalAmount.textContent;


    },








    async startPayment(){


        if(this.busy){

            return;

        }





        if(
            !this.validateCustomer()
        ){

            return;

        }





        this.setBusy(

            true,

            "Preparing Payment..."

        );





        try{


            const order =

            await this.createOrder();




            this.openCheckout(order);



        }

        catch(error){



            console.error(error);



            alert(

                error.message ||

                "Unable to start payment."

            );



            this.resetButton();


        }



    },








    async createOrder(){


        const response =

        await fetch(

            this.config.WORKER_URL +

            this.config.CREATE_ORDER,

            {


                method:"POST",


                headers:{


                    "Content-Type":

                    "application/json"


                },


                body:JSON.stringify({


                    customer:

                    this.getCustomerData()


                })


            }

        );





        if(!response.ok){


            throw new Error(

                "Order creation failed."

            );


        }





        const order =

        await response.json();





        if(

            !order.orderId ||

            !order.key

        ){


            throw new Error(

                "Invalid worker response."

            );


        }




        return order;


    },








    openCheckout(order){



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

            "VIDHWAAN AI Writer Monthly Subscription",





            handler:

            async(payment)=>{


                await this.verifyPayment(payment);


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


                body:JSON.stringify({



                    ...payment,



                    customer:

                    this.getCustomerData()



                })


            }

        );





        if(!response.ok){


            this.redirectFailure();


            return;


        }






        const data =

        await response.json();





        if(

            data.success &&

            data.uniqueId

        ){



            this.redirectSuccess(data);


            return;


        }





        this.redirectFailure();



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





        window.location.replace(url);



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
