"use strict";


const REQUIRED_FIELDS = Object.freeze([

    "purpose",
    "category",
    "topic",
    "goal",
    "contentStyle",
    "audience",
    "length"

]);


function validate(values = {}) {


    for (const field of REQUIRED_FIELDS) {

        if (!values[field]) {

            return {

                valid: false,

                message:
                    `Please select ${field}.`

            };

        }

    }


    if (
        values.customTopic &&
        values.customTopic.length > 100
    ) {

        return {

            valid: false,

            message:
                "Custom topic must be within 100 characters."

        };

    }


    return {

        valid: true,

        message: ""

    };

}


export {

    validate

};
