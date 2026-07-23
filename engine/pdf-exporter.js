"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Professional PDF Exporter

   Production Version

   Features:

   - A4 document based PDF
   - Same output on mobile and desktop
   - Preserves editor HTML
   - Preserves headings
   - Preserves bold / italic
   - Preserves colors
   - Preserves highlights
   - Preserves lists
   - Better page breaks
   - Hidden export container
   - Optimized PDF quality

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



        /*
           Create isolated A4 document area

           This prevents:
           - mobile width changes
           - desktop width changes
           - editor CSS conflicts
        */


        const wrapper =

            document.createElement(
                "div"
            );



        wrapper.className =
            "vw-pdf-page";



        wrapper.innerHTML =

            output.innerHTML;



        wrapper.style.position =
            "fixed";


        wrapper.style.left =
            "-99999px";


        wrapper.style.top =
            "0";


        wrapper.style.width =
            "794px";


        wrapper.style.background =
            "#ffffff";


        wrapper.style.color =
            "#000000";



        document.body.appendChild(
            wrapper
        );



        try{


            await html2pdf()

            .set({



                filename:

                `VIDHWAAN-AI-Writer-${date}.pdf`,





                margin:[

                    15,

                    15,

                    15,

                    15

                ],





                image:{


                    type:
                    "jpeg",


                    quality:
                    0.98


                },





                html2canvas:{


                    scale:
                    2,


                    useCORS:
                    true,


                    allowTaint:
                    false,


                    backgroundColor:
                    "#ffffff",


                    logging:
                    false


                },





                pagebreak:{


                    mode:[

                        "css",

                        "legacy"

                    ]


                },





                jsPDF:{


                    unit:
                    "mm",


                    format:
                    "a4",


                    orientation:
                    "portrait"


                }



            })



            .from(wrapper)



            .save();



        }


        finally{


            wrapper.remove();


        }





        return true;


    }


};





export default PDFExporter;
