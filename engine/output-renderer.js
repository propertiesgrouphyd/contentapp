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

    const output = getOutputElement();

    if (!output) {
        return false;
    }

    if (output.querySelector(".vw-empty-state")) {
        return false;
    }

    const clone = output.cloneNode(true);

    /* Remove editor-only attributes */

    clone.removeAttribute("contenteditable");
    clone.removeAttribute("spellcheck");
    clone.removeAttribute("tabindex");

    /* Remove empty paragraphs */

    clone.querySelectorAll("p").forEach(p => {

        if (!p.textContent.trim() && p.children.length === 0) {

            p.remove();

        }

    });

    /* Remove duplicate BRs */

    clone.querySelectorAll("br + br").forEach(br => {

        br.remove();

    });

    /* Normalize text */

    const html = clone.innerHTML.trim();

    const text = (
        clone.textContent || ""
    )
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    try {

        const clipboardHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body{
    font-family:Arial,Helvetica,sans-serif;
    font-size:16px;
    line-height:1.6;
    color:#111;
    word-break:break-word;
}

table{
    border-collapse:collapse;
    width:100%;
}

th,td{
    border:1px solid #d1d5db;
    padding:8px;
}

pre{
    white-space:pre-wrap;
    word-break:break-word;
}

code{
    white-space:pre-wrap;
}
</style>
</head>
<body>
${html}
</body>
</html>`;

        if (
            navigator.clipboard &&
            window.ClipboardItem &&
            navigator.clipboard.write
        ) {

            const clipboardItem = new ClipboardItem({
                "text/html": new Blob(
                    [clipboardHTML],
                    {
                        type: "text/html"
                    }
                ),
                "text/plain": new Blob(
                    [text],
                    {
                        type: "text/plain"
                    }
                )
            });

            await navigator.clipboard.write([clipboardItem]);

        } else if (
            navigator.clipboard &&
            navigator.clipboard.writeText
        ) {

            await navigator.clipboard.writeText(text);

        } else {

            fallbackCopy(text);

        }

        return true;

    } catch (error) {

        console.error("Clipboard copy failed:", error);

        fallbackCopy(text);

        return true;

    }

}



function fallbackCopy(text) {

    const textarea =

        document.createElement("textarea");

    textarea.value = text;

    textarea.setAttribute(

        "readonly",

        ""

    );

    textarea.style.position = "fixed";

    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(
        0,
        textarea.value.length
    );

    document.execCommand("copy");

    document.body.removeChild(textarea);

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
