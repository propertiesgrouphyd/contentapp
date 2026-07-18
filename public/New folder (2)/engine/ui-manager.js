"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   UI Manager

   Handles:
   - DOM references
   - Dropdown initialization
   - Cascading dropdowns
   - Form values

   ========================================================================== */


import DropdownManager from "./dropdown-manager.js";





const UI = {};





function loadUI(){


    UI.purpose =

    document.getElementById(
        "vw-purpose"
    );



    UI.category =

    document.getElementById(
        "vw-category"
    );



    UI.topic =

    document.getElementById(
        "vw-topic"
    );



    UI.customTopic =

    document.getElementById(
        "vw-custom-topic"
    );



    UI.goal =

    document.getElementById(
        "vw-goal"
    );



    UI.contentStyle =

    document.getElementById(
        "vw-style"
    );



    UI.audience =

    document.getElementById(
        "vw-audience"
    );



    UI.length =

    document.getElementById(
        "vw-length"
    );



    UI.platform =

    document.getElementById(
        "vw-platform"
    );



    UI.language =

    document.getElementById(
        "vw-language"
    );



    UI.creativity =

    document.getElementById(
        "vw-creativity"
    );



    UI.emoji =

    document.getElementById(
        "vw-emoji"
    );



    UI.cta =

    document.getElementById(
        "vw-cta"
    );



}









function initializeDropdowns(){


    if(!UI.purpose){

        loadUI();

    }



    console.log(
        "UI loaded",
        UI
    );




    DropdownManager.populatePurposes(

        UI.purpose

    );




    DropdownManager.clearCategories(

        UI.category

    );




    DropdownManager.clearTopics(

        UI.topic

    );





    DropdownManager.populateGoals(

        UI.goal

    );



    DropdownManager.populateContentStyles(

        UI.contentStyle

    );



    DropdownManager.populateAudiences(

        UI.audience

    );



    DropdownManager.populateLengths(

        UI.length

    );



    DropdownManager.populatePlatforms(

        UI.platform

    );



    DropdownManager.populateLanguages(

        UI.language

    );



    DropdownManager.populateCreativity(

        UI.creativity

    );



    DropdownManager.populateEmojis(

        UI.emoji

    );



    DropdownManager.populateCTAs(

        UI.cta

    );




    console.log(

        "Purpose options:",

        UI.purpose?.options.length

    );




    setupCascade();

    const wrapper = document.getElementById(
        "vw-custom-topic-wrapper"
    );

    if (wrapper) {

        wrapper.hidden = true;

    }



}









function setupCascade(){



    if(UI.purpose){


        UI.purpose.addEventListener(

            "change",

            ()=>{


                DropdownManager.populateCategoriesByPurpose(

                    UI.category,

                    UI.purpose.value

                );



                DropdownManager.clearTopics(

                    UI.topic

                );


            }

        );


    }







    if(UI.category){


        UI.category.addEventListener(

            "change",

            ()=>{


                DropdownManager.populateTopicsByCategory(

                    UI.topic,

                    UI.category.value

                );

                const wrapper = document.getElementById(
                    "vw-custom-topic-wrapper"
                );

                if (wrapper) {

                    wrapper.hidden = true;

                }

                if (UI.customTopic) {

                    UI.customTopic.value = "";

                }


            }

        );


    }








    if(UI.topic){


        UI.topic.addEventListener(

            "change",

            ()=>{


                const wrapper =

                document.getElementById(

                    "vw-custom-topic-wrapper"

                );



                if(!wrapper){

                    return;

                }




                wrapper.hidden =

                UI.topic.value !== "custom-topic";



                if(wrapper.hidden && UI.customTopic){

                    UI.customTopic.value="";

                }


            }

        );


    }


}









function getValues(){



    return {


        purpose:

        UI.purpose?.value || "",



        category:

        UI.category?.value || "",



        topic:

        UI.topic?.value === "custom-topic"

        ?

        UI.customTopic?.value || ""

        :

        UI.topic?.value || "",



        customTopic:

        UI.customTopic?.value || "",



        goal:

        UI.goal?.value || "",



        contentStyle:

        UI.contentStyle?.value || "",



        audience:

        UI.audience?.value || "",



        length:

        UI.length?.value || "",



        platform:

        UI.platform?.value || "",



        language:

        UI.language?.value || "",



        creativity:

        UI.creativity?.value || "",



        emoji:

        UI.emoji?.value || "",



        cta:

        UI.cta?.value || ""


    };


}








export {


    UI,

    initializeDropdowns,

    getValues


};