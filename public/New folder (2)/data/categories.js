"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Category Library
   Version : 1.0.0

   Categories are filtered by Purpose.
   ========================================================================== */

const VW_CATEGORIES = Object.freeze([

    /* =========================
       Personal
       ========================= */

    {
        id: "personal-development",
        label: "Personal Development",
        purpose: "personal",
        description:
            "Growth, habits, mindset, and personal improvement."
    },

    {
        id: "relationships",
        label: "Relationships",
        purpose: "personal",
        description:
            "Communication, family, friendships, and relationships."
    },

    {
        id: "life-experience",
        label: "Life Experience",
        purpose: "personal",
        description:
            "Personal stories, reflections, and experiences."
    },


    /* =========================
       Professional
       ========================= */

    {
        id: "technology",
        label: "Technology",
        purpose: "professional",
        description:
            "Software, artificial intelligence, engineering, and digital technologies."
    },

    {
        id: "engineering",
        label: "Engineering",
        purpose: "professional",
        description:
            "Engineering concepts, projects, and technical communication."
    },

    {
        id: "management",
        label: "Management",
        purpose: "professional",
        description:
            "Teams, processes, operations, and management practices."
    },

    {
        id: "leadership",
        label: "Leadership",
        purpose: "professional",
        description:
            "Leadership principles, decision making, and organizational growth."
    },

    {
        id: "finance",
        label: "Finance",
        purpose: "professional",
        description:
            "Financial concepts, analysis, and business finance."
    },

    {
        id: "marketing",
        label: "Marketing",
        purpose: "professional",
        description:
            "Marketing strategies, branding, and customer communication."
    },

    {
        id: "sales",
        label: "Sales",
        purpose: "professional",
        description:
            "Sales communication, customer relationships, and growth."
    },

    {
        id: "human-resources",
        label: "Human Resources",
        purpose: "professional",
        description:
            "Recruitment, workplace culture, and employee management."
    },

    {
        id: "healthcare",
        label: "Healthcare",
        purpose: "professional",
        description:
            "Healthcare information, services, and communication."
    },

    {
        id: "legal",
        label: "Legal",
        purpose: "professional",
        description:
            "Legal communication, documents, and policies."
    },

    {
        id: "education",
        label: "Education",
        purpose: "professional",
        description:
            "Teaching, training, and educational content."
    },

    {
        id: "research",
        label: "Research",
        purpose: "professional",
        description:
            "Research, analysis, and knowledge creation."
    },

    {
        id: "design",
        label: "Design",
        purpose: "professional",
        description:
            "Creative design, user experience, and visual communication."
    },


    /* =========================
       Career
       ========================= */

    {
        id: "job-search",
        label: "Job Search",
        purpose: "career",
        description:
            "Resume, applications, and job-related communication."
    },

    {
        id: "career-growth",
        label: "Career Growth",
        purpose: "career",
        description:
            "Skills, professional growth, and career planning."
    },

    {
        id: "interview",
        label: "Interview",
        purpose: "career",
        description:
            "Interview preparation and professional responses."
    },


    /* =========================
       Business
       ========================= */

    {
        id: "startup",
        label: "Startup",
        purpose: "business",
        description:
            "Startup planning, strategy, and growth."
    },

    {
        id: "strategy",
        label: "Strategy",
        purpose: "business",
        description:
            "Business planning, decisions, and competitive strategy."
    },

    {
        id: "branding",
        label: "Branding",
        purpose: "business",
        description:
            "Brand identity, messaging, and reputation."
    },

    {
        id: "customer-success",
        label: "Customer Success",
        purpose: "business",
        description:
            "Customer relationships and retention."
    },

    {
        id: "operations",
        label: "Operations",
        purpose: "business",
        description:
            "Business processes and operational improvement."
    },


    /* =========================
       Education
       ========================= */

    {
        id: "learning",
        label: "Learning",
        purpose: "education",
        description:
            "Educational explanations and learning material."
    },

    {
        id: "teaching",
        label: "Teaching",
        purpose: "education",
        description:
            "Lessons, courses, and teaching resources."
    },


    /* =========================
       Community
       ========================= */

    {
        id: "social-impact",
        label: "Social Impact",
        purpose: "community",
        description:
            "Community initiatives and awareness."
    },

    {
        id: "events",
        label: "Events",
        purpose: "community",
        description:
            "Community events and announcements."
    },


    /* =========================
       Organization
       ========================= */

    {
        id: "institution",
        label: "Institution",
        purpose: "organization",
        description:
            "Organizations, institutions, and formal communication."
    },

    {
        id: "internal-communication",
        label: "Internal Communication",
        purpose: "organization",
        description:
            "Internal documents, updates, and announcements."
    },


    /* =========================
       Creator
       ========================= */

    {
        id: "content-creation",
        label: "Content Creation",
        purpose: "creator",
        description:
            "Creator content, audience growth, and publishing."
    },

    {
        id: "personal-brand",
        label: "Personal Brand",
        purpose: "creator",
        description:
            "Building identity and online presence."
    }
,

    {
        id: "cybersecurity",
        label: "Cybersecurity",
        purpose: "professional",
        description:
            "Security, privacy, protection, and cyber technologies."
    },

    {
        id: "cloud-computing",
        label: "Cloud Computing",
        purpose: "professional",
        description:
            "Cloud platforms, infrastructure, and services."
    },

    {
        id: "data-science",
        label: "Data Science",
        purpose: "professional",
        description:
            "Data analysis, analytics, and intelligent systems."
    },

    {
        id: "software-development",
        label: "Software Development",
        purpose: "professional",
        description:
            "Software engineering, applications, and development practices."
    },

    {
        id: "product-management",
        label: "Product Management",
        purpose: "professional",
        description:
            "Product strategy, planning, and user experience."
    },

    {
        id: "project-management",
        label: "Project Management",
        purpose: "professional",
        description:
            "Planning, execution, and delivery management."
    },

    {
        id: "science",
        label: "Science",
        purpose: "professional",
        description:
            "Scientific concepts, research, and discoveries."
    },

    {
        id: "real-estate",
        label: "Real Estate",
        purpose: "business",
        description:
            "Property, construction, and real estate business."
    },

    {
        id: "e-commerce",
        label: "E-Commerce",
        purpose: "business",
        description:
            "Online selling, marketplaces, and digital commerce."
    },

    {
        id: "growth",
        label: "Growth",
        purpose: "business",
        description:
            "Business expansion, acquisition, and scaling."
    },

    {
        id: "market-research",
        label: "Market Research",
        purpose: "business",
        description:
            "Customer insights, trends, and market analysis."
    },

    {
        id: "writing",
        label: "Writing",
        purpose: "creator",
        description:
            "Creative writing, publishing, and storytelling."
    },

    {
        id: "video-creation",
        label: "Video Creation",
        purpose: "creator",
        description:
            "Video content, scripts, and creator workflows."
    },

    {
        id: "podcast",
        label: "Podcast",
        purpose: "creator",
        description:
            "Podcast planning, scripts, and discussions."
    },

    {
        id: "training",
        label: "Training",
        purpose: "education",
        description:
            "Courses, workshops, and professional training."
    }
,
    {
        id: "manufacturing",
        label: "Manufacturing",
        purpose: "professional",
        description:
            "Manufacturing systems, production, and industrial processes."
    },

    {
        id: "supply-chain",
        label: "Supply Chain",
        purpose: "professional",
        description:
            "Supply chain planning, logistics, and distribution."
    },

    {
        id: "logistics",
        label: "Logistics",
        purpose: "professional",
        description:
            "Transportation, delivery, and logistics management."
    },

    {
        id: "agriculture",
        label: "Agriculture",
        purpose: "professional",
        description:
            "Farming, agriculture technology, and rural development."
    },

    {
        id: "environment",
        label: "Environment",
        purpose: "professional",
        description:
            "Environment, sustainability, and climate topics."
    },

    {
        id: "energy",
        label: "Energy",
        purpose: "professional",
        description:
            "Energy systems, renewable energy, and power technologies."
    },

    {
        id: "government",
        label: "Government",
        purpose: "professional",
        description:
            "Government services, administration, and public communication."
    },

    {
        id: "public-policy",
        label: "Public Policy",
        purpose: "professional",
        description:
            "Policies, governance, and public affairs."
    },

    {
        id: "hospitality",
        label: "Hospitality",
        purpose: "professional",
        description:
            "Hotels, tourism services, and hospitality management."
    },

    {
        id: "travel",
        label: "Travel",
        purpose: "professional",
        description:
            "Travel experiences, tourism, and destinations."
    },

    {
        id: "food",
        label: "Food",
        purpose: "professional",
        description:
            "Food industry, recipes, and food communication."
    },

    {
        id: "fashion",
        label: "Fashion",
        purpose: "professional",
        description:
            "Fashion, design, and lifestyle industries."
    },

    {
        id: "retail",
        label: "Retail",
        purpose: "professional",
        description:
            "Retail business, stores, and customer experience."
    },

    {
        id: "media",
        label: "Media",
        purpose: "professional",
        description:
            "Media, journalism, and communication."
    },

    {
        id: "entertainment",
        label: "Entertainment",
        purpose: "professional",
        description:
            "Entertainment industry and creative communication."
    },

    {
        id: "sports",
        label: "Sports",
        purpose: "professional",
        description:
            "Sports, athletes, teams, and sports communication."
    },

    {
        id: "investment",
        label: "Investment",
        purpose: "business",
        description:
            "Investments, capital, and financial growth."
    },

    {
        id: "consulting",
        label: "Consulting",
        purpose: "business",
        description:
            "Advisory services, expertise, and consulting."
    },

    {
        id: "franchise",
        label: "Franchise",
        purpose: "business",
        description:
            "Franchise models, expansion, and operations."
    },

    {
        id: "international-business",
        label: "International Business",
        purpose: "business",
        description:
            "Global markets, trade, and international operations."
    },

    {
        id: "photography",
        label: "Photography",
        purpose: "creator",
        description:
            "Photography, visual storytelling, and creative work."
    },

    {
        id: "music",
        label: "Music",
        purpose: "creator",
        description:
            "Music creation, publishing, and performance."
    },

    {
        id: "design-creator",
        label: "Design Creator",
        purpose: "creator",
        description:
            "Creative design, visual content, and digital art."
    },

    {
        id: "community-creator",
        label: "Community Creator",
        purpose: "creator",
        description:
            "Community building and audience engagement."
    }

]);

Object.freeze(VW_CATEGORIES);

export default VW_CATEGORIES;
