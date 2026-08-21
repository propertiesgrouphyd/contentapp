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
    .join("\n\n")
    .trim();

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
            clone.innerText
                .replace(/\n{3,}/g,"\n\n")
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

            temp.style.position = "fixed";
            temp.style.left = "-9999px";


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


    const clone = output.cloneNode(true);


    clone
    .querySelectorAll(
        "br"
    )
    .forEach(br=>{

        br.replaceWith("\n");

    });



    clone
    .querySelectorAll(
        "li"
    )
    .forEach(li=>{


        const parent =
            li.parentElement;


        if(
            parent &&
            parent.tagName === "OL"
        ){

            li.textContent =
                " " +
                (Array.from(parent.children)
                .indexOf(li)+1)
                +
                ". "
                +
                li.textContent;


        }
        else{

            li.textContent =
                "• " +
                li.textContent;

        }


    });



    clone
    .querySelectorAll(
        "p,h1,h2,h3,h4,h5,h6,blockquote"
    )
    .forEach(block=>{

        block.after(
            document.createTextNode("\n\n")
        );

    });



    let text =
        clone.innerText ||
        clone.textContent ||
        "";



    return text

        .replace(/\n{3,}/g,"\n\n")

        .trim();

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
