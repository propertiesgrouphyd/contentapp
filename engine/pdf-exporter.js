"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Professional A4 PDF Exporter

   Features:
   - No empty PDF
   - Same output mobile + desktop
   - Preserves editor content
   - Preserves formatting
   - Stable bullets and numbers
   - Stable highlights
   - Multi page A4 PDF

   ========================================================================== */


const PDFExporter = {


async download(){


    const output =
        document.getElementById(
            "vw-output"
        );


    if(
        !output ||
        !output.innerText.trim()
    ){

        return false;

    }



    if(
        !window.html2canvas ||
        !window.jspdf
    ){

        throw new Error(
            "PDF libraries missing"
        );

    }



    const clone =
        output.cloneNode(true);



    clone.removeAttribute(
        "contenteditable"
    );



    /*
       PDF-only list normalization

       Convert browser markers
       into normal text.
    */

    clone.querySelectorAll(
        "ul,ol"
    )
    .forEach(list=>{


        const isNumber =
            list.tagName === "OL";


        list.style.listStyleType =
            "none";


        Array.from(
            list.children
        )
        .forEach(
            (li,index)=>{


                const prefix =
                    isNumber
                    ? `${index + 1}. `
                    : "• ";


                li.insertBefore(

                    document.createTextNode(
                        prefix
                    ),

                    li.firstChild

                );


            }
        );


    });



    /*
       Highlight alignment fix
    */


    clone.querySelectorAll(
        "span"
    )
    .forEach(span=>{


        if(
            span.style.backgroundColor
        ){

            span.style.padding =
                "2px 0";


            span.style.lineHeight =
                "1.7";


        }


    });



    Object.assign(

        clone.style,

        {

            position:"absolute",

            left:"0",

            top:"0",

            width:"794px",

            padding:"60px",

            background:"#ffffff",

            color:"#111827",

            boxSizing:"border-box",

            fontFamily:
            "Arial, Helvetica, sans-serif",

            fontSize:"17px",

            lineHeight:"1.7"

        }

    );



    /*
       PDF list styling
    */


    clone.querySelectorAll(
        "li"
    )
    .forEach(li=>{


        li.style.display =
            "list-item";


        li.style.lineHeight =
            "1.7";


    });



    document.body.appendChild(
        clone
    );



    try{


        const canvas =
            await html2canvas(

                clone,

                {

                    scale:2,

                    backgroundColor:
                    "#ffffff",

                    useCORS:true,

                    logging:false,

                    windowWidth:794

                }

            );



        const pdf =
            new jspdf.jsPDF(

                "p",

                "mm",

                "a4"

            );



        const pageWidth =
            pdf.internal.pageSize
            .getWidth();


        const pageHeight =
            pdf.internal.pageSize
            .getHeight();



        const margin = 10;



        const imgWidth =
            pageWidth -
            (
                margin * 2
            );



        const imgHeight =
            canvas.height *
            imgWidth /
            canvas.width;



        const imgData =
            canvas.toDataURL(
                "image/png",
                1.0
            );



        let heightLeft =
            imgHeight;



        let position =
            margin;



        pdf.addImage(

            imgData,

            "PNG",

            margin,

            position,

            imgWidth,

            imgHeight

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
                imgHeight +
                margin;



            pdf.addPage();



            pdf.addImage(

                imgData,

                "PNG",

                margin,

                position,

                imgWidth,

                imgHeight

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



    }

    finally{


        clone.remove();


    }



    return true;


}


};


export default PDFExporter;
