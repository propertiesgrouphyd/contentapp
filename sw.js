"use strict";


const CACHE_NAME = "vidhwaan-ai-v2";


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

            cache=>

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

            keys=>

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
       Never cache API requests
    */

    if(

        url.pathname.includes("/api/") ||

        url.hostname.includes("groq")

    ){

        return;

    }




    event.respondWith(


        fetch(event.request)

        .catch(

            ()=>caches.match(event.request)

        )


    );


});
