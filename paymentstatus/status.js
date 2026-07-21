"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Payment Status Controller

   ========================================================================== */


import Storage from "../storage.js";



const StatusPage = {



    init(){


        const params =

            new URLSearchParams(
                window.location.search
            );



        const status =

            params.get(
                "status"
            );



        const uniqueId =

            params.get(
                "id"
            );



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


        const subscriptionBox =

            document.getElementById(
                "subscriptionBox"
            );


        const failedBox =

            document.getElementById(
                "failedBox"
            );


        const subscriptionId =

            document.getElementById(
                "subscriptionId"
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
                    "Your VIDHWAAN AI Writer subscription is now activated.";

            }


            if(subscriptionId){

                subscriptionId.textContent =
                    uniqueId || "-";

            }



            /*
                Save subscription locally

                Worker should return
                expiry information in
                future enhancement.
            */


            if(uniqueId){


                Storage.saveSubscription({

                    uniqueId:

                    uniqueId,


                    active:

                    true

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


            backButton.addEventListener(

                "click",

                ()=>{


                    window.location.href =

                    "https://create.vidhwaan.com";


                }

            );


        }


    }


};



document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        StatusPage.init();


    }

);
