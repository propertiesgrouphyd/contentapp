"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Editor Manager
   Production Version

   Handles:

   • Rich text editing
   • Formatting toolbar
   • Secure paste
   • Undo / redo
   • Draft recovery
   • Selection handling
   • Mobile editing

   ========================================================================== */


const EditorManager = {


    output:null,

    initialized:false,


    draftKey:

        "VIDHWAAN_AI_WRITER_EDITOR_DRAFT_V2",



    history:[],

    historyIndex:-1,


    savedRange:null,


    historyTimer:null,



    /* ==========================================================
       INITIALIZE
       ========================================================== */


    init(){


        const output =

            document.getElementById(

                "vw-output"

            );



        if(!output){

            return;

        }



        this.output = output;



        if(this.initialized){

            return;

        }



        this.initialized = true;



        this.bindEvents();


        this.bindToolbar();


        this.bindKeyboard();



        this.restoreDraft();



        this.saveHistory();



        this.updateCounts();


    },



    /* ==========================================================
       SECURITY SANITIZER
       ========================================================== */


    sanitizeHTML(html){


        const template =

            document.createElement(

                "template"

            );



        template.innerHTML = html;



        template.content

        .querySelectorAll(

            "script,iframe,object,embed,style"

        )

        .forEach(

            element =>

                element.remove()

        );



        template.content

        .querySelectorAll("*")

        .forEach(element=>{


            [...element.attributes]

            .forEach(attribute=>{


                if(

                    attribute.name

                    .toLowerCase()

                    .startsWith("on")

                ){

                    element.removeAttribute(

                        attribute.name

                    );

                }



                if(

                    attribute.name === "style"

                ){

                    element.setAttribute(

                        "style",

                        attribute.value

                        .replace(

                            /expression\s*\([^)]*\)/gi,

                            ""

                        )

                    );

                }


            });


        });



        return template.innerHTML;


    },



    /* ==========================================================
       EVENTS
       ========================================================== */


    bindEvents(){


        this.output.addEventListener(

            "input",

            ()=>{


                this.saveSelection();


                this.updateCounts();


                this.saveDraft();



                clearTimeout(

                    this.historyTimer

                );



                this.historyTimer =

                    setTimeout(

                        ()=>{

                            this.saveHistory();

                        },

                        500

                    );



                this.dispatchChange();


            }

        );



        this.output.addEventListener(

            "mouseup",

            ()=>{


                this.saveSelection();

                this.updateToolbarState();


            }

        );



        this.output.addEventListener(

            "keyup",

            ()=>{


                this.saveSelection();

                this.updateToolbarState();


            }

        );



        this.output.addEventListener(

            "paste",

            event =>

                this.handlePaste(event)

        );



    },


    /* ==========================================================
       SECURE HTML PASTE
       ========================================================== */


    handlePaste(event){


        event.preventDefault();



        const clipboard =

            event.clipboardData;



        if(!clipboard){

            return;

        }



        const html =

            clipboard.getData(

                "text/html"

            );



        const text =

            clipboard.getData(

                "text/plain"

            );



        let content = "";



        if(html){


            content =

                this.sanitizeHTML(

                    html

                );


        }

        else{


            content =

                this.escapeHTML(

                    text

                )

                .replace(

                    /\n/g,

                    "<br>"

                );


        }



        document.execCommand(

            "insertHTML",

            false,

            content

        );



        this.finishEdit();


    },



    escapeHTML(text=""){


        return text

            .replace(

                /&/g,

                "&amp;"

            )

            .replace(

                /</g,

                "&lt;"

            )

            .replace(

                />/g,

                "&gt;"

            );


    },



    /* ==========================================================
       TOOLBAR + SHORTCUTS
       ========================================================== */


    bindToolbar(){


        const buttons = {

            bold:
                "vw-bold-btn",

            italic:
                "vw-italic-btn",

            undo:
                "vw-undo-btn",

            redo:
                "vw-redo-btn"

        };


        const color =
            document.getElementById(
                "vw-text-color"
            );


        const highlight =
            document.getElementById(
                "vw-highlight-btn"
            );


        const increase =
            document.getElementById(
                "vw-font-increase"
            );


        const decrease =
            document.getElementById(
                "vw-font-decrease"
            );


        if(color){

            color.addEventListener(
                "change",
                ()=>{

                    this.applyColor(
                        color.value
                    );

                }
            );

        }


        if(highlight){

            highlight.addEventListener(
                "click",
                ()=>{

                    this.applyHighlight();

                }
            );

        }


        if(increase){

            increase.addEventListener(
                "click",
                ()=>{

                    this.changeFontSize(2);

                }
            );

        }


        if(decrease){

            decrease.addEventListener(
                "click",
                ()=>{

                    this.changeFontSize(-2);

                }
            );

        }



        Object.entries(buttons)

        .forEach(

            ([command,id])=>{


                const button =

                    document.getElementById(

                        id

                    );



                if(!button){

                    return;

                }



                button.addEventListener(

                    "click",

                    ()=>{


                        if(

                            command === "undo"

                        ){

                            this.undo();

                            return;

                        }



                        if(

                            command === "redo"

                        ){

                            this.redo();

                            return;

                        }



                        this.applyCommand(

                            command

                        );


                    }

                );


            }

        );


    },



    bindKeyboard(){


        this.output.addEventListener(

            "keydown",

            event=>{


                if(

                    event.ctrlKey &&

                    event.key.toLowerCase()

                    === "b"

                ){

                    event.preventDefault();

                    this.applyCommand(

                        "bold"

                    );

                }



                if(

                    event.ctrlKey &&

                    event.key.toLowerCase()

                    === "i"

                ){

                    event.preventDefault();

                    this.applyCommand(

                        "italic"

                    );

                }



                if(

                    event.ctrlKey &&

                    event.key.toLowerCase()

                    === "z"

                ){

                    event.preventDefault();

                    this.undo();

                }



                if(

                    event.ctrlKey &&

                    event.key.toLowerCase()

                    === "y"

                ){

                    event.preventDefault();

                    this.redo();

                }


            }

        );


    },

    /* ==========================================================
       APPLY COMMAND
       ========================================================== */


    applyCommand(command){


        this.restoreSelection();



        document.execCommand(

            command,

            false,

            null

        );



        this.saveSelection();



        this.updateToolbarState();


        this.updateCounts();


        this.saveDraft();


        this.saveHistory();


        this.dispatchChange();


    },



    /* ==========================================================
       TEXT COLOR
       ========================================================== */


    applyColor(color){


        this.restoreSelection();



        if(

            !color

        ){

            return;

        }



        const span =

            document.createElement(

                "span"

            );



        span.style.color =

            color;



        this.wrapSelection(

            span

        );



        this.finishEdit();


    },



    /* ==========================================================
       HIGHLIGHT
       ========================================================== */


    applyHighlight(){


        this.restoreSelection();



        const span =

            document.createElement(

                "span"

            );



        span.style.backgroundColor =

            "#fff59d";



        this.wrapSelection(

            span

        );



        this.finishEdit();


    },



    /* ==========================================================
       FONT SIZE
       ========================================================== */


    changeFontSize(value){


        this.restoreSelection();



        const span =

            document.createElement(

                "span"

            );



        span.style.fontSize =

            `${value}px`;



        this.wrapSelection(

            span

        );



        this.finishEdit();


    },



    /* ==========================================================
       WRAP SELECTION
       ========================================================== */


    wrapSelection(element){


        const selection =

            window.getSelection();



        if(

            !selection ||

            !selection.rangeCount

        ){

            return false;

        }



        const range =

            selection.getRangeAt(0);



        try{


            range.surroundContents(

                element

            );


        }

        catch(error){



            const fragment =

                range.extractContents();



            element.appendChild(

                fragment

            );



            range.insertNode(

                element

            );


        }



        selection.removeAllRanges();



        const newRange =

            document.createRange();



        newRange.selectNodeContents(

            element

        );



        selection.addRange(

            newRange

        );



        return true;


    },



    /* ==========================================================
       SELECTION
       ========================================================== */


    saveSelection(){


        const selection =

            window.getSelection();



        if(

            selection &&

            selection.rangeCount

        ){


            this.savedRange =

                selection.getRangeAt(0);


        }


    },



    restoreSelection(){


        if(

            !this.savedRange

        ){

            return;

        }



        const selection =

            window.getSelection();



        if(!selection){

            return;

        }



        selection.removeAllRanges();



        selection.addRange(

            this.savedRange

        );



        this.output.focus();


    },

    /* ==========================================================
       FINISH EDIT ACTION
       ========================================================== */


    finishEdit(){


        this.saveSelection();


        this.updateToolbarState();


        this.updateCounts();


        this.saveDraft();


        this.saveHistory();


        this.dispatchChange();


    },



    /* ==========================================================
       HISTORY
       ========================================================== */


    saveHistory(){


        if(!this.output){

            return;

        }



        const html =

            this.output.innerHTML;



        if(

            this.history[

                this.historyIndex

            ] === html

        ){

            return;

        }



        this.history =

            this.history.slice(

                0,

                this.historyIndex + 1

            );



        this.history.push(

            html

        );



        this.historyIndex =

            this.history.length - 1;



        if(

            this.history.length > 50

        ){


            this.history.shift();


            this.historyIndex--;


        }


    },



    undo(){


        if(

            this.historyIndex <= 0

        ){

            return;

        }



        this.historyIndex--;



        this.output.innerHTML =

            this.history[

                this.historyIndex

            ];



        this.afterHistoryChange();


    },



    redo(){


        if(

            this.historyIndex >=

            this.history.length - 1

        ){

            return;

        }



        this.historyIndex++;



        this.output.innerHTML =

            this.history[

                this.historyIndex

            ];



        this.afterHistoryChange();


    },



    afterHistoryChange(){


        this.savedRange = null;



        const selection =

            window.getSelection();



        selection?.removeAllRanges();



        this.updateCounts();


        this.updateToolbarState();


        this.saveDraft();


        this.dispatchChange();


    },



    /* ==========================================================
       WORD COUNT
       ========================================================== */


    updateCounts(){


        if(!this.output){

            return;

        }



        const text =

            this.output.innerText ||

            "";



        const words =

            text.trim()

                ? text.trim()

                    .split(/\s+/)

                    .length

                : 0;



        const characters =

            text.length;



        const wordCount =

            document.getElementById(

                "vw-word-count"

            );



        const characterCount =

            document.getElementById(

                "vw-character-count"

            );



        if(wordCount){

            wordCount.textContent =

                words;

        }



        if(characterCount){

            characterCount.textContent =

                characters;

        }


    },



    /* ==========================================================
       TOOLBAR STATE
       ========================================================== */


    updateToolbarState(){


        const selection =

            window.getSelection();



        if(

            !selection ||

            !selection.rangeCount

        ){

            return;

        }



        let element =

            selection

            .getRangeAt(0)

            .commonAncestorContainer;



        if(

            element.nodeType === 3

        ){

            element =

                element.parentElement;

        }



        if(!element){

            return;

        }



        const style =

            window.getComputedStyle(

                element

            );



        const bold =

            document.getElementById(

                "vw-bold-btn"

            );



        const italic =

            document.getElementById(

                "vw-italic-btn"

            );



        if(bold){

            bold.classList.toggle(

                "active",

                style.fontWeight === "bold" ||

                Number(style.fontWeight) >= 700

            );

        }



        if(italic){

            italic.classList.toggle(

                "active",

                style.fontStyle === "italic"

            );

        }


    },

    /* ==========================================================
       DRAFT STORAGE
       ========================================================== */


    saveDraft(){


        if(!this.output){

            return;

        }



        const html =

            this.cleanHTML(

                this.output.innerHTML

            );



        if(

            !html ||

            html.includes(

                "vw-empty-state"

            )

        ){

            this.clearDraft();

            return;

        }



        try{


            localStorage.setItem(

                this.draftKey,

                html

            );


        }

        catch(error){


            console.error(

                "Draft save failed:",

                error

            );


        }


    },



    restoreDraft(){


        if(!this.output){

            return;

        }



        let draft = "";



        try{


            draft =

                localStorage.getItem(

                    this.draftKey

                );


        }

        catch(error){


            return;

        }



        if(

            draft &&

            draft.trim()

        ){


            this.output.innerHTML =

                this.sanitizeHTML(

                    draft

                );



            this.history = [];

            this.historyIndex = -1;



            this.saveHistory();


            this.updateCounts();


        }


    },



    clearDraft(){


        try{


            localStorage.removeItem(

                this.draftKey

            );


        }

        catch(error){



        }


    },



    /* ==========================================================
       CLEAN HTML
       ========================================================== */


    cleanHTML(html){


        const template =

            document.createElement(

                "template"

            );



        template.innerHTML = html;



        template.content

        .querySelectorAll(

            "span"

        )

        .forEach(span=>{


            const style =

                span.getAttribute(

                    "style"

                );



            if(

                !style

            ){

                span.replaceWith(

                    ...span.childNodes

                );

            }


        });



        return template.innerHTML.trim();


    },



    /* ==========================================================
       RESET
       ========================================================== */


    reset(){


        this.clearDraft();



        if(this.output){


            this.output.innerHTML = "";


        }



        this.history = [];


        this.historyIndex = -1;

        this.saveHistory();


        this.savedRange = null;



        const selection =

            window.getSelection();



        selection?.removeAllRanges();



        this.updateCounts();


        this.dispatchChange();


    },



    /* ==========================================================
       CHANGE EVENT
       ========================================================== */


    dispatchChange(){


        if(!this.output){

            return;

        }



        this.output.dispatchEvent(

            new CustomEvent(

                "vw-editor-change",

                {

                    detail:{

                        html:

                        this.output.innerHTML

                    }

                }

            )

        );


    },


    /* ==========================================================
       COLOR STATE
       ========================================================== */


    updateColorState(){


        const color =

            document.getElementById(

                "vw-text-color"

            );



        if(!color){

            return;

        }



        const selection =

            window.getSelection();



        if(

            !selection ||

            !selection.rangeCount

        ){

            return;

        }



        let element =

            selection

            .getRangeAt(0)

            .commonAncestorContainer;



        if(

            element.nodeType === 3

        ){

            element =

                element.parentElement;

        }



        if(!element){

            return;

        }



        const computed =

            window.getComputedStyle(

                element

            );



        color.value =

            this.rgbToHex(

                computed.color

            );


    },



    rgbToHex(rgb){


        if(

            typeof rgb !== "string"

        ){

            return "#000000";

        }



        const values =

            rgb.match(

                /\d+/g

            );



        if(

            !values ||

            values.length < 3

        ){

            return "#000000";

        }



        return (

            "#" +

            values

            .slice(0,3)

            .map(

                value =>

                Number(value)

                .toString(16)

                .padStart(2,"0")

            )

            .join("")

        );


    }



};



export default EditorManager;



