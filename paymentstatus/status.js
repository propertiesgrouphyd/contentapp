"use strict";


/* ==========================================================================
   VIDHWAAN AI Writer

   Payment Status Controller

   - Save subscription locally
   - Fetch R2 JSON
   - Generate Tax Invoice PDF

   ========================================================================== */


import Storage from "../engine/storage.js";



const StatusPage = {


    data:null,


    elements:{},




    init(){


        this.cacheElements();


        this.bindEvents();


        this.load();


    },






    cacheElements(){


        const $ = id =>

        document.getElementById(id);



        this.elements = {


            icon:
            $("statusIcon"),


            title:
            $("statusTitle"),


            message:
            $("statusMessage"),


            subscriptionBox:
            $("subscriptionBox"),


            subscriptionId:
            $("subscriptionId"),


            invoiceNumber:
            $("invoiceNumber"),


            expiryDate:
            $("expiryDate"),


            downloadInvoice:
            $("downloadInvoice"),


            failedBox:
            $("failedBox"),


            backButton:
            $("backButton")


        };


    },







    bindEvents(){



        this.elements.backButton?.addEventListener(

            "click",

            ()=>{


                window.location.href =

                "https://writer.vidhwaan.com";


            }

        );







        this.elements.downloadInvoice?.addEventListener(

            "click",

            ()=>{


                this.generateInvoice();


            }

        );



    },









    async load(){



        const params =

        new URLSearchParams(

            window.location.search

        );



        const status =

        params.get("status");



        const uniqueId =

        params.get("id");



        const expires =

        params.get("expires");







        if(

            status !== "success" ||

            !uniqueId

        ){



            this.showFailed();


            return;


        }







        /*
           Save using existing storage system

           Required by app.js /
           subscription-manager.js

        */


        Storage.saveSubscription({

            uniqueId,

            expires:Number(expires)

        });








        this.elements.subscriptionId.textContent =

        uniqueId;






        this.elements.expiryDate.textContent =

        this.formatDate(expires);







        await this.loadInvoice(uniqueId);



    },









    async loadInvoice(uniqueId){



        try{



            const response =

            await fetch(


                "https://subscriptions.propertiesgrouphyd.online/subscriptions/" +

                encodeURIComponent(uniqueId) +

                ".json",


                {


                    cache:"no-store"


                }


            );







            if(!response.ok){


                throw new Error(

                    "Invoice record not found"

                );


            }







            this.data =

            await response.json();








            this.elements.invoiceNumber.textContent =

            this.data.invoice?.invoiceNumber ||

            "-";







            this.elements.downloadInvoice.hidden =

            false;



        }


        catch(error){



            console.error(

                "Invoice load failed:",

                error

            );


        }



    },









    generateInvoice(){



        if(!this.data){



            alert(

                "Invoice data not available."

            );


            return;


        }







        const data =

        this.data;





        const company =

        data.company || {};



        const customer =

        data.customer || {};



        const gst =

        data.gst || {};



        const payment =

        data.payment || {};



        const invoice =

        data.invoice || {};








        const html = `

<!DOCTYPE html>

<html>

<head>

<title>

${invoice.invoiceNumber || "Invoice"}

</title>


<style>


body{

font-family:Arial,sans-serif;

padding:40px;

color:#111;

}



h1{

font-size:24px;

}



table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}



td,th{

border:1px solid #ccc;

padding:10px;

}



.total{

font-weight:bold;

}



</style>


</head>


<body>



<h1>

${company.brand || "VIDHWAAN AI Writer"}

</h1>



<h3>

TAX INVOICE

</h3>



<p>

Issued By:

<br>

${company.legalName || "GIDIGI TECHNOLOGIES PRIVATE LIMITED"}

</p>



<hr>




<p>

Invoice Number:

${invoice.invoiceNumber || "-"}

</p>





<h3>

Customer Details

</h3>



<p>

${customer.firstName || ""}

${customer.lastName || ""}

</p>


<p>

${customer.companyName || ""}

</p>


<p>

Email:

${customer.email || "-"}

</p>


<p>

GSTIN:

${customer.gstin || "-"}

</p>


<p>

State:

${customer.state || "-"}

</p>




<table>


<tr>

<th>

Description

</th>


<th>

Amount

</th>

</tr>



<tr>

<td>

VIDHWAAN AI Writer Monthly Subscription

</td>


<td>

₹${gst.taxableAmount || 0}

</td>


</tr>



<tr>

<td>

CGST

</td>


<td>

₹${gst.cgst || 0}

</td>


</tr>



<tr>

<td>

SGST

</td>


<td>

₹${gst.sgst || 0}

</td>


</tr>



<tr>

<td>

IGST

</td>


<td>

₹${gst.igst || 0}

</td>


</tr>



<tr class="total">


<td>

Total Paid

</td>


<td>

₹${gst.totalAmount || 0}

</td>


</tr>


</table>





<p>

Payment ID:

${payment.paymentId || "-"}

</p>



<p>

Order ID:

${payment.orderId || "-"}

</p>



<br>


<p>

Thank you for choosing VIDHWAAN AI Writer.

</p>




</body>


</html>

`;







        const windowPrint =

        window.open(

            "",

            "_blank"

        );





        windowPrint.document.write(

            html

        );


        windowPrint.document.close();





        windowPrint.onload = ()=>{


            windowPrint.print();


        };



    },









    showFailed(){



        this.elements.subscriptionBox.hidden =

        true;



        this.elements.failedBox.hidden =

        false;



        this.elements.icon.textContent =

        "!";



        this.elements.icon.classList.add(

            "failed"

        );



        this.elements.title.textContent =

        "Payment Failed";



        this.elements.message.textContent =

        "Payment verification was not completed.";



    },









    formatDate(value){



        if(!value){


            return "-";


        }





        return new Date(

            Number(value)

        ).toLocaleDateString(

            undefined,

            {


                year:"numeric",


                month:"long",


                day:"numeric"


            }


        );


    }



};







document.addEventListener(

"DOMContentLoaded",

()=>{


    StatusPage.init();


}

);
