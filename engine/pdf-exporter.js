"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Professional PDF Exporter

   Production Version

   Features:
   - Exact editor content export
   - Includes user edits
   - Preserves HTML formatting
   - A4 PDF
   - Mobile and desktop consistent
   - Multi-page support
   - Safe cleanup

   Requires:
   html2pdf.js

   ========================================================================== */


const PDFExporter = {


    async download(){


        const output =
            document.getElementById(
                "vw-output"
            );


        if(!output){

            return false;

        }



        if(
            !output.innerText.trim()
        ){

            return false;

        }



        if(
            !window.html2pdf
        ){

            throw new Error(
                "PDF library not loaded."
            );

        }



        const date =
            new Date()
            .toISOString()
            .split("T")[0];



        const clone =
            output.cloneNode(true);



        clone.removeAttribute(
            "contenteditable"
        );



        clone.className =
            "vw-pdf-page";



        Object.assign(

            clone.style,

            {

                position:"absolute",

                left:"-10000px",

                top:"0",

                width:"794px",

                minHeight:"1123px",

                padding:"40px",

                background:"#ffffff",

                color:"#111827",

                boxSizing:"border-box",

                fontFamily:
                "Arial, Helvetica, sans-serif"

            }

        );



        clone
        .querySelectorAll(
            "p"
        )
        .forEach(p=>{

            p.style.fontSize =
                "17px";

            p.style.lineHeight =
                "1.7";

            p.style.marginBottom =
                "14px";

        });



        clone
        .querySelectorAll(
            "h1,h2,h3"
        )
        .forEach(h=>{

            h.style.pageBreakAfter =
                "avoid";

        });



        clone
        .querySelectorAll(
            "ul,ol,blockquote,table"
        )
        .forEach(block=>{

            block.style.pageBreakInside =
                "avoid";

        });



        document.body.appendChild(
            clone
        );



        try{


            await html2pdf()

            .set({

                filename:
                `VIDHWAAN-AI-Writer-${date}.pdf`,


                margin:
                [
                    15,
                    15,
                    15,
                    15
                ],


                image:
                {
                    type:"jpeg",

                    quality:0.98
                },


                html2canvas:
                {

                    scale:2,

                    useCORS:true,

                    allowTaint:false,

                    backgroundColor:"#ffffff",

                    logging:false,

                    windowWidth:794

                },


                pagebreak:
                {

                    mode:
                    [
                        "css",
                        "legacy"
                    ]

                },


                jsPDF:
                {

                    unit:"mm",

                    format:"a4",

                    orientation:"portrait"

                }


            })

            .from(clone)

            .save();


        }

        finally{


            clone.remove();


        }



        return true;


    }


};


export default PDFExporter;
