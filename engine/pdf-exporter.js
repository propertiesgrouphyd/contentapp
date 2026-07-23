"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Professional PDF Exporter
   Production Version

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


        const content =
            output.innerHTML.trim();


        if(!content){

            return false;

        }


        if(!window.html2pdf){

            throw new Error(
                "PDF library not loaded."
            );

        }


        const date =
            new Date()
            .toISOString()
            .split("T")[0];



        const wrapper =
            document.createElement(
                "div"
            );


        wrapper.className =
            "vw-pdf-page";


        wrapper.innerHTML =
            content;



        /*
            PDF document styling

            Visible layout engine,
            hidden from user,
            but available for html2canvas
        */


        Object.assign(

            wrapper.style,

            {

                position:"absolute",

                left:"0",

                top:"0",

                width:"794px",

                minHeight:"1123px",

                padding:"40px",

                background:"#ffffff",

                color:"#000000",

                boxSizing:"border-box",

                fontFamily:
                "Arial, Helvetica, sans-serif",

                visibility:"hidden"

            }

        );



        document.body.appendChild(
            wrapper
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
