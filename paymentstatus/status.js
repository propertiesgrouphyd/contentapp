"use strict";


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


            icon:$("statusIcon"),

            title:$("statusTitle"),

            message:$("statusMessage"),

            subscriptionBox:$("subscriptionBox"),

            subscriptionId:$("subscriptionId"),

            invoiceNumber:$("invoiceNumber"),

            expiryDate:$("expiryDate"),

            downloadInvoice:$("downloadInvoice"),

            failedBox:$("failedBox"),

            backButton:$("backButton")


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







        Storage.saveSubscription({


            uniqueId,


            expires:Number(expires)


        });







        this.elements.subscriptionId.textContent =

        uniqueId;





        this.elements.expiryDate.textContent =

        this.formatDateTime(expires);






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

                    "Invoice record unavailable"

                );


            }







            this.data =

            await response.json();






            this.elements.invoiceNumber.textContent =

            this.data.invoice?.invoiceNumber || "-";






            this.elements.downloadInvoice.hidden =

            false;



        }

        catch(error){



            console.error(

                error

            );


        }


    },









    generateInvoice(){



        if(!this.data){



            alert(

                "Invoice data unavailable"

            );


            return;


        }







        const {

            seller = {},

            customer = {},

            payment = {},

            gst = {},

            invoice = {},

            subscription = {}

        } = this.data;









        const html = `

<!DOCTYPE html>

<html>

<head>

<title>

${invoice.invoiceNumber || "Invoice"}

</title>



<style>


body{

font-family:Arial,Helvetica,sans-serif;

padding:50px;

color:#111827;

}


.header{

border-bottom:2px solid #111827;

padding-bottom:20px;

}


.brand{

font-size:30px;

font-weight:700;

}


.company{

font-size:16px;

margin-top:8px;

color:#4b5563;

}



h2{

margin-top:30px;

}



table{

width:100%;

border-collapse:collapse;

margin-top:15px;

}


th{

background:#f3f4f6;

}


td,th{

border:1px solid #d1d5db;

padding:12px;

}


.total{

font-weight:bold;

font-size:17px;

}



.footer{

margin-top:40px;

font-size:14px;

color:#6b7280;

}



</style>


</head>



<body>




<div class="header">


<div class="brand">

${seller.brand}

</div>


<div class="company">

${seller.legalName}

</div>


</div>






<h2>

TAX INVOICE

</h2>





<table>


<tr>

<td>

Invoice Number

</td>


<td>

${invoice.invoiceNumber || "-"}

</td>


</tr>



<tr>

<td>

Invoice Date

</td>


<td>

${this.formatDateTime(invoice.issuedAt)}

</td>


</tr>



<tr>

<td>

Payment Date

</td>


<td>

${this.formatDateTime(payment.paidAt)}

</td>


</tr>


</table>








<h2>

Customer Details

</h2>


<table>


<tr>

<td>Name</td>

<td>

${customer.firstName || ""}

${customer.lastName || ""}

</td>

</tr>



<tr>

<td>Company</td>

<td>

${customer.companyName || "-"}

</td>

</tr>



<tr>

<td>GSTIN</td>

<td>

${customer.gstin || "-"}

</td>

</tr>



<tr>

<td>State</td>

<td>

${customer.state || "-"}

</td>

</tr>


</table>







<h2>

Subscription Details

</h2>



<table>


<tr>

<td>

Plan

</td>


<td>

Monthly Subscription

</td>

</tr>



<tr>

<td>

Valid From

</td>


<td>

${this.formatDateTime(subscription.created)}

</td>


</tr>



<tr>

<td>

Valid Until

</td>


<td>

${this.formatDateTime(subscription.expires)}

</td>


</tr>



<tr>

<td>

Duration

</td>


<td>

${subscription.days || 30} Days

</td>


</tr>



</table>








<h2>

Tax Details

</h2>



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

Subscription Value

</td>


<td>

₹${this.money(gst.taxableAmount)}

</td>


</tr>



<tr>

<td>

CGST

</td>


<td>

₹${this.money(gst.cgst)}

</td>


</tr>



<tr>

<td>

SGST

</td>


<td>

₹${this.money(gst.sgst)}

</td>


</tr>



<tr>

<td>

IGST

</td>


<td>

₹${this.money(gst.igst)}

</td>


</tr>




<tr class="total">

<td>

Total Paid

</td>


<td>

₹${this.money(gst.totalAmount)}

</td>


</tr>



</table>








<h2>

Payment Reference

</h2>



<table>


<tr>

<td>

Payment ID

</td>


<td>

${payment.paymentId || "-"}

</td>


</tr>



<tr>

<td>

Order ID

</td>


<td>

${payment.orderId || "-"}

</td>


</tr>



</table>







<div class="footer">


Thank you for choosing ${seller.brand}.


<br><br>


Issued by:

${seller.legalName}


</div>






</body>

</html>

`;







        const win =

        window.open(

            "",

            "_blank"

        );



        win.document.write(html);


        win.document.close();




        win.onload = ()=>{


            win.print();


        };



    },









    money(value){


        return Number(

            value || 0

        ).toFixed(2);


    },









    formatDateTime(value){



        if(!value){


            return "-";


        }




        return new Date(

            Number(value)

        ).toLocaleString(

            "en-IN",

            {


                year:"numeric",

                month:"long",

                day:"numeric",

                hour:"2-digit",

                minute:"2-digit"

            }


        );


    },









    showFailed(){



        this.elements.subscriptionBox.hidden = true;


        this.elements.failedBox.hidden = false;



        this.elements.icon.textContent = "!";



        this.elements.icon.classList.add(

            "failed"

        );



        this.elements.title.textContent =

        "Payment Failed";



        this.elements.message.textContent =

        "Payment verification was not completed.";



    }



};







document.addEventListener(

"DOMContentLoaded",

()=>{


    StatusPage.init();


}

);
