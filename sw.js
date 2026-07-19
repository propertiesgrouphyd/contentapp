"use strict";


const CACHE_NAME = "vidhwaan-ai-v12";



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
        NEVER INTERCEPT

        Payment Worker
        Razorpay
        AI APIs
        External APIs

    */


    if(


        url.hostname.includes(

            "workers.dev"

        )


        ||


        url.hostname.includes(

            "razorpay"

        )


        ||


        url.hostname.includes(

            "groq"

        )


        ||


        url.pathname.includes(

            "/api/"

        )


        ||


        url.pathname.includes(

            "/create-order"

        )


        ||


        url.pathname.includes(

            "/verify-payment"

        )


    ){


        return;


    }







    /*
        Never handle non GET

    */


    if(

        event.request.method !== "GET"

    ){


        return;


    }







    /*
        Network First

        Fresh app always

        Offline fallback

    */


    event.respondWith(


        fetch(

            event.request

        )


        .then(

            response=>{


                return response;


            }

        )


        .catch(


            ()=>


            caches.match(

                event.request

            )


        )


    );



});
