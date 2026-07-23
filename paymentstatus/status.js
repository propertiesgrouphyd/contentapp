"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Payment Status Controller

   Production

   Responsibilities

   • Display payment result
   • Save subscription locally
   • Store subscription ID
   • Store expiry date
   • Return user to application

   ========================================================================== */


import Storage from "../engine/storage.js";



const StatusPage = {


    elements:{},



    init(){


        this.cacheElements();

        this.bindEvents();

        this.loadStatus();


    },



    cacheElements(){


        const $ = id =>
            document.getElementById(id);



        this.elements = {


            icon:
                $("statusIcon"),


            title:
                $("statusTitle"),


            message:
                $("statusMessage"),


            subscriptionBox:
                $("subscriptionBox"),


            subscriptionId:
                $("subscriptionId"),


            expiryDate:
                $("expiryDate"),


            failedBox:
                $("failedBox"),


            backButton:
                $("backButton")


        };


    },



    bindEvents(){


        if(this.elements.backButton){


            this.elements.backButton.addEventListener(

                "click",

                ()=>{


                    window.location.href =

                    "https://writer.vidhwaan.com";


                }

            );


        }


    },



    loadStatus(){


        const params =

            new URLSearchParams(

                window.location.search

            );



        const status =

            params.get("status") || "failed";



        const id =

            params.get("id") || "";



        const expires =

            params.get("expires") || "";



        if(status === "success"){


            this.showSuccess(

                id,

                expires

            );


        }

        else{


            this.showFailure();


        }


    },



    showSuccess(id, expires){


        const e = this.elements;



        if(e.icon){


            e.icon.textContent = "✓";

            e.icon.classList.remove("failed");


        }



        if(e.title){


            e.title.textContent =

                "Payment Successful";


        }



        if(e.message){


            e.message.textContent =

                "Your VIDHWAAN AI Writer subscription is active. You can continue creating content.";


        }



        if(e.subscriptionBox){


            e.subscriptionBox.hidden = false;


        }



        if(e.failedBox){


            e.failedBox.hidden = true;


        }



        if(e.subscriptionId){


            e.subscriptionId.textContent =

                id || "-";


        }



        if(e.expiryDate){


            e.expiryDate.textContent =

                this.formatDate(expires);


        }



        /*
            Save subscription locally

            Required for main app access
        */


        if(id && expires){


            Storage.saveSubscription({

                uniqueId: id,

                expires: Number(expires)

            });


        }


    },



    showFailure(){


        const e = this.elements;



        if(e.icon){


            e.icon.textContent = "!";

            e.icon.classList.add("failed");


        }



        if(e.title){


            e.title.textContent =

                "Payment Not Completed";


        }



        if(e.message){


            e.message.textContent =

                "Your payment could not be verified.";


        }



        if(e.subscriptionBox){


            e.subscriptionBox.hidden = true;


        }



        if(e.failedBox){


            e.failedBox.hidden = false;


        }


    },



    formatDate(value){


        if(

            !value ||

            value === "-" ||

            value === "null"

        ){

            return "-";

        }



        const date =

            new Date(

                Number(value)

            );



        if(

            Number.isNaN(

                date.getTime()

            )

        ){

            return value;

        }



        return date.toLocaleDateString(

            undefined,

            {

                year:"numeric",

                month:"long",

                day:"numeric"

            }

        );


    }


};



document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        StatusPage.init();


    }

);
