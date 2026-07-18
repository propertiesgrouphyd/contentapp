"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Subscription Manager

   Flow:

   Local Storage
        |
        |
   Unique ID
        |
        |
   Public R2 JSON
        |
        |
   Validate expiry

   ========================================================================== */


import Storage from "./storage.js";


const SubscriptionManager = {


    async check(){


        const uniqueId =
            Storage.getString(
                VW_CONFIG.STORAGE_KEYS.UNIQUE_ID,
                ""
            );



        if(!uniqueId){

            return {

                active:false,

                uniqueId:null,

                expires:null

            };

        }





        const cachedExpiry =

            Number(

                Storage.getString(

                    VW_CONFIG.STORAGE_KEYS.EXPIRY,

                    "0"

                )

            );





        const lastCheck =

            Number(

                Storage.getString(

                    VW_CONFIG.STORAGE_KEYS.LAST_CHECK,

                    "0"

                )

            );






        if(

            cachedExpiry > Date.now()

            &&

            Date.now() - lastCheck

            <

            VW_CONFIG.SUBSCRIPTION.CHECK_INTERVAL

        ){

            return {

                active:true,

                uniqueId,

                expires:cachedExpiry

            };

        }







        const url =

        `${VW_CONFIG.SUBSCRIPTION.R2_URL}/${uniqueId}.json`;







        try {


            const response =

            await fetch(

                url,

                {

                    method:"GET",

                    cache:"no-store"

                }

            );





            if(!response.ok){


                return {

                    active:false,

                    uniqueId,

                    expires:null

                };

            }







            const data =

            await response.json();







            const valid =


                data.uniqueId === uniqueId

                &&

                Number(data.expires) > Date.now();








            if(valid){


                Storage.setString(

                    VW_CONFIG.STORAGE_KEYS.EXPIRY,

                    String(data.expires)

                );



                Storage.setString(

                    VW_CONFIG.STORAGE_KEYS.LAST_CHECK,

                    String(Date.now())

                );


            }








            return {


                active:valid,


                uniqueId,


                expires:

                Number(data.expires || 0)


            };



        }

        catch(error){


            console.error(

                "Subscription check failed:",

                error

            );


            return {


                active:false,


                uniqueId,


                expires:null


            };


        }


    }



};


export default SubscriptionManager;