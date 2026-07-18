"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Data Manager

   Central access layer for all application data.

   ========================================================================== */




import * as data from "../data/index.js";










const DataManager = Object.freeze({



    getPurposes(){


        return Array.isArray(data.purposes)

        ?

        data.purposes

        :

        [];


    },







    getCategories(){


        return Array.isArray(data.categories)

        ?

        data.categories

        :

        [];


    },







    getTopics(){


        return Array.isArray(data.topics)

        ?

        data.topics

        :

        [];


    },







    getGoals(){


        return Array.isArray(data.goals)

        ?

        data.goals

        :

        [];


    },







    getContentStyles(){


        return Array.isArray(data.contentStyles)

        ?

        data.contentStyles

        :

        [];


    },







    getAudiences(){


        return Array.isArray(data.audiences)

        ?

        data.audiences

        :

        [];


    },







    getLengths(){


        return Array.isArray(data.lengths)

        ?

        data.lengths

        :

        [];


    },







    getPlatforms(){


        return Array.isArray(data.platforms)

        ?

        data.platforms

        :

        [];


    },







    getLanguages(){


        return Array.isArray(data.languages)

        ?

        data.languages

        :

        [];


    },







    getCreativityLevels(){


        return Array.isArray(data.creativity)

        ?

        data.creativity

        :

        [];


    },







    getEmojiOptions(){


        return Array.isArray(data.emojis)

        ?

        data.emojis

        :

        [];


    },







    getCTAOptions(){


        return Array.isArray(data.ctas)

        ?

        data.ctas

        :

        [];


    },









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









    getPurpose(id){


        return this.getPurposes()

        .find(

            item =>

            item.id === id

        )

        ||

        null;


    },









    getCategory(id){


        return this.getCategories()

        .find(

            item =>

            item.id === id

        )

        ||

        null;


    },









    getTopic(id){


        return this.getTopics()

        .find(

            item =>

            item.id === id

        )

        ||

        null;


    }



});





console.log(

    "Data loaded:",

    {

        purposes:
        DataManager.getPurposes().length,


        categories:
        DataManager.getCategories().length,


        topics:
        DataManager.getTopics().length

    }

);





export default DataManager;