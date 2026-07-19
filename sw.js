"use strict";


const CACHE_NAME = "vidhwaan-ai-v8";


const APP_FILES = [

    "./",

    "./index.html",

    "./main.css",

    "./config.js",

    "./engine/app.js",

    "./manifest.json",

    "./assets/logo.svg",

    "./assets/icons/icon-192.png"

];





self.addEventListener(

"install",

event=>{


    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(

            cache =>

            cache.addAll(APP_FILES)

        )

    );


    self.skipWaiting();


});







self.addEventListener(

"activate",

event=>{


    event.waitUntil(

        caches.keys()

        .then(

            keys =>

            Promise.all(

                keys.map(

                    key=>{


                        if(

                            key !== CACHE_NAME

                        ){

                            return caches.delete(key);

                        }


                    }

                )

            )

        )

    );


    self.clients.claim();


});







self.addEventListener(

"fetch",

event=>{


    const url = new URL(

        event.request.url

    );



    /*
        NEVER INTERCEPT:

        - Payment Worker
        - Razorpay
        - AI APIs
        - External services
    */


    if(

        url.hostname.includes(
            "workers.dev"
        )

        ||

        url.hostname.includes(
            "razorpay.com"
        )

        ||

        url.hostname.includes(
            "api.razorpay.com"
        )

        ||

        url.hostname.includes(
            "groq.com"
        )

        ||

        url.pathname.includes(
            "/api/"
        )

    ){

        return;

    }




    /*
        Never handle non GET requests

        Important for payments
    */


    if(

        event.request.method !== "GET"

    ){

        return;

    }




    /*
        Network first

        Cache only fallback

    */


    event.respondWith(


        fetch(event.request)

        .catch(

            ()=>


            caches.match(

                event.request

            )

        )


    );


});
