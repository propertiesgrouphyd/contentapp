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





function createClipboardHTML(output){


    const clone =
        output.cloneNode(true);



    clone
    .querySelectorAll(
        ".vw-paragraph"
    )
    .forEach(block=>{


        const p =
            document.createElement(
                "p"
            );


        p.innerHTML =
            block.innerHTML;


        block.replaceWith(
            p
        );


    });



    return Array.from(
        clone.children
    )
    .map(
        block =>
            block.outerHTML
    )
    .join("\n")
    .trim();

}



function decodeHTML(value = "") {


    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.innerHTML =
        value;


    return textarea.value;


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
            createClipboardHTML(
                output
            );



        const text =
            clone.innerHTML

                .replace(
                    /<br\s*\/?>/gi,
                    "\n"
                )


                /*
                    Preserve numbered lists
                */

                .replace(
                    /<ol[^>]*>([\s\S]*?)<\/ol>/gi,
                    (_,content)=>{

                        let number = 1;


                        return content.replace(
                            /<li[^>]*>([\s\S]*?)<\/li>/gi,
                            (_,item)=>{


                                const clean =
                                    decodeHTML(
                                        item.replace(
                                            /<[^>]+>/g,
                                            ""
                                        )
                                    )
                                    .trim();


                                return `${number++}. ${clean}\n`;


                            }
                        );

                    }
                )


                /*
                    Preserve bullet lists
                */

                .replace(
                    /<ul[^>]*>([\s\S]*?)<\/ul>/gi,
                    (_,content)=>{


                        return content.replace(
                            /<li[^>]*>([\s\S]*?)<\/li>/gi,
                            (_,item)=>{


                                const clean =
                                    decodeHTML(
                                        item.replace(
                                            /<[^>]+>/g,
                                            ""
                                        )
                                    )
                                    .trim();


                                return `• ${clean}\n`;


                            }
                        );


                    }
                )


                /*
                    Normal block spacing
                */

                .replace(
                    /<\/(p|h1|h2|h3|h4|blockquote)>/gi,
                    "\n\n"
                )


                .replace(
                    /<[^>]+>/g,
                    ""
                )


                .replace(
                    /&nbsp;/gi,
                    " "
                )


                .replace(
                    /&amp;/gi,
                    "&"
                )


                .replace(
                    /&lt;/gi,
                    "<"
                )


                .replace(
                    /&gt;/gi,
                    ">"
                )


                .replace(
                    /\n[ \t]+/g,
                    "\n"
                )


                .replace(
                    /\n{3,}/g,
                    "\n\n"
                )


                .trim();



        if(
            navigator.clipboard &&
            window.ClipboardItem
        ){


            const item =
                new ClipboardItem({

                    "text/plain":

                    new Blob(
                        [
                            text
                        ],
                        {
                            type:
                            "text/plain"
                        }
                    ),


                    "text/html":

                    new Blob(
                        [
                            html
                        ],
                        {
                            type:
                            "text/html"
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


            const temp =
                document.createElement(
                    "div"
                );


            temp.innerHTML =
                html;

            Object.assign(
                temp.style,
                {
                    position:"fixed",
                    left:"-9999px"
                }
            );


            document.body.appendChild(
                temp
            );


            const range =
                document.createRange();


            range.selectNodeContents(
                temp
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


            temp.remove();


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
