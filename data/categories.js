"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Category Library
   Version : 3.0.0

   Categories are connected to Purpose.

   Flow:
   Purpose → Category → Topic
   ========================================================================== */


const VW_CATEGORIES = Object.freeze([


    /* =========================
       PERSONAL PURPOSE
       ========================= */


    {
        id: "personal-development",
        label: "Personal Development",
        purpose: "personal",
        description:
            "Self improvement, habits, discipline, confidence, and becoming better."
    },


    {
        id: "life-experiences",
        label: "Life Experiences",
        purpose: "personal",
        description:
            "Personal journeys, memories, experiences, and lessons from life."
    },


    {
        id: "mindset-growth",
        label: "Mindset & Growth",
        purpose: "personal",
        description:
            "Mental strength, positive thinking, resilience, and growth mindset."
    },


    {
        id: "health-wellness",
        label: "Health & Wellness",
        purpose: "personal",
        description:
            "Physical health, mental wellbeing, fitness, and healthy living."
    },


    {
        id: "productivity",
        label: "Productivity",
        purpose: "personal",
        description:
            "Time management, focus, routines, and improving daily efficiency."
    },


    {
        id: "relationships",
        label: "Relationships",
        purpose: "personal",
        description:
            "Family, friendships, communication, and human connections."
    },


    {
        id: "lifestyle",
        label: "Lifestyle",
        purpose: "personal",
        description:
            "Daily lifestyle choices, experiences, interests, and personal balance."
    },

    /* =========================
       PROFESSIONAL PURPOSE
       ========================= */


    {
        id: "technology",
        label: "Technology",
        purpose: "professional",
        description:
            "Technology trends, digital transformation, innovation, and emerging technologies."
    },


    {
        id: "engineering",
        label: "Engineering",
        purpose: "professional",
        description:
            "Engineering knowledge, projects, solutions, and technical advancements."
    },


    {
        id: "data-ai",
        label: "Data & Artificial Intelligence",
        purpose: "professional",
        description:
            "Artificial intelligence, machine learning, data science, and intelligent systems."
    },


    {
        id: "software-development",
        label: "Software Development",
        purpose: "professional",
        description:
            "Programming, software engineering, applications, and development practices."
    },


    {
        id: "cloud-cybersecurity",
        label: "Cloud & Cybersecurity",
        purpose: "professional",
        description:
            "Cloud infrastructure, security, privacy, and digital protection."
    },


    {
        id: "science-research",
        label: "Science & Research",
        purpose: "professional",
        description:
            "Scientific discoveries, research, experiments, and knowledge."
    },


    {
        id: "healthcare",
        label: "Healthcare",
        purpose: "professional",
        description:
            "Healthcare systems, medical innovation, and health technologies."
    },


    {
        id: "finance",
        label: "Finance",
        purpose: "professional",
        description:
            "Finance, accounting, economics, investments, and financial knowledge."
    },


    {
        id: "legal",
        label: "Legal",
        purpose: "professional",
        description:
            "Law, compliance, regulations, contracts, and legal expertise."
    },


    {
        id: "industry-insights",
        label: "Industry Insights",
        purpose: "professional",
        description:
            "Industry trends, market observations, and professional analysis."
    },

    /* =========================
       CAREER PURPOSE
       ========================= */


    {
        id: "job-search",
        label: "Job Search",
        purpose: "career",
        description:
            "Job opportunities, applications, resumes, and finding the right career opportunities."
    },


    {
        id: "career-growth",
        label: "Career Growth",
        purpose: "career",
        description:
            "Career advancement, promotions, professional progress, and long-term development."
    },


    {
        id: "skills-development",
        label: "Skills Development",
        purpose: "career",
        description:
            "Learning new skills, improving abilities, and becoming career-ready."
    },


    {
        id: "interview-preparation",
        label: "Interview Preparation",
        purpose: "career",
        description:
            "Interview techniques, preparation methods, and candidate guidance."
    },


    {
        id: "workplace-experience",
        label: "Workplace Experience",
        purpose: "career",
        description:
            "Employee experiences, office culture, workplace lessons, and professional life."
    },


    {
        id: "professional-branding",
        label: "Professional Branding",
        purpose: "career",
        description:
            "Building professional identity, reputation, and career visibility."
    },


    {
        id: "career-transitions",
        label: "Career Transitions",
        purpose: "career",
        description:
            "Changing careers, moving industries, and adapting to new opportunities."
    },

    /* =========================
       BUSINESS PURPOSE
       ========================= */


    {
        id: "business-strategy",
        label: "Business Strategy",
        purpose: "business",
        description:
            "Business planning, competitive strategy, market decisions, and growth direction."
    },


    {
        id: "sales",
        label: "Sales",
        purpose: "business",
        description:
            "Sales processes, customer acquisition, revenue generation, and sales performance."
    },


    {
        id: "customer-success",
        label: "Customer Success",
        purpose: "business",
        description:
            "Customer relationships, satisfaction, retention, and customer experience."
    },


    {
        id: "operations",
        label: "Operations",
        purpose: "business",
        description:
            "Business processes, efficiency, systems, and operational excellence."
    },


    {
        id: "product-management",
        label: "Product Management",
        purpose: "business",
        description:
            "Product planning, product decisions, user needs, and product improvement."
    },


    {
        id: "e-commerce",
        label: "E-Commerce",
        purpose: "business",
        description:
            "Online business, digital selling, marketplaces, and commerce strategies."
    },


    {
        id: "business-growth",
        label: "Business Growth",
        purpose: "business",
        description:
            "Scaling businesses, expansion strategies, and revenue growth."
    },


    {
        id: "partnerships",
        label: "Partnerships",
        purpose: "business",
        description:
            "Business collaborations, strategic partnerships, and alliances."
    },


    {
        id: "investment-finance",
        label: "Investment & Finance",
        purpose: "business",
        description:
            "Business finance, investments, funding decisions, and financial planning."
    },

    /* =========================
       FOUNDER PURPOSE
       ========================= */


    {
        id: "startup-journey",
        label: "Startup Journey",
        purpose: "founder",
        description:
            "Founder experiences, startup beginnings, challenges, milestones, and lessons."
    },


    {
        id: "entrepreneurship",
        label: "Entrepreneurship",
        purpose: "founder",
        description:
            "Entrepreneurial mindset, opportunities, innovation, and building businesses."
    },


    {
        id: "idea-validation",
        label: "Idea & Validation",
        purpose: "founder",
        description:
            "Finding problems, validating ideas, understanding customers, and market research."
    },


    {
        id: "product-building",
        label: "Product Building",
        purpose: "founder",
        description:
            "Creating products, MVPs, user experience, and product development."
    },


    {
        id: "fundraising",
        label: "Fundraising",
        purpose: "founder",
        description:
            "Investors, venture capital, startup funding, and raising capital."
    },


    {
        id: "scaling-business",
        label: "Scaling Business",
        purpose: "founder",
        description:
            "Growing startups, expanding markets, systems, and business scale."
    },


    {
        id: "founder-leadership",
        label: "Founder Leadership",
        purpose: "founder",
        description:
            "Founder decisions, vision, team building, and leadership challenges."
    },


    {
        id: "startup-ecosystem",
        label: "Startup Ecosystem",
        purpose: "founder",
        description:
            "Startup communities, accelerators, partnerships, and innovation networks."
    },


    /* =========================
       LEADERSHIP PURPOSE
       ========================= */


    {
        id: "leadership-principles",
        label: "Leadership Principles",
        purpose: "leadership",
        description:
            "Leadership values, principles, mindset, and practices for effective leaders."
    },


    {
        id: "executive-leadership",
        label: "Executive Leadership",
        purpose: "leadership",
        description:
            "CEO thinking, executive decisions, vision, and organizational direction."
    },


    {
        id: "team-leadership",
        label: "Team Leadership",
        purpose: "leadership",
        description:
            "Leading teams, collaboration, motivation, and team performance."
    },


    {
        id: "people-management",
        label: "People Management",
        purpose: "leadership",
        description:
            "Managing people, developing talent, feedback, and employee growth."
    },


    {
        id: "decision-making",
        label: "Decision Making",
        purpose: "leadership",
        description:
            "Strategic decisions, problem solving, and leadership judgement."
    },


    {
        id: "company-culture",
        label: "Company Culture",
        purpose: "leadership",
        description:
            "Building values, trust, workplace culture, and employee experience."
    },


    {
        id: "communication",
        label: "Communication",
        purpose: "leadership",
        description:
            "Leadership communication, listening, influence, and clarity."
    },


    {
        id: "organizational-growth",
        label: "Organizational Growth",
        purpose: "leadership",
        description:
            "Building stronger organizations, systems, and long-term growth."
    },


    /* =========================
       CREATOR PURPOSE
       ========================= */


    {
        id: "content-creation",
        label: "Content Creation",
        purpose: "creator",
        description:
            "Creating valuable content, ideas, formats, and publishing strategies."
    },


    {
        id: "personal-brand",
        label: "Personal Brand",
        purpose: "creator",
        description:
            "Building identity, reputation, authority, and online presence."
    },


    {
        id: "storytelling",
        label: "Storytelling",
        purpose: "creator",
        description:
            "Sharing stories, experiences, emotions, and meaningful messages."
    },


    {
        id: "video-creation",
        label: "Video Creation",
        purpose: "creator",
        description:
            "Creating videos, scripts, short-form content, and visual storytelling."
    },


    {
        id: "writing",
        label: "Writing",
        purpose: "creator",
        description:
            "Articles, posts, blogs, newsletters, and written communication."
    },


    {
        id: "design-creativity",
        label: "Design & Creativity",
        purpose: "creator",
        description:
            "Visual design, creative ideas, art, and creative expression."
    },


    {
        id: "creator-growth",
        label: "Creator Growth",
        purpose: "creator",
        description:
            "Growing audiences, engagement, communities, and creator presence."
    },


    {
        id: "creator-business",
        label: "Creator Business",
        purpose: "creator",
        description:
            "Monetization, partnerships, products, and business opportunities for creators."
    },


    /* =========================
       MARKETING PURPOSE
       ========================= */


    {
        id: "branding",
        label: "Branding",
        purpose: "marketing",
        description:
            "Brand identity, positioning, reputation, and building strong brands."
    },


    {
        id: "digital-marketing",
        label: "Digital Marketing",
        purpose: "marketing",
        description:
            "Online marketing channels, campaigns, and digital growth strategies."
    },


    {
        id: "social-media-marketing",
        label: "Social Media Marketing",
        purpose: "marketing",
        description:
            "Social media campaigns, engagement, communities, and audience growth."
    },


    {
        id: "growth-marketing",
        label: "Growth Marketing",
        purpose: "marketing",
        description:
            "Experiments, optimization, acquisition, and sustainable growth strategies."
    },


    {
        id: "content-marketing",
        label: "Content Marketing",
        purpose: "marketing",
        description:
            "Creating valuable content to attract, educate, and convert audiences."
    },


    {
        id: "customer-acquisition",
        label: "Customer Acquisition",
        purpose: "marketing",
        description:
            "Finding customers, improving conversions, and growing user base."
    },


    {
        id: "market-research",
        label: "Market Research",
        purpose: "marketing",
        description:
            "Understanding customers, competitors, trends, and market opportunities."
    },


    {
        id: "public-relations",
        label: "Public Relations",
        purpose: "marketing",
        description:
            "Media communication, reputation management, and public image."
    },


    /* =========================
       EDUCATION PURPOSE
       ========================= */


    {
        id: "learning",
        label: "Learning",
        purpose: "education",
        description:
            "Learning journeys, new skills, knowledge discovery, and continuous improvement."
    },


    {
        id: "teaching",
        label: "Teaching",
        purpose: "education",
        description:
            "Teaching methods, explanations, and helping others understand concepts."
    },


    {
        id: "courses-training",
        label: "Courses & Training",
        purpose: "education",
        description:
            "Courses, workshops, professional training, and structured learning programs."
    },


    {
        id: "tutorials",
        label: "Tutorials",
        purpose: "education",
        description:
            "Step-by-step guides, practical lessons, and instructional content."
    },


    {
        id: "academic-knowledge",
        label: "Academic Knowledge",
        purpose: "education",
        description:
            "Academic subjects, educational concepts, and knowledge sharing."
    },


    {
        id: "skill-development",
        label: "Skill Development",
        purpose: "education",
        description:
            "Building technical, professional, and personal skills."
    },


    {
        id: "research-insights",
        label: "Research & Insights",
        purpose: "education",
        description:
            "Research findings, analysis, discoveries, and educational insights."
    },


    {
        id: "educational-technology",
        label: "Educational Technology",
        purpose: "education",
        description:
            "Technology platforms, digital learning, and future education systems."
    },

    /* =========================
       ORGANIZATION PURPOSE
       ========================= */


    {
        id: "company-updates",
        label: "Company Updates",
        purpose: "organization",
        description:
            "Company news, milestones, achievements, and organizational progress."
    },


    {
        id: "internal-communication",
        label: "Internal Communication",
        purpose: "organization",
        description:
            "Employee communication, internal messages, and company information."
    },


    {
        id: "company-culture",
        label: "Company Culture",
        purpose: "organization",
        description:
            "Company values, culture building, employee experience, and workplace environment."
    },


    {
        id: "team-employees",
        label: "Team & Employees",
        purpose: "organization",
        description:
            "Team achievements, employee stories, recognition, and collaboration."
    },


    {
        id: "organizational-management",
        label: "Organizational Management",
        purpose: "organization",
        description:
            "Organizational systems, processes, planning, and management practices."
    },


    {
        id: "corporate-announcements",
        label: "Corporate Announcements",
        purpose: "organization",
        description:
            "Official announcements, launches, partnerships, and important updates."
    },


    {
        id: "workplace-initiatives",
        label: "Workplace Initiatives",
        purpose: "organization",
        description:
            "Employee programs, workplace improvements, and organizational activities."
    },


    {
        id: "corporate-social-responsibility",
        label: "Corporate Social Responsibility",
        purpose: "organization",
        description:
            "Social responsibility, sustainability, and company impact initiatives."
    },


    /* =========================
       COMMUNITY PURPOSE
       ========================= */


    {
        id: "community-building",
        label: "Community Building",
        purpose: "community",
        description:
            "Creating, growing, and managing meaningful communities."
    },


    {
        id: "social-impact",
        label: "Social Impact",
        purpose: "community",
        description:
            "Positive social change, causes, and initiatives that help society."
    },


    {
        id: "public-awareness",
        label: "Public Awareness",
        purpose: "community",
        description:
            "Awareness campaigns, education, and important public discussions."
    },


    {
        id: "events-activities",
        label: "Events & Activities",
        purpose: "community",
        description:
            "Community events, gatherings, programs, and shared activities."
    },


    {
        id: "volunteering",
        label: "Volunteering",
        purpose: "community",
        description:
            "Volunteer work, social service, and helping communities."
    },


    {
        id: "local-communities",
        label: "Local Communities",
        purpose: "community",
        description:
            "Local groups, neighbourhoods, villages, and regional communities."
    },


    {
        id: "professional-communities",
        label: "Professional Communities",
        purpose: "community",
        description:
            "Industry groups, professional networks, and knowledge communities."
    },


    {
        id: "social-innovation",
        label: "Social Innovation",
        purpose: "community",
        description:
            "New ideas, solutions, and innovations for social challenges."
    },

    /* =========================
       NETWORKING PURPOSE
       ========================= */


    {
        id: "professional-networking",
        label: "Professional Networking",
        purpose: "networking",
        description:
            "Building professional relationships, connections, and meaningful conversations."
    },


    {
        id: "industry-connections",
        label: "Industry Connections",
        purpose: "networking",
        description:
            "Connecting with professionals, experts, and people within industries."
    },


    {
        id: "collaboration",
        label: "Collaboration",
        purpose: "networking",
        description:
            "Finding opportunities to collaborate, create, and work together."
    },


    {
        id: "partnerships",
        label: "Partnerships",
        purpose: "networking",
        description:
            "Building strategic relationships, alliances, and professional partnerships."
    },


    {
        id: "knowledge-exchange",
        label: "Knowledge Exchange",
        purpose: "networking",
        description:
            "Sharing ideas, insights, experiences, and professional knowledge."
    },


    {
        id: "career-networking",
        label: "Career Networking",
        purpose: "networking",
        description:
            "Building connections for career opportunities and professional growth."
    },


    {
        id: "business-networking",
        label: "Business Networking",
        purpose: "networking",
        description:
            "Connecting businesses, entrepreneurs, customers, and partners."
    },


    {
        id: "personal-reputation",
        label: "Personal Reputation",
        purpose: "networking",
        description:
            "Building credibility, trust, and professional visibility."
    }

]);






Object.freeze(VW_CATEGORIES);

export default VW_CATEGORIES;






