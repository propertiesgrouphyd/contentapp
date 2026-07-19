"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   PWA Install Manager

   ========================================================================== */


let deferredPrompt = null;



const PWAManager = {


    init(){


        const button =

        document.getElementById(
            "vw-install-btn"
        );



        if(!button){

            return;

        }




        window.addEventListener(

            "beforeinstallprompt",

            event=>{


                event.preventDefault();


                deferredPrompt = event;


                button.hidden = false;


            }

        );






        button.addEventListener(

            "click",

            async()=>{


                if(!deferredPrompt){

                    return;

                }



                deferredPrompt.prompt();




                const choice =

                await deferredPrompt.userChoice;



                if(

                    choice.outcome === "accepted"

                ){

                    console.log(
                        "VIDHWAAN installed"
                    );

                }



                deferredPrompt = null;


                button.hidden = true;


            }

        );






        window.addEventListener(

            "appinstalled",

            ()=>{


                button.hidden = true;


                deferredPrompt = null;


            }

        );


    }


};



export default PWAManager;