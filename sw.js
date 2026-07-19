"use strict";


const CACHE_NAME = "vidhwaan-ai-runtime-v2";



self.addEventListener(

"install",

event=>{


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


    const request = event.request;


    const url = new URL(

        request.url

    );





    /*
        NEVER CACHE

        Payments
        Workers
        AI APIs
        External services

    */


    if(


        url.hostname.includes("workers.dev")


        ||


        url.hostname.includes("razorpay")


        ||


        url.hostname.includes("groq")


        ||


        url.pathname.includes("/api/")


        ||


        url.pathname.includes("/create-order")


        ||


        url.pathname.includes("/verify-payment")


    ){

        return;

    }





    /*
        Only GET

    */


    if(

        request.method !== "GET"

    ){

        return;

    }







    /*
        Network First

        Always get latest version.

        Cache only if offline.

    */


    event.respondWith(


        fetch(request)

        .then(

            response=>{


                /*
                    Save successful
                    static responses

                */


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


});
