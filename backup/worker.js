"use strict";

const SUBSCRIPTION_DAYS = 30;

// Razorpay amount
// ₹30 = 3000 paise
const AMOUNT = 100;

const ALLOWED_ORIGIN =
"https://create.vidhwaan.com";


export default {

async fetch(request, env) {


    if (request.method === "OPTIONS") {

        return cors();

    }


    const url = new URL(request.url);


    try {


        if (
            request.method === "POST" &&
            url.pathname === "/create-order"
        ) {

            return await createOrder(
                request,
                env
            );

        }



        if (
            request.method === "POST" &&
            url.pathname === "/verify-payment"
        ) {

            return await verifyPayment(
                request,
                env
            );

        }



        return json(
            {
                error:"Not Found"
            },
            404
        );


    } catch(error) {


        console.error(error);


        return json(
            {
                error:error.message
            },
            500
        );


    }


}

};





function json(
    data,
    status = 200
){

return new Response(

JSON.stringify(data),

{

status,

headers:{

"Content-Type":
"application/json",

"Access-Control-Allow-Origin":
ALLOWED_ORIGIN,

"Access-Control-Allow-Methods":
"POST, OPTIONS",

"Access-Control-Allow-Headers":
"Content-Type",

"Vary":
"Origin"

}

}

);

}





function cors(){

return new Response(
null,
{

status:204,

headers:{

"Access-Control-Allow-Origin":
ALLOWED_ORIGIN,

"Access-Control-Allow-Methods":
"POST, OPTIONS",

"Access-Control-Allow-Headers":
"Content-Type",

"Vary":
"Origin"

}

}

);

}





async function createOrder(
request,
env
){

await request.json()
.catch(()=>({}));





const auth =
btoa(
`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`
);





const response =
await fetch(

"https://api.razorpay.com/v1/orders",

{

method:"POST",

headers:{

"Authorization":
`Basic ${auth}`,

"Content-Type":
"application/json"

},

body:JSON.stringify({

amount:AMOUNT,

currency:"INR",

receipt:
`VIDHWAAN-${Date.now()}`

})

}

);





if(!response.ok){


const error =
await response.text();


throw new Error(
"Razorpay order creation failed: "
+
error
);


}




const order =
await response.json();













return json({

success:true,

key:
env.RAZORPAY_KEY_ID,

orderId:
order.id,

amount:
AMOUNT

});


}


async function verifyPayment(
    request,
    env
){


const body =
await request.json();



const {

paymentId,

orderId,

signature

} = body;




if(
!paymentId ||
!orderId ||
!signature
){

return json(
{
error:"Missing payment details"
},
400
);

}





const valid =
await verifySignature(

orderId,

paymentId,

signature,

env.RAZORPAY_KEY_SECRET

);





if(!valid){

return json(
{
error:"Invalid payment signature"
},
403
);

}


const lockKey =
`locks/${paymentId}.json`;


const lockExists =

await env.SUBSCRIPTIONS.get(
lockKey
);


if(lockExists){

const lock =
await lockExists.json();


if(
lock.expires > Date.now()
){

return json({

success:false,

error:"Payment processing"

},409);

}


}



await env.SUBSCRIPTIONS.put(

lockKey,

JSON.stringify({

created:
Date.now(),

expires:
Date.now()+60000

}),

{

httpMetadata:{

contentType:
"application/json",

cacheControl:
"no-store"

}

}

);












/*
    Generate unique subscription ID
*/


let uniqueId;


do {


    uniqueId =
    generateUniqueId();


}

while(

await env.SUBSCRIPTIONS.get(

`subscriptions/${uniqueId}.json`

)

);





const expires =

Date.now()
+
(
SUBSCRIPTION_DAYS *
24 *
60 *
60 *
1000
);






const subscription = {


uniqueId,


plan:
"monthly",


source:
"vidhwaan-ai-writer",


version:
"1.0",


created:
Date.now(),


expires,


active:true


};





/*
    Create R2 subscription JSON

    subscriptions/{uniqueId}.json

*/


await env.SUBSCRIPTIONS.put(

`subscriptions/${uniqueId}.json`,

JSON.stringify(subscription),

{

httpMetadata:{

contentType:
"application/json",

cacheControl:
"public, max-age=86400, immutable"

}

}

);






/*
    Purge cached public JSON

*/


try {


await purgeSubscription(

env,

uniqueId

);


}
catch(error){


console.error(
"Cache purge failed:",
error
);


}
finally {


await env.SUBSCRIPTIONS.delete(

lockKey

);


}






/*
    Remove temporary order

*/









return json({

success:true,

uniqueId,

expires

});


}





function generateUniqueId(){


const chars =
"ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


let id =
"VW-";



for(
let i=0;
i<8;
i++
){


id += chars[
Math.floor(
Math.random()*chars.length
)
];


}



return id;


}



async function verifySignature(
    orderId,
    paymentId,
    signature,
    secret
){


const encoder =
new TextEncoder();




const key =
await crypto.subtle.importKey(

"raw",

encoder.encode(secret),

{

name:"HMAC",

hash:"SHA-256"

},

false,

["sign"]

);






const signed =
await crypto.subtle.sign(

"HMAC",

key,

encoder.encode(

`${orderId}|${paymentId}`

)

);






const expected =

[
...new Uint8Array(signed)
]

.map(

b =>

b
.toString(16)
.padStart(2,"0")

)

.join("");






return expected === signature;


}







async function purgeSubscription(
    env,
    uniqueId
){



const url =

`https://api.cloudflare.com/client/v4/zones/${env.CF_ZONE_ID}/purge_cache`;






const fileUrl =

`https://subscriptions.propertiesgrouphyd.online/subscriptions/${uniqueId}.json`;






const response =

await fetch(

url,

{

method:"POST",

headers:{

"Authorization":

`Bearer ${env.CF_API_TOKEN}`,

"Content-Type":

"application/json"

},

body:JSON.stringify({

files:[

fileUrl

]

})

}

);







if(!response.ok){


const error =
await response.text();



throw new Error(

"Cloudflare purge failed: "

+

error

);


}





return true;


}
