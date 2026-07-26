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

                "Invoice loading failed:",

                error

            );


        }



    },



    async generateInvoice(){

        if(!this.data){

            alert(
                "Invoice data unavailable."
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



        const container = document.createElement("iframe");


        Object.assign(

            container.style,

            {

                position:"fixed",

                width:"794px",

                height:"1123px",

                left:"-10000px",

                top:"0",

                border:"0",

                visibility:"hidden"

            }

        );


        document.body.appendChild(container);



        const doc = container.contentDocument;



        doc.open();


        doc.write(`

<!DOCTYPE html>

<html>

<head>

<style>

html,body{

margin:0;

padding:0;

width:794px;

background:white;

}


body{

font-family:Arial,Helvetica,sans-serif;

padding:25px;

box-sizing:border-box;

font-size:12px;

line-height:1.4;

color:#111827;

}


.header{

border-bottom:2px solid #111827;

padding-bottom:10px;

}


.brand{

font-size:22px;

font-weight:700;

}


.company{

font-size:12px;

margin-top:5px;

color:#4b5563;

}


h2{

font-size:14px;

margin:14px 0 8px;

}


table{

width:100%;

border-collapse:collapse;

margin-bottom:8px;

}


td,th{

border:1px solid #d1d5db;

padding:5px;

font-size:10px;

}


th{

background:#f3f4f6;

}


.total{

font-weight:bold;

}


.footer{

margin-top:12px;

font-size:10px;

color:#6b7280;

}


</style>

</head>


<body>


<div class="header">

<div class="brand">
${seller.brand || "VIDHWAAN AI Writer"}
</div>

<div class="company">
${seller.legalName || "GIDIGI TECHNOLOGIES PRIVATE LIMITED"}
</div>

</div>



<h2>TAX INVOICE</h2>


<table>

<tr>
<td>Invoice Number</td>
<td>${invoice.invoiceNumber || "-"}</td>
</tr>

<tr>
<td>Invoice Date</td>
<td>${this.formatDateTime(invoice.issuedAt)}</td>
</tr>

<tr>
<td>Payment Date</td>
<td>${this.formatDateTime(payment.paidAt)}</td>
</tr>

</table>



<h2>Customer Details</h2>


<table>

<tr>
<td>Name</td>
<td>${customer.firstName || ""} ${customer.lastName || ""}</td>
</tr>


<tr>
<td>Email</td>
<td>${customer.email || "-"}</td>
</tr>


<tr>
<td>Phone</td>
<td>${customer.phone || "-"}</td>
</tr>


<tr>
<td>Company</td>
<td>${customer.companyName || "-"}</td>
</tr>


<tr>
<td>GSTIN</td>
<td>${customer.gstin || "-"}</td>
</tr>


<tr>
<td>State</td>
<td>${customer.state || "-"}</td>
</tr>


<tr>
<td>Billing Address</td>
<td>${customer.address || "-"}</td>
</tr>


</table>



<h2>Subscription Details</h2>


<table>

<tr>
<td>Plan</td>
<td>Monthly Subscription</td>
</tr>


<tr>
<td>Valid From</td>
<td>${this.formatDateTime(subscription.created)}</td>
</tr>


<tr>
<td>Valid Until</td>
<td>${this.formatDateTime(subscription.expires)}</td>
</tr>


<tr>
<td>Duration</td>
<td>${subscription.days || 30} Days</td>
</tr>


</table>



<h2>Tax Details</h2>


<table>


<tr>

<th>Description</th>

<th>Amount</th>

</tr>


<tr>

<td>Subscription Value</td>

<td>₹${this.money(gst.taxableAmount)}</td>

</tr>


<tr>

<td>CGST</td>

<td>₹${this.money(gst.cgst)}</td>

</tr>


<tr>

<td>SGST</td>

<td>₹${this.money(gst.sgst)}</td>

</tr>


<tr>

<td>IGST</td>

<td>₹${this.money(gst.igst)}</td>

</tr>


<tr class="total">

<td>Total Paid</td>

<td>₹${this.money(gst.totalAmount)}</td>

</tr>


</table>



<h2>Payment Reference</h2>


<table>

<tr>

<td>Payment ID</td>

<td>${payment.paymentId || "-"}</td>

</tr>


<tr>

<td>Order ID</td>

<td>${payment.orderId || "-"}</td>

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

`);


        doc.close();



        await new Promise(

            resolve =>

            setTimeout(resolve,300)

        );



        try{


            const canvas = await html2canvas(

                doc.body,

                {

                    scale:2,

                    backgroundColor:"#ffffff",

                    logging:false

                }

            );



            const pdf = new jspdf.jsPDF(

                "p",

                "mm",

                "a4"

            );


            const width =

            pdf.internal.pageSize.getWidth()-20;


            const height =

            canvas.height *

            width /

            canvas.width;



            pdf.addImage(

                canvas.toDataURL("image/jpeg",0.95),

                "JPEG",

                10,

                10,

                width,

                height

            );



            pdf.save(

                "VIDHWAAN-" +

                invoice.invoiceNumber +

                ".pdf"

            );


        }

        finally{


            container.remove();


        }


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
