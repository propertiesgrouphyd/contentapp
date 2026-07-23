"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Professional A4 PDF Exporter

   - Same output on mobile and desktop
   - Uses editor content
   - Preserves formatting
   - No empty PDF
   - Multi page support
   ========================================================================== */


const PDFExporter = {


async download(){


const output =
document.getElementById("vw-output");


if(!output || !output.innerText.trim()){

    return false;

}


if(!window.html2canvas || !window.jspdf){

    throw new Error("PDF libraries missing");

}


const clone =
output.cloneNode(true);



clone.removeAttribute(
"contenteditable"
);



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



document.body.appendChild(clone);



try{


const canvas =
await html2canvas(

clone,

{

scale:2,

backgroundColor:"#ffffff",

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
pdf.internal.pageSize.getWidth();


const pageHeight =
pdf.internal.pageSize.getHeight();


const margin = 10;


const imgWidth =
pageWidth - margin * 2;


const imgHeight =
canvas.height * imgWidth / canvas.width;


const imgData =
canvas.toDataURL(
"image/png"
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
pageHeight - margin * 2;



while(heightLeft > 0){


position =
heightLeft - imgHeight + margin;



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
pageHeight - margin * 2;


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
