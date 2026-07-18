"use strict";

function buildContext(values = {}) {

    return Object.freeze({

        purpose: values.purpose || "",

        category: values.category || "",

        topic: values.topic || "",

        goal: values.goal || "",

        contentStyle: values.contentStyle || "",

        audience: values.audience || "",

        length: values.length || "",


        platform: values.platform || "",

        language: values.language || "",

        creativity: values.creativity || "",

        emoji: values.emoji || "",

        cta: values.cta || ""

    });

}


function isComplete(context) {

    const required = [

        "purpose",
        "category",
        "topic",
        "goal",
        "contentStyle",
        "audience",
        "length"

    ];

    return required.every(

        key => Boolean(context[key])

    );

}


export {

    buildContext,

    isComplete

};
