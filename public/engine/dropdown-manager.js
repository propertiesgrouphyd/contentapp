"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Dropdown Manager

   Handles:
   - Select option creation
   - Purpose loading
   - Category loading
   - Topic loading
   - Independent dropdowns

   ========================================================================== */


import DataManager from "./data-manager.js";







function populateSelect(
    select,
    items = [],
    placeholder = "Select"
){


    if(!select){

        console.error(
            "Dropdown element missing"
        );

        return;

    }




    select.innerHTML = "";





    const first =

    document.createElement(
        "option"
    );



    first.value = "";

    first.textContent = placeholder;

    first.disabled = true;

    first.selected = true;



    select.appendChild(first);







    if(!Array.isArray(items) || items.length === 0){


        console.warn(
            "No dropdown data:",
            placeholder
        );


        return;

    }






    const seen = new Set();




    items.forEach(item=>{



        if(

            !item ||

            !item.id ||

            seen.has(item.id)

        ){

            return;

        }





        seen.add(item.id);





        const option =

        document.createElement(
            "option"
        );



        option.value =

        item.id;



        option.textContent =

        item.label || item.name || item.id;



        select.appendChild(option);



    });



}









const DropdownManager = Object.freeze({






    populatePurposes(select){


        const data =

        DataManager.getPurposes();



        console.log(
            "Purposes:",
            data
        );



        populateSelect(

            select,

            data,

            "Select Purpose"

        );


    },









    clearCategories(select){


        populateSelect(

            select,

            [],

            "Select Category"

        );


    },









    populateCategoriesByPurpose(

        select,

        purpose

    ){


        populateSelect(

            select,

            DataManager.getCategoriesByPurpose(

                purpose

            ),

            "Select Category"

        );


    },









    clearTopics(select){


        populateSelect(

            select,

            [],

            "Select Topic"

        );


    },









    populateTopicsByCategory(

        select,

        category

    ){

        const topics = [

            ...DataManager.getTopicsByCategory(category)

        ];

        topics.push({

            id: "custom-topic",

            label: "Custom Topic"

        });

        populateSelect(

            select,

            topics,

            "Select Topic"

        );

    },









    populateGoals(select){


        populateSelect(

            select,

            DataManager.getGoals(),

            "Select Goal"

        );


    },









    populateContentStyles(select){


        populateSelect(

            select,

            DataManager.getContentStyles(),

            "Select Content Style"

        );


    },









    populateAudiences(select){


        populateSelect(

            select,

            DataManager.getAudiences(),

            "Select Audience"

        );


    },









    populateLengths(select){


        populateSelect(

            select,

            DataManager.getLengths(),

            "Select Length"

        );


    },









    populatePlatforms(select){


        populateSelect(

            select,

            DataManager.getPlatforms(),

            "Select Platform"

        );


    },









    populateLanguages(select){


        populateSelect(

            select,

            DataManager.getLanguages(),

            "Select Language"

        );


    },









    populateCreativity(select){


        populateSelect(

            select,

            DataManager.getCreativityLevels(),

            "Select Creativity"

        );


    },









    populateEmojis(select){


        populateSelect(

            select,

            DataManager.getEmojiOptions(),

            "Select Emoji"

        );


    },









    populateCTAs(select){


        populateSelect(

            select,

            DataManager.getCTAOptions(),

            "Select CTA"

        );


    }



});





export default DropdownManager;