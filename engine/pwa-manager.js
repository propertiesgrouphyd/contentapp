"use strict";


/* ==========================================================================
   VIDHWAAN AI Writer

   PWA Install Manager

   Production Version

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




        /*
            Hide initially

            Show only when browser
            supports installation

        */


        button.hidden = true;






        /*
            Android install prompt

        */


        window.addEventListener(

            "beforeinstallprompt",

            event=>{


                event.preventDefault();


                deferredPrompt = event;



                button.hidden = false;



            }

        );









        /*
            Install button click

        */


        button.addEventListener(

            "click",

            async()=>{


                if(!deferredPrompt){

                    return;

                }



                const promptEvent =

                deferredPrompt;



                deferredPrompt = null;




                await promptEvent.prompt();





                const result =

                await promptEvent.userChoice;





                if(

                    result.outcome === "accepted"

                ){


                    console.log(

                        "VIDHWAAN installed"

                    );


                }





                button.hidden = true;



            }

        );








        /*
            Installed successfully

        */


        window.addEventListener(

            "appinstalled",

            ()=>{


                deferredPrompt = null;


                button.hidden = true;



                console.log(

                    "VIDHWAAN PWA installed"

                );


            }

        );





    }


};



export default PWAManager;
