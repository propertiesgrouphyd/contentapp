"use strict";


/* ==========================================================================
   VIDHWAAN AI Writer

   Payment Status Controller

   - Reads subscription ID
   - Fetches R2 JSON
   - Displays invoice number
   - Generates PDF invoice

   ========================================================================== */


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


                this.downloadInvoice();


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



        const id =

        params.get("id");



        const expires =

        params.get("expires");






        if(

            status !== "success" ||

            !id

        ){



            this.showFailed();


            return;


        }







        localStorage.setItem(

            "VIDHWAAN_SUBSCRIPTION_ID",

            id

        );





        this.elements.subscriptionId.textContent =

        id;



        this.elements.expiryDate.textContent =

        this.formatDate(expires);






        await this.loadInvoice(id);




    },








    async loadInvoice(id){



        try{


            const response =

            await fetch(


                "https://subscriptions.propertiesgrouphyd.online/subscriptions/" +

                encodeURIComponent(id) +

                ".json",


                {


                    cache:"no-store"


                }


            );







            if(!response.ok){


                throw new Error(

                    "Subscription record not found"

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


            console.error(error);


        }



    },








    downloadInvoice(){



        if(!this.data){



            alert(

                "Invoice data not loaded."

            );


            return;


        }







        const d =

        this.data;






        const c =

        d.customer || {};



        const gst =

        d.gst || {};



        const payment =

        d.payment || {};



        const invoice =

        d.invoice || {};








        const invoiceHTML = `

<!DOCTYPE html>

<html>

<head>

<title>

${invoice.invoiceNumber}

</title>


<style>


body{

font-family:Arial,sans-serif;

padding:40px;

color:#111;

}


h1{

font-size:28px;

}


table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}


td,th{

border:1px solid #ccc;

padding:10px;

text-align:left;

}


.total{

font-weight:bold;

}


</style>

</head>


<body>


<h1>

VIDHWAAN TECHNOLOGIES PRIVATE LIMITED

</h1>


<h2>

TAX INVOICE

</h2>



<p>

Invoice Number:

${invoice.invoiceNumber || "-"}

</p>



<hr>


<h3>

Customer Details

</h3>


<p>

${c.firstName || ""}

${c.lastName || ""}

</p>


<p>

${c.companyName || ""}

</p>


<p>

GSTIN:

${c.gstin || "-"}

</p>


<p>

State:

${c.state || "-"}

</p>


<p>

Address:

${c.address || "-"}

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

Thank you for choosing VIDHWAAN.

</p>


</body>


</html>

`;








        const win =

        window.open(

            "",

            "_blank"

        );



        win.document.write(

            invoiceHTML

        );


        win.document.close();




        win.onload = ()=>{


            win.print();


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