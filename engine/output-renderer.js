"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Output Renderer
   Global Production Version
   ========================================================================== */

const EMPTY_TEMPLATE = `
<div class="vw-empty-state">
    <h3>Nothing generated yet</h3>
    <p>
        Complete the form and click
        <strong>Generate Content</strong>.
    </p>
</div>
`;

function getOutputElement() {

    return document.getElementById(
        "vw-output"
    );

}

function render(content = "") {

    const output = getOutputElement();

    if (!output) {

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

function clear() {

    return render("");

}




async function copy() {

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


        const clone =
            output.cloneNode(true);



        /*
            Create stable clipboard formats
            for HTML and plain text
        */





        const html =
            clone.innerHTML
                .trim();



        const text =
            Array.from(
                clone.children
            )
            .map(
                item =>
                    item.textContent
                        .replace(/\s+/g," ")
                        .trim()
            )
            .filter(Boolean)
            .join("\n\n");




        if(
            navigator.clipboard &&
            window.ClipboardItem
        ){


            const item =
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
                    item
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
            "Clipboard copy failed:",
            error
        );


        return false;


    }


}


function getText() {

    const output = getOutputElement();


    if (!output) {

        return "";

    }


    let text =

        output.innerText ||

        output.textContent ||

        "";


    text = text

        .replace(/\r\n/g, "\n")

        .replace(/\n{3,}/g, "\n\n")

        .trim();


    return text;

}

function isEmpty() {

    return getText().length === 0;

}

function hasContent() {

    return !isEmpty();

}

export {

    render,

    clear,

    copy,

    getText,

    isEmpty,

    hasContent

};
