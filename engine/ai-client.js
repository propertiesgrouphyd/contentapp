"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   AI Client
   Production Version

   Optimized:
   - Premium content quality
   - Controlled token usage
   - Stable API handling
   - Better natural writing

   ========================================================================== */


const DEFAULT_TIMEOUT = 60000;



const AIClient = {



    async generate(

        prompt,

        apiKey

    ){



        if(

            typeof prompt !== "string" ||

            !prompt.trim()

        ){

            throw new Error(
                "Prompt is required."
            );

        }



        if(

            typeof apiKey !== "string" ||

            !apiKey.trim()

        ){

            throw new Error(
                "API key not configured."
            );

        }





        const controller =

        new AbortController();





        const timeout =

        setTimeout(

            ()=>{

                controller.abort();

            },

            DEFAULT_TIMEOUT

        );






        try{



            const response =

            await fetch(



                VW_CONFIG.API.BASE_URL +

                VW_CONFIG.API.CHAT_ENDPOINT,



                {


                    method:"POST",



                    signal:controller.signal,



                    cache:"no-store",



                    headers:{



                        "Content-Type":

                        "application/json",



                        "Authorization":

                        `Bearer ${apiKey.trim()}`



                    },



                    body:JSON.stringify({



                        model:

                        VW_CONFIG.API.MODEL,



                        messages:[



                            {

                                role:"user",

                                content:

                                prompt.trim()

                            }



                        ],



                        temperature:0.8,



                        max_tokens:2048,



                        top_p:0.9,


                        frequency_penalty:0.2,


                        presence_penalty:0.1



                    })



                }



            );






            clearTimeout(timeout);






            if(!response.ok){


                throw await this.parseError(

                    response

                );


            }






            let data;



            try{


                data =

                await response.json();


            }


            catch{


                throw new Error(

                    "Invalid AI server response."

                );


            }







            const content =

            data

            ?.choices

            ?. [0]

            ?.message

            ?.content;







            if(

                typeof content !== "string" ||

                !content.trim()

            ){


                throw new Error(

                    "AI returned an empty response."

                );


            }







            return content.trim();





        }



        catch(error){



            clearTimeout(timeout);





            if(

                error.name === "AbortError"

            ){


                throw new Error(

                    "Request timed out. Please try again."

                );


            }






            if(

                error instanceof TypeError

            ){


                throw new Error(

                    "Unable to connect to AI service."

                );


            }






            throw error;




        }



    },









    async parseError(response){



        let message =

        `HTTP ${response.status}`;






        try{



            const json =

            await response.json();




            message =

            json

            ?.error

            ?.message

            ||

            json

            ?.message

            ||

            message;



        }



        catch{



        }








        switch(response.status){



            case 400:


                return new Error(

                    "Invalid request."

                );





            case 401:


                return new Error(

                    "Invalid API key."

                );





            case 403:


                return new Error(

                    "Access denied."

                );





            case 404:


                return new Error(

                    "AI service unavailable."

                );





            case 429:


                return new Error(

                    "Too many requests. Please wait."

                );





            case 500:


            case 502:


            case 503:


            case 504:



                return new Error(

                    "AI service temporarily unavailable."

                );





            default:


                return new Error(

                    message

                );



        }



    }



};





export default AIClient;
