"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Data Manager
   Version : 3.0.0

   Central access layer for all application data.

   Responsibilities

   • Provide access to all data libraries
   • Handle dependent dropdown data
   • Lookup selected values
   • Build AI selection context
   • Support custom topics
   • Never mutate source data

   ========================================================================== */


import * as data from "../data/index.js";



/* ==========================================================================
   Helpers
   ========================================================================== */


function safeArray(value){


    return Array.isArray(value)

        ?

        value

        :

        [];


}



function findById(collection,id){


    if(!id){

        return null;

    }


    return collection.find(

        item => item.id === id

    )

    ||

    null;


}



/* ==========================================================================
   Data Manager
   ========================================================================== */


const DataManager = {



    /* ==============================================================
       Data Libraries
       ============================================================== */


    getPurposes(){


        return safeArray(data.purposes);


    },


    getCategories(){


        return safeArray(data.categories);


    },


    getTopics(){


        return safeArray(data.topics);


    },


    getGoals(){


        return safeArray(data.goals);


    },


    getContentStyles(){


        return safeArray(data.contentStyles);


    },


    getTones(){


        return safeArray(data.tones);


    },


    getAudiences(){


        return safeArray(data.audiences);


    },


    getLengths(){


        return safeArray(data.lengths);


    },


    getPlatforms(){


        return safeArray(data.platforms);


    },


    getLanguages(){


        return safeArray(data.languages);


    },


    getCreativityLevels(){


        return safeArray(data.creativity);


    },


    getEmojiOptions(){


        return safeArray(data.emojis);


    },


    getCTAOptions(){


        return safeArray(data.ctas);


    },




    /* ==============================================================
       Cascading Dropdown Data
       ============================================================== */


    getCategoriesByPurpose(purpose){


        if(!purpose){

            return [];

        }


        return this.getCategories()

        .filter(

            item =>

            item.purpose === purpose

        );


    },



    getTopicsByCategory(category){


        if(!category){

            return [];

        }


        const result =

        this.getTopics()

        .filter(

            item =>

            item.category === category

        );



        return result.filter(

            (item,index,array)=>

            index ===

            array.findIndex(

                x => x.id === item.id

            )

        );


    },




    /* ==============================================================
       Individual Lookups
       ============================================================== */


    getPurpose(id){


        return findById(

            this.getPurposes(),

            id

        );


    },



    getCategory(id){


        return findById(

            this.getCategories(),

            id

        );


    },



    getTopic(id){


        return findById(

            this.getTopics(),

            id

        );


    },



    getGoal(id){


        return findById(

            this.getGoals(),

            id

        );


    },



    getContentStyle(id){


        return findById(

            this.getContentStyles(),

            id

        );


    },



    getTone(id){


        return findById(

            this.getTones(),

            id

        );


    },



    getAudience(id){


        return findById(

            this.getAudiences(),

            id

        );


    },



    getLength(id){


        return findById(

            this.getLengths(),

            id

        );


    },



    getPlatform(id){


        return findById(

            this.getPlatforms(),

            id

        );


    },



    getLanguage(id){


        return findById(

            this.getLanguages(),

            id

        );


    },



    getCreativity(id){


        return findById(

            this.getCreativityLevels(),

            id

        );


    },



    getEmoji(id){


        return findById(

            this.getEmojiOptions(),

            id

        );


    },



    getCTA(id){


        return findById(

            this.getCTAOptions(),

            id

        );


    },




    /* ==============================================================
       AI Context Builder
       ============================================================== */


    getSelectionContext(values = {}){


        return {


            purpose:

            this.getPurpose(values.purpose),



            category:

            this.getCategory(values.category),



            topic:


            values.customTopic

            ?

            values.customTopic

            :

            this.getTopic(values.topic),



            goal:

            this.getGoal(values.goal),



            contentStyle:

            this.getContentStyle(values.contentStyle),



            tone:

            this.getTone(values.tone),



            audience:

            this.getAudience(values.audience),



            length:

            this.getLength(values.length),



            platform:

            this.getPlatform(values.platform),



            language:

            this.getLanguage(values.language),



            creativity:

            this.getCreativity(values.creativity),



            emoji:

            this.getEmoji(values.emoji),



            cta:

            this.getCTA(values.cta)


        };


    }



};




/* ==========================================================================
   Freeze
   ========================================================================== */


Object.freeze(DataManager);



/* ==========================================================================
   Debug
   ========================================================================== */


console.log(

    "Data loaded:",

    {

        purposes:
        DataManager.getPurposes().length,


        categories:
        DataManager.getCategories().length,


        topics:
        DataManager.getTopics().length,


        goals:
        DataManager.getGoals().length,


        styles:
        DataManager.getContentStyles().length,


        tones:
        DataManager.getTones().length,


        audiences:
        DataManager.getAudiences().length,


        lengths:
        DataManager.getLengths().length,


        platforms:
        DataManager.getPlatforms().length,


        languages:
        DataManager.getLanguages().length,


        creativity:
        DataManager.getCreativityLevels().length,


        emojis:
        DataManager.getEmojiOptions().length,


        ctas:
        DataManager.getCTAOptions().length

    }

);



export default DataManager;
