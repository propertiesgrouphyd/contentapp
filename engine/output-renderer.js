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

    const text = getText();

    if (!text) {

        return false;

    }

    try {

        if (

            navigator.clipboard &&

            window.isSecureContext

        ) {

            await navigator.clipboard.writeText(

                text

            );

        }

        else {

            fallbackCopy(text);

        }

        return true;

    }

    catch (error) {

        try {

            fallbackCopy(text);

            return true;

        }

        catch {

            return false;

        }

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

    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);

}

function getText() {

    const output = getOutputElement();

    if (!output) {

        return "";

    }

    return (

        output.innerText ||

        output.textContent ||

        ""

    ).trim();

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
