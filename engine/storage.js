"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Storage Manager

   Stores:

   - Groq API Key
   - Unique ID
   - Expiry
   - Last Subscription Check

   Production Version
   ========================================================================== */


const Storage = {


    setString(key, value){

        localStorage.setItem(
            key,
            String(value)
        );

        return true;

    },




    getString(key, fallback = ""){

        const value =
            localStorage.getItem(key);


        return value === null
            ? fallback
            : value;

    },





    setObject(key, value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

        return true;

    },





    getObject(key, fallback = null){

        try{


            const value =

                localStorage.getItem(key);



            return value === null

                ? fallback

                : JSON.parse(value);


        }

        catch(error){

            return fallback;

        }


    },







    remove(key){

        localStorage.removeItem(key);

    },







    clear(){

        localStorage.clear();

    },








    saveApiKey(key){


        return this.setString(

            VW_CONFIG.STORAGE_KEYS.API_KEY,

            key

        );


    },








    getApiKey(){


        return this.getString(

            VW_CONFIG.STORAGE_KEYS.API_KEY,

            ""

        );


    },









    saveSubscription(data){


        if(
            !data ||
            typeof data !== "object"
        ){

            return false;

        }



        if(data.uniqueId){


            this.setString(

                VW_CONFIG.STORAGE_KEYS.UNIQUE_ID,

                data.uniqueId

            );


        }




        if(data.expires){


            this.setString(

                VW_CONFIG.STORAGE_KEYS.EXPIRY,

                String(data.expires)

            );


        }




        this.setString(

            VW_CONFIG.STORAGE_KEYS.LAST_CHECK,

            String(Date.now())

        );



        return true;


    }







};





export default Storage;
