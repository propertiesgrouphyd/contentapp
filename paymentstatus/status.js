"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Payment Status Controller

   Saves:
   - Subscription ID
   - Expiry locally

   ========================================================================== */


import Storage from "../storage.js";



const StatusPage = {


    init(){


        const params =

            new URLSearchParams(
                window.location.search
            );



        const status =

            params.get("status");



        const uniqueId =

            params.get("id");



        const expires =

            params.get("expires");



        const statusIcon =

            document.getElementById(
                "statusIcon"
            );


        const statusTitle =

            document.getElementById(
                "statusTitle"
            );


        const statusMessage =

            document.getElementById(
                "statusMessage"
            );


        const subscriptionId =

            document.getElementById(
                "subscriptionId"
            );


        const expiryDate =

            document.getElementById(
                "expiryDate"
            );


        const subscriptionBox =

            document.getElementById(
                "subscriptionBox"
            );


        const failedBox =

            document.getElementById(
                "failedBox"
            );



        if(
            status === "success"
        ){



            if(statusIcon){

                statusIcon.textContent =
                "✓";

            }



            if(statusTitle){

                statusTitle.textContent =
                "Payment Successful";

            }



            if(statusMessage){

                statusMessage.textContent =
                "Your VIDHWAAN AI Writer subscription is active. You can continue creating content.";

            }



            if(subscriptionId){

                subscriptionId.textContent =
                uniqueId || "-";

            }



            if(expiryDate && expires){


                expiryDate.textContent =

                new Date(
                    Number(expires)
                )
                .toLocaleDateString();


            }



            if(
                uniqueId &&
                expires
            ){


                Storage.saveSubscription({

                    uniqueId:

                    uniqueId,


                    expires:

                    Number(expires)

                });


            }


        }

        else{


            if(statusIcon){

                statusIcon.textContent =
                "×";

            }



            if(statusTitle){

                statusTitle.textContent =
                "Payment Failed";

            }



            if(statusMessage){

                statusMessage.textContent =
                "Payment was not completed.";

            }



            if(subscriptionBox){

                subscriptionBox.hidden =
                true;

            }



            if(failedBox){

                failedBox.hidden =
                false;

            }


        }




        const backButton =

            document.getElementById(
                "backButton"
            );



        if(backButton){


            backButton.onclick = ()=>{


                window.location.href =

                "https://create.vidhwaan.com";


            };


        }


    }


};




document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        StatusPage.init();


    }

);
