"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Professional PDF Exporter

   Features:
   - A4 PDF
   - Preserves editor appearance
   - Headings
   - Bold
   - Italic
   - Colors
   - Highlights
   - Font sizes
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

            return false;

        }



        if(
            !output.innerText.trim()
        ){

            return false;

        }



        if(
            !window.html2canvas ||
            !window.jspdf
        ){

            throw new Error(
                "PDF libraries not loaded."
            );

        }



        const {
            jsPDF
        } =
        window.jspdf;



        const canvas =

            await html2canvas(

                output,

                {

                    scale: 2,

                    useCORS:true,

                    allowTaint:false,

                    backgroundColor:"#ffffff",

                    logging:false

                }

            );



        const pdf =

            new jsPDF(

                "p",

                "mm",

                "a4"

            );



        const pageWidth =

            pdf.internal.pageSize.getWidth();



        const pageHeight =

            pdf.internal.pageSize.getHeight();



        const margin = 10;



        const contentWidth =

            pageWidth -
            (
                margin * 2
            );



        const imageHeight =

            canvas.height *
            contentWidth /
            canvas.width;



        const imageData =

            canvas.toDataURL(
                "image/png",
                1.0
            );



        let heightLeft =
            imageHeight;



        let position =
            margin;



        pdf.addImage(

            imageData,

            "PNG",

            margin,

            position,

            contentWidth,

            imageHeight

        );



        heightLeft -=

            pageHeight -
            (
                margin * 2
            );



        while(
            heightLeft > 0
        ){


            position =

                heightLeft -
                imageHeight +
                margin;



            pdf.addPage();



            pdf.addImage(

                imageData,

                "PNG",

                margin,

                position,

                contentWidth,

                imageHeight

            );



            heightLeft -=

                pageHeight -
                (
                    margin * 2
                );


        }



        const date =

            new Date()
            .toISOString()
            .split("T")[0];



        pdf.save(

            `VIDHWAAN-AI-Writer-${date}.pdf`

        );



        return true;


    }


};


export default PDFExporter;
