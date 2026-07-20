"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Editor Manager

   Handles:
   - Text color
   - Font size
   - Bold
   - Italic
   - Highlight
   - Undo / Redo

   ========================================================================== */


const EditorManager = {


    sanitizeHTML(html){

        const template =
            document.createElement(
                "template"
            );


        template.innerHTML =
            html;


        template.content
            .querySelectorAll(
                "script,iframe,object,embed"
            )
            .forEach(
                element =>
                element.remove()
            );


        template.content
            .querySelectorAll("*")
            .forEach(
                element=>{

                    [
                        ...element.attributes
                    ]
                    .forEach(
                        attribute=>{

                            if(
                                attribute.name
                                .startsWith(
                                    "on"
                                )
                            ){

                                element.removeAttribute(
                                    attribute.name
                                );

                            }

                        }
                    );

                }
            );


        return template.innerHTML;

    },




    draftKey:
        "VIDHWAAN_AI_WRITER_EDITOR_DRAFT_V1",


    output:null,

    initialized:false,


    init(){


        const start = ()=>{


            this.output =
                document.getElementById(
                    "vw-output"
                );


            if(!this.output){

                return;

            }


            if(this.initialized){

                return;

            }


            this.initialized = true;


            this.bindEvents();


            this.restoreDraft();


            this.updateCounts();


        };



        if(
            document.readyState === "loading"
        ){

            document.addEventListener(
                "DOMContentLoaded",
                start,
                {
                    once:true
                }
            );

        }
        else{

            start();

        }


    },



    bindEvents(){


        this.output.addEventListener(
            "input",
            ()=>{

                this.saveSelection();

                this.updateCounts();

                this.saveDraft();

                this.dispatchChange();

            }
        );



        this.output.addEventListener(
            "mouseup",
            ()=>{

                this.saveSelection();

                this.updateToolbarState();

                this.updateColorState();

            }
        );


        this.output.addEventListener(
            "keyup",
            ()=>{

                this.saveSelection();

                this.updateToolbarState();

                this.updateColorState();

            }
        );


        this.output.addEventListener(
            "keydown",
            (event)=>{

                if(
                    event.ctrlKey &&
                    event.key.toLowerCase() === "b"
                ){

                    event.preventDefault();

                    this.applyCommand(
                        "bold"
                    );

                }


                if(
                    event.ctrlKey &&
                    event.key.toLowerCase() === "i"
                ){

                    event.preventDefault();

                    this.applyCommand(
                        "italic"
                    );

                }


                if(
                    event.ctrlKey &&
                    event.key.toLowerCase() === "z"
                ){

                    event.preventDefault();


                    document.execCommand(
                        "undo"
                    );


                    this.saveSelection();


                    this.updateToolbarState();


                    this.updateColorState();


                    this.updateCounts();


                    this.saveDraft();


                    this.dispatchChange();

                }


                if(
                    event.ctrlKey &&
                    event.key.toLowerCase() === "y"
                ){

                    event.preventDefault();


                    document.execCommand(
                        "redo"
                    );


                    this.saveSelection();


                    this.updateToolbarState();


                    this.updateColorState();


                    this.updateCounts();


                    this.saveDraft();


                    this.dispatchChange();

                }

            }
        );


        this.output.addEventListener(
            "paste",
            (event)=>{

                event.preventDefault();


                const text =
                    event.clipboardData
                        ? event.clipboardData.getData(
                            "text/plain"
                        )
                        : "";


                document.execCommand(
                    "insertText",
                    false,
                    text
                );


                this.saveSelection();

                this.updateCounts();


                this.saveDraft();


                this.dispatchChange();

            }
        );



        this.output.addEventListener(
            "copy",
            (event)=>{


                const selection =
                    window.getSelection();


                if(
                    !selection ||
                    !selection.rangeCount
                ){

                    return;

                }


                const container =
                    document.createElement(
                        "div"
                    );


                container.appendChild(

                    selection
                        .getRangeAt(0)
                        .cloneContents()

                );


                const html =
                    container.innerHTML;


                const text =
                    selection.toString();



                if(event.clipboardData){


                    event.clipboardData.setData(

                        "text/html",

                        html

                    );


                    event.clipboardData.setData(

                        "text/plain",

                        text

                    );


                    event.preventDefault();


                }


            }
        );


        const color =
            document.getElementById(
                "vw-text-color"
            );


        const increase =
            document.getElementById(
                "vw-font-increase"
            );


        const decrease =
            document.getElementById(
                "vw-font-decrease"
            );


        const bold =
            document.getElementById(
                "vw-bold-btn"
            );


        const italic =
            document.getElementById(
                "vw-italic-btn"
            );


        const highlight =
            document.getElementById(
                "vw-highlight-btn"
            );


        const undo =
            document.getElementById(
                "vw-undo-btn"
            );


        const redo =
            document.getElementById(
                "vw-redo-btn"
            );

        const toolbar =
            document.querySelector(
                ".vw-editor-toolbar"
            );


        toolbar?.addEventListener(
            "mousedown",
            (event)=>{

                if(
                    event.target.tagName === "BUTTON" ||
                    event.target.tagName === "INPUT"
                ){

                    this.saveSelection();

                }

            }
        );


        toolbar?.addEventListener(
            "touchstart",
            ()=>{

                this.saveSelection();

            },
            {
                passive:true
            }
        );





        color?.addEventListener(
            "change",
            ()=>{

                this.applyColor(
                    color.value
                );

            }
        );



        increase?.addEventListener(
            "click",
            ()=>{

                this.changeFontSize(
                    2
                );

            }
        );



        decrease?.addEventListener(
            "click",
            ()=>{

                this.changeFontSize(
                    -2
                );

            }
        );



        bold?.addEventListener(
            "click",
            ()=>{

                this.applyCommand(
                    "bold"
                );

            }
        );



        italic?.addEventListener(
            "click",
            ()=>{

                this.applyCommand(
                    "italic"
                );

            }
        );



        highlight?.addEventListener(
            "click",
            ()=>{

                this.applyHighlight();

            }
        );



        undo?.addEventListener(
            "click",
            ()=>{

                this.restoreSelection();


                document.execCommand(
                    "undo"
                );


                this.saveSelection();



                this.updateCounts();


                this.updateToolbarState();


                this.saveDraft();


                this.dispatchChange();


            }
        );



        redo?.addEventListener(
            "click",
            ()=>{

                this.restoreSelection();


                document.execCommand(
                    "redo"
                );


                this.saveSelection();


                this.updateCounts();


                this.updateToolbarState();


                this.saveDraft();


                this.dispatchChange();


            }
        );


    },



    applyCommand(type){


        this.restoreSelection();


        document.execCommand(
            type,
            false,
            null
        );


        this.saveSelection();

        this.updateToolbarState();


        this.updateCounts();


        this.saveDraft();


        this.dispatchChange();


    },


    applyColor(color){


        this.restoreSelection();


        const selection =
            window.getSelection();


        if(
            !selection ||
            !selection.rangeCount
        ){

            return;

        }


        const range =
            selection.getRangeAt(0);


        const parent =
            range.commonAncestorContainer
                .parentElement;


        try{


            if(
                parent &&
                this.rgbToHex(
                    window.getComputedStyle(parent).color
                ) === color
            ){

                parent.style.color = "";

            }
            else{


                const span =
                    document.createElement(
                        "span"
                    );


                span.style.color =
                    color;


                this.wrapSelection(
                    span
                );

            }


        }
        catch(error){


            document.execCommand(
                "foreColor",
                false,
                color
            );


        }



        this.saveSelection();


        this.updateToolbarState();


        this.updateColorState();


        this.updateCounts();


        this.saveDraft();


        this.dispatchChange();


    },



    applyHighlight(){


        this.restoreSelection();


        const selection =
            window.getSelection();


        if(
            !selection ||
            !selection.rangeCount
        ){

            return;

        }


        const range =
            selection.getRangeAt(0);


        const parent =
            range.commonAncestorContainer
                .parentElement;



        try{


            if(
                parent &&
                window.getComputedStyle(parent).backgroundColor === "rgb(255, 245, 157)"
            ){

                parent.style.backgroundColor = "";

            }
            else{


                const span =
                    document.createElement(
                        "span"
                    );


                span.style.backgroundColor =
                    "#fff59d";


                this.wrapSelection(
                    span
                );

            }


        }
        catch(error){


            document.execCommand(
                "hiliteColor",
                false,
                "#fff59d"
            );


        }



        this.saveSelection();


        this.updateToolbarState();

        this.updateColorState();


        this.updateCounts();


        this.saveDraft();


        this.dispatchChange();


    },



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




    changeFontSize(amount){


        this.restoreSelection();


        const selection =
            window.getSelection();


        if(
            !selection ||
            !selection.rangeCount
        ){

            return;

        }


        const range =
            selection.getRangeAt(0);



        const span =
            document.createElement(
                "span"
            );


        let currentSize = 16;



        const parent =
            range.commonAncestorContainer
                .parentElement;



        if(parent){

            const computed =
                window.getComputedStyle(
                    parent
                );


            const size =
                parseInt(
                    computed.fontSize
                );


            if(!isNaN(size)){

                currentSize = size;

            }

        }



        let newSize =
            currentSize + amount;



        if(newSize < 10){

            newSize = 10;

        }


        if(newSize > 48){

            newSize = 48;

        }



        span.style.fontSize =
            `${newSize}px`;



        try{


            this.wrapSelection(
                span
            );


            this.saveSelection();


            this.updateToolbarState();


            this.updateColorState();


            this.updateCounts();

            this.saveDraft();


            this.dispatchChange();

        }
        catch(error){


            document.execCommand(
                "fontSize",
                false,
                "4"
            );


            this.saveSelection();


            this.updateToolbarState();

            this.updateColorState();


            this.updateCounts();

            this.saveDraft();


            this.dispatchChange();


        }


    },




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



        const element =
            selection
                .getRangeAt(0)
                .commonAncestorContainer
                .parentElement;



        if(!element){

            return;

        }



        const style =
            window.getComputedStyle(
                element
            );



        if(style.color){

            color.value =
                this.rgbToHex(
                    style.color
                );

        }
        else{

            color.value =
                "#000000";

        }


    },



    rgbToHex(rgb){


        if(
            typeof rgb !== "string"
        ){

            return "#000000";

        }


        const result =
            rgb.match(
                /\d+/g
            );


        if(
            !result ||
            result.length < 3
        ){

            return "#000000";

        }


        return (

            "#" +

            [
                Number(result[0]),
                Number(result[1]),
                Number(result[2])
            ]

            .map(

                value =>

                value
                .toString(16)
                .padStart(2,"0")

            )

            .join("")

        );


    },


    updateToolbarState(){


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
                document.queryCommandState(
                    "bold"
                )
            );

        }



        if(italic){

            italic.classList.toggle(
                "active",
                document.queryCommandState(
                    "italic"
                )
            );

        }


    },






    reset(){


        this.clearDraft();


        this.savedRange = null;


        const selection =
            window.getSelection();


        if(selection){

            selection.removeAllRanges();

        }



        const bold =
            document.getElementById(
                "vw-bold-btn"
            );


        const italic =
            document.getElementById(
                "vw-italic-btn"
            );



        if(bold){

            bold.classList.remove(
                "active"
            );

        }


        if(italic){

            italic.classList.remove(
                "active"
            );

        }



        const color =
            document.getElementById(
                "vw-text-color"
            );


        if(color){

            color.value =
                "#000000";

        }



        this.updateCounts();


        this.updateToolbarState();


    },


    clearDraft(){


        try{


            localStorage.removeItem(
                this.draftKey
            );


        }
        catch(error){


            console.error(
                "Draft clear failed:",
                error
            );


        }


    },



    cleanHTML(html){


        const template =
            document.createElement(
                "template"
            );


        template.innerHTML =
            html;



        template.content
            .querySelectorAll(
                "span"
            )
            .forEach(
                span=>{


                    const parent =
                        span.parentElement;



                    if(
                        parent &&
                        parent.tagName === "SPAN" &&
                        parent.getAttribute(
                            "style"
                        ) === span.getAttribute(
                            "style"
                        )
                    ){

                        span.replaceWith(
                            ...span.childNodes
                        );


                        return;

                    }



                    if(
                        !span.getAttribute(
                            "style"
                        )
                    ){

                        span.replaceWith(
                            ...span.childNodes
                        );

                    }


                }
            );


        return template.innerHTML;


    },

    saveDraft(){


        if(!this.output){

            return;

        }


        const html =
            this.cleanHTML(
                this.output.innerHTML.trim()
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


        const draft =
            localStorage.getItem(
                this.draftKey
            );


        if(
            draft &&
            draft.trim()
        ){


            this.output.innerHTML =
                this.sanitizeHTML(
                    draft
                );



            this.savedRange = null;



            const selection =
                window.getSelection();


            if(selection){

                selection.removeAllRanges();

            }



            this.updateCounts();


            this.updateToolbarState();


            this.updateColorState();


        }


    },


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


    savedRange:null,


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


        if(!this.savedRange){

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


    }


};


export default EditorManager;
