"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Purpose Library
   Version : 3.0.0

   Purpose defines the user's main reason for creating content.

   Flow:
   Purpose → Category → Topic
   ========================================================================== */


const VW_PURPOSES = Object.freeze([


    {
        id: "personal",
        label: "Personal",
        description:
            "Create personal stories, experiences, reflections, and life-based content."
    },


    {
        id: "professional",
        label: "Professional",
        description:
            "Create expert content related to professions, industries, skills, and knowledge."
    },


    {
        id: "career",
        label: "Career",
        description:
            "Create content about career growth, opportunities, skills, and professional journey."
    },


    {
        id: "business",
        label: "Business",
        description:
            "Create content about companies, customers, markets, products, and growth."
    },


    {
        id: "founder",
        label: "Founder",
        description:
            "Create content about startups, entrepreneurship, company building, and founder journey."
    },


    {
        id: "leadership",
        label: "Leadership",
        description:
            "Create content about leading people, teams, organizations, and decision making."
    },


    {
        id: "creator",
        label: "Creator",
        description:
            "Create content for creators, influencers, writers, and digital audiences."
    },


    {
        id: "marketing",
        label: "Marketing",
        description:
            "Create content about branding, campaigns, customers, and audience growth."
    },


    {
        id: "education",
        label: "Education",
        description:
            "Create educational content, tutorials, learning resources, and knowledge sharing."
    },


    {
        id: "organization",
        label: "Organization",
        description:
            "Create content for companies, teams, institutions, and internal communication."
    },


    {
        id: "community",
        label: "Community",
        description:
            "Create content for communities, social initiatives, and public engagement."
    },


    {
        id: "networking",
        label: "Networking",
        description:
            "Create content to build professional relationships and opportunities."
    }


]);


Object.freeze(VW_PURPOSES);

export default VW_PURPOSES;