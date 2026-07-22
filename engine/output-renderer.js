"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Output Renderer
   Production Lightweight Version

   Responsibilities:

   • Display rendered HTML
   • Copy HTML + plain text
   • Manage output state

   ========================================================================== */



const EMPTY_TEMPLATE = `

<div class="vw-empty-state">

    <h3>Nothing generated yet</h3>

    <p>

        Complete the form and click

        <strong>

            Generate Content

        </strong>.

    </p>

</div>

`;



function getOutputElement(){


    return document.getElementById(

        "vw-output"

    );


}



/* ==========================================================
   RENDER
   ========================================================== */


function render(content = ""){


    const output =

        getOutputElement();



    if(!output){

        return false;

    }



    const html =

        typeof content === "string"

            ? content.trim()

            : "";



    output.innerHTML =

        html || EMPTY_TEMPLATE;



    output.scrollTop = 0;



    return true;


}



/* ==========================================================
   CLEAR
   ========================================================== */


function clear(){


    return render("");


}



/* ==========================================================
   CREATE CLIPBOARD HTML

   Screen HTML:
       uses CSS

   Clipboard HTML:
       uses inline styles

   Because external apps ignore our CSS.

   ========================================================== */


function createClipboardHTML(output){


    const clone =

        output.cloneNode(true);



    clone

    .querySelectorAll("p")

    .forEach(p=>{


        p.style.marginBottom =

            "1em";


        p.style.lineHeight =

            "1.6";


    });



    clone

    .querySelectorAll("h1,h2,h3")

    .forEach(h=>{


        h.style.marginTop =

            "1em";


        h.style.marginBottom =

            "0.5em";


    });



    clone

    .querySelectorAll("li")

    .forEach(li=>{


        li.style.marginBottom =

            "0.4em";


    });



    return clone.innerHTML.trim();


}


/* ==========================================================
   COPY

   Copies:
   1. HTML version
   2. Plain text version

   ========================================================== */


async function copy(){


    const output =

        getOutputElement();



    if(!output){

        return false;

    }



    if(

        output.querySelector(

            ".vw-empty-state"

        )

    ){

        return false;

    }



    try{


        const html =

            createClipboardHTML(

                output

            );



        const text =

            output.innerText

                .replace(/\n{3,}/g,"\n\n")

                .trim();




        if(

            navigator.clipboard &&

            window.ClipboardItem

        ){



            const clipboardItem =

                new ClipboardItem({



                    "text/html":

                    new Blob(

                        [

                            html

                        ],

                        {

                            type:

                            "text/html"

                        }

                    ),



                    "text/plain":

                    new Blob(

                        [

                            text

                        ],

                        {

                            type:

                            "text/plain"

                        }

                    )



                });



            await navigator.clipboard.write(

                [

                    clipboardItem

                ]

            );


        }

        else{


            const range =

                document.createRange();



            range.selectNodeContents(

                output

            );



            const selection =

                window.getSelection();



            selection.removeAllRanges();



            selection.addRange(

                range

            );



            document.execCommand(

                "copy"

            );



            selection.removeAllRanges();


        }



        return true;


    }

    catch(error){


        console.error(

            "Copy failed:",

            error

        );


        return false;


    }


}

/* ==========================================================
   TEXT EXTRACTION
   ========================================================== */


function getText(){


    const output =

        getOutputElement();



    if(!output){

        return "";

    }



    return (

        output.innerText ||

        output.textContent ||

        ""

    )

    .replace(/\r\n/g,"\n")

    .replace(/\n{3,}/g,"\n\n")

    .trim();


}



/* ==========================================================
   STATE
   ========================================================== */


function isEmpty(){


    return getText().length === 0;


}



function hasContent(){


    return !isEmpty();


}



/* ==========================================================
   EXPORT
   ========================================================== */


export {

    render,

    clear,

    copy,

    getText,

    isEmpty,

    hasContent

};
