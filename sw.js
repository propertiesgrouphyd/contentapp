"use strict";


/* ==========================================================================
   VIDHWAAN AI Writer
   Production Service Worker

   Features:
   - Safe cache versioning
   - Automatic old cache cleanup
   - Network first strategy
   - Offline fallback
   - Never cache payments
   - Never cache APIs
   - Always fresh HTML/CSS/JS
   ========================================================================== */


const CACHE_NAME =
    "vidhwaan-ai-runtime-v43";



/* ==========================================================================
   INSTALL
   ========================================================================== */


self.addEventListener(

    "install",

    event=>{


        event.waitUntil(

            self.skipWaiting()

        );


    }

);





/* ==========================================================================
   ACTIVATE
   ========================================================================== */


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

                                    return caches.delete(
                                        key
                                    );

                                }


                            }

                        )

                    )


            )


        );


        self.clients.claim();


    }

);






/* ==========================================================================
   FETCH
   ========================================================================== */


self.addEventListener(

    "fetch",

    event=>{


        const request =
            event.request;


        const url =
            new URL(
                request.url
            );





        /*
            Only GET requests
        */


        if(

            request.method !== "GET"

        ){

            return;

        }






        /*
            NEVER CACHE

            - Razorpay
            - Workers
            - AI API
            - Payments
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
            ALWAYS FRESH

            Prevent old app versions
            on PWA devices

        */


        if(

            url.pathname.endsWith(
                ".js"
            )

            ||

            url.pathname.endsWith(
                ".css"
            )

            ||

            url.pathname.endsWith(
                ".html"
            )

        ){

            return;

        }






        /*
            Network First

            Online:
                fetch latest

            Offline:
                use cache

        */


        event.respondWith(


            fetch(request)

            .then(

                response=>{


                    if(

                        response.ok

                        &&

                        url.origin === location.origin

                    ){


                        const copy =
                            response.clone();



                        caches.open(

                            CACHE_NAME

                        )

                        .then(

                            cache=>{


                                cache.put(

                                    request,

                                    copy

                                );


                            }

                        );


                    }



                    return response;


                }

            )


            .catch(

                ()=>


                    caches.match(

                        request

                    )


            )


        );


    }

);
