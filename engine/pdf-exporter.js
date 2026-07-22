"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Professional PDF Exporter

   Production Version

   Features:
   - A4 PDF
   - Real HTML rendering
   - Proper page breaks
   - Preserves editor formatting
   - Headings
   - Bold
   - Italic
   - Colors
   - Highlights
   - Lists
   - Paragraph spacing
   - Mobile safe

   ========================================================================== */


const PDFExporter = {


    async download(){


        const output =

            document.getElementById(

                "vw-output"

            );



        if(!output){

            throw new Error(

                "Editor content not found."

            );

        }



        const text =

            output.innerText ||

            "";



        if(

            !text.trim()

        ){

            throw new Error(

                "Nothing to export."

            );

        }



        if(

            !window.jspdf ||

            !window.jspdf.jsPDF

        ){

            throw new Error(

                "PDF library not loaded."

            );

        }



        const {

            jsPDF

        } = window.jspdf;



        try{


            const pdf =

                new jsPDF(

                    {

                        orientation:"portrait",

                        unit:"mm",

                        format:"a4"

                    }

                );



            await pdf.html(

                output,

                {


                    margin:[

                        12,

                        12,

                        12,

                        12

                    ],



                    autoPaging:"text",



                    html2canvas:{


                        scale:2,


                        useCORS:true,


                        allowTaint:false,


                        backgroundColor:"#ffffff",


                        logging:false


                    },



                    callback:(doc)=>{


                        const date =

                            new Date()

                            .toISOString()

                            .split("T")[0];



                        doc.save(

                            `VIDHWAAN-AI-Writer-${date}.pdf`

                        );


                    }



                }

            );



            return true;


        }


        catch(error){



            console.error(

                "PDF export failed:",

                error

            );



            throw new Error(

                "Unable to create PDF."

            );


        }


    }


};



export default PDFExporter;
