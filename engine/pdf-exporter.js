"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Professional PDF Exporter

   Production Version

   Features:
   - A4 PDF
   - Better readable text size
   - Preserves headings
   - Preserves bold / italic
   - Preserves lists
   - Preserves colors
   - Better page breaks
   - Mobile and desktop compatible

   Requires:
   html2pdf.js CDN

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

            console.error(
                "html2pdf library missing"
            );

            return false;

        }



        const clone =

            output.cloneNode(true);



        /*
            PDF document container
        */


        clone.style.width =
            "794px";


        clone.style.padding =
            "50px";


        clone.style.background =
            "#ffffff";


        clone.style.color =
            "#111827";


        clone.style.fontFamily =
            "Arial, Helvetica, sans-serif";



        /*
            Paragraph formatting
        */


        clone
        .querySelectorAll(
            "p"
        )
        .forEach(p=>{


            p.style.fontSize =
                "17px";


            p.style.lineHeight =
                "1.6";


            p.style.marginBottom =
                "12px";


            p.style.color =
                "#1f2937";


        });



        /*
            Heading formatting
        */


        clone
        .querySelectorAll(
            "h1,h2,h3"
        )
        .forEach(h=>{


            h.style.color =
                "#111827";


            h.style.pageBreakAfter =
                "avoid";


        });



        /*
            Avoid splitting important blocks
        */


        clone
        .querySelectorAll(
            "ul,ol,blockquote,table"
        )
        .forEach(block=>{


            block.style.pageBreakInside =
                "avoid";


        });



        const options = {


            margin:
            [
                15,
                15,
                15,
                15
            ],


            filename:

            "VIDHWAAN-AI-Writer.pdf",



            pagebreak:{

                mode:
                [
                    "css",
                    "legacy"
                ]

            },



            html2canvas:{

                scale:
                1.5,


                useCORS:
                true,


                backgroundColor:
                "#ffffff"

            },



            jsPDF:{

                unit:
                "mm",


                format:
                "a4",


                orientation:
                "portrait"

            }


        };



        await html2pdf()

            .set(options)

            .from(clone)

            .save();



        return true;


    }


};



export default PDFExporter;
