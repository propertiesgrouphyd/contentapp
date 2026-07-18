"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Purpose Library
   Version : 1.0.0

   Purpose defines the user's primary intention.
   ========================================================================== */

const VW_PURPOSES = Object.freeze([

    {
        id: "personal",
        label: "Personal",
        description:
            "Create content for personal communication, thoughts, and experiences."
    },

    {
        id: "professional",
        label: "Professional",
        description:
            "Create content for workplace, expertise, and professional communication."
    },

    {
        id: "career",
        label: "Career",
        description:
            "Create content for career growth, jobs, and professional development."
    },

    {
        id: "business",
        label: "Business",
        description:
            "Create content for companies, products, customers, and business growth."
    },

    {
        id: "education",
        label: "Education",
        description:
            "Create content for learning, teaching, training, and knowledge sharing."
    },

    {
        id: "community",
        label: "Community",
        description:
            "Create content for groups, social initiatives, and public engagement."
    },

    {
        id: "organization",
        label: "Organization",
        description:
            "Create content for institutions, teams, and structured organizations."
    },

    {
        id: "creator",
        label: "Creator",
        description:
            "Create content for creators, influencers, and digital audiences."
    }

]);

Object.freeze(VW_PURPOSES);

export default VW_PURPOSES;
