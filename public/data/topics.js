"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Topic Library
   Version : 1.0.0

   Topics are filtered by Category.
   Broad evergreen subjects only.
   ========================================================================== */

const VW_TOPICS = Object.freeze([


    /* =========================
       Technology
       ========================= */

    {
        id: "artificial-intelligence",
        label: "Artificial Intelligence",
        category: "technology",
        description:
            "AI concepts, applications, trends, and real-world impact."
    },

    {
        id: "ai-agents",
        label: "AI Agents",
        category: "technology",
        description:
            "Autonomous AI systems, workflows, and intelligent automation."
    },

    {
        id: "machine-learning",
        label: "Machine Learning",
        category: "technology",
        description:
            "Machine learning models, techniques, and applications."
    },

    {
        id: "deep-learning",
        label: "Deep Learning",
        category: "technology",
        description:
            "Neural networks, deep models, and advanced AI systems."
    },

    {
        id: "generative-ai",
        label: "Generative AI",
        category: "technology",
        description:
            "AI systems that create text, images, code, and content."
    },

    {
        id: "automation",
        label: "Automation",
        category: "technology",
        description:
            "Digital automation, workflows, and productivity improvements."
    },

    {
        id: "cloud-computing",
        label: "Cloud Computing",
        category: "technology",
        description:
            "Cloud infrastructure, platforms, and services."
    },

    {
        id: "cybersecurity",
        label: "Cybersecurity",
        category: "technology",
        description:
            "Security, privacy, threats, and protection strategies."
    },

    {
        id: "software-development",
        label: "Software Development",
        category: "technology",
        description:
            "Programming, applications, and software engineering."
    },

    {
        id: "software-architecture",
        label: "Software Architecture",
        category: "technology",
        description:
            "Design patterns, systems, and scalable software structures."
    },

    {
        id: "apis",
        label: "APIs",
        category: "technology",
        description:
            "API design, integration, and digital services."
    },

    {
        id: "data-engineering",
        label: "Data Engineering",
        category: "technology",
        description:
            "Data pipelines, storage, and large-scale data systems."
    },

    {
        id: "devops",
        label: "DevOps",
        category: "technology",
        description:
            "Development operations, deployment, and engineering practices."
    },

    {
        id: "kubernetes",
        label: "Kubernetes",
        category: "technology",
        description:
            "Container orchestration and cloud-native infrastructure."
    },

    {
        id: "open-source",
        label: "Open Source",
        category: "technology",
        description:
            "Open source software, communities, and collaboration."
    },

    {
        id: "blockchain",
        label: "Blockchain",
        category: "technology",
        description:
            "Blockchain systems, decentralized technology, and applications."
    },

    {
        id: "internet-of-things",
        label: "Internet of Things",
        category: "technology",
        description:
            "Connected devices, sensors, and smart systems."
    },

    {
        id: "robotics",
        label: "Robotics",
        category: "technology",
        description:
            "Robots, intelligent machines, and automation systems."
    },

    {
        id: "quantum-computing",
        label: "Quantum Computing",
        category: "technology",
        description:
            "Quantum systems, computing concepts, and future technology."
    },

    {
        id: "product-engineering",
        label: "Product Engineering",
        category: "technology",
        description:
            "Building digital products, engineering processes, and innovation."
    },

    /* =========================
       Leadership & Management
       ========================= */

    {
        id: "leadership",
        label: "Leadership",
        category: "leadership",
        description:
            "Leadership principles, responsibilities, and effective leadership."
    },

    {
        id: "decision-making",
        label: "Decision Making",
        category: "leadership",
        description:
            "Better decisions, critical thinking, and problem solving."
    },

    {
        id: "vision",
        label: "Vision",
        category: "leadership",
        description:
            "Creating vision, direction, and long-term goals."
    },

    {
        id: "strategy",
        label: "Strategy",
        category: "leadership",
        description:
            "Strategic thinking, planning, and execution."
    },

    {
        id: "team-building",
        label: "Team Building",
        category: "leadership",
        description:
            "Building effective teams and collaboration."
    },

    {
        id: "delegation",
        label: "Delegation",
        category: "leadership",
        description:
            "Assigning responsibilities and empowering people."
    },

    {
        id: "communication",
        label: "Communication",
        category: "leadership",
        description:
            "Effective communication and professional interaction."
    },

    {
        id: "conflict-resolution",
        label: "Conflict Resolution",
        category: "leadership",
        description:
            "Managing disagreements and finding solutions."
    },

    {
        id: "emotional-intelligence",
        label: "Emotional Intelligence",
        category: "leadership",
        description:
            "Understanding emotions and improving relationships."
    },

    {
        id: "trust-building",
        label: "Trust Building",
        category: "leadership",
        description:
            "Building trust, reliability, and strong relationships."
    },

    {
        id: "mentoring",
        label: "Mentoring",
        category: "leadership",
        description:
            "Guiding people through knowledge and experience."
    },

    {
        id: "coaching",
        label: "Coaching",
        category: "leadership",
        description:
            "Helping individuals improve performance and skills."
    },

    {
        id: "company-culture",
        label: "Company Culture",
        category: "leadership",
        description:
            "Building healthy workplace culture and values."
    },

    {
        id: "performance-management",
        label: "Performance Management",
        category: "leadership",
        description:
            "Goals, feedback, evaluation, and improvement."
    },

    {
        id: "change-management",
        label: "Change Management",
        category: "leadership",
        description:
            "Managing organizational change effectively."
    },

    {
        id: "innovation",
        label: "Innovation",
        category: "leadership",
        description:
            "Creating new ideas, improvements, and solutions."
    },

    {
        id: "negotiation",
        label: "Negotiation",
        category: "leadership",
        description:
            "Negotiation skills, agreements, and outcomes."
    },

    {
        id: "productivity",
        label: "Productivity",
        category: "leadership",
        description:
            "Improving focus, efficiency, and results."
    }
,

    /* =========================
       Business & Marketing
       ========================= */

    {
        id: "entrepreneurship",
        label: "Entrepreneurship",
        category: "business",
        description:
            "Starting businesses, entrepreneurial thinking, and innovation."
    },

    {
        id: "startup-building",
        label: "Startup Building",
        category: "business",
        description:
            "Startup creation, validation, and growth."
    },

    {
        id: "business-strategy",
        label: "Business Strategy",
        category: "business",
        description:
            "Strategic planning, decisions, and competitive advantage."
    },

    {
        id: "business-planning",
        label: "Business Planning",
        category: "business",
        description:
            "Business plans, goals, and execution planning."
    },

    {
        id: "business-models",
        label: "Business Models",
        category: "business",
        description:
            "Revenue models, value creation, and business structures."
    },

    {
        id: "revenue-growth",
        label: "Revenue Growth",
        category: "business",
        description:
            "Increasing revenue, expansion, and growth strategies."
    },

    {
        id: "customer-experience",
        label: "Customer Experience",
        category: "business",
        description:
            "Customer relationships, satisfaction, and loyalty."
    },

    {
        id: "sales-strategy",
        label: "Sales Strategy",
        category: "business",
        description:
            "Sales processes, techniques, and customer acquisition."
    },

    {
        id: "branding",
        label: "Branding",
        category: "business",
        description:
            "Brand identity, positioning, and reputation."
    },

    {
        id: "market-research",
        label: "Market Research",
        category: "business",
        description:
            "Markets, customers, trends, and insights."
    },

    {
        id: "competitive-analysis",
        label: "Competitive Analysis",
        category: "business",
        description:
            "Competitors, positioning, and market comparison."
    },

    {
        id: "investment",
        label: "Investment",
        category: "business",
        description:
            "Capital, investment decisions, and financial growth."
    },

    {
        id: "funding",
        label: "Funding",
        category: "business",
        description:
            "Fundraising, investors, and startup finance."
    },

    {
        id: "finance-management",
        label: "Finance Management",
        category: "business",
        description:
            "Business finance, budgeting, and financial planning."
    },

    {
        id: "business-operations",
        label: "Business Operations",
        category: "business",
        description:
            "Processes, efficiency, and operational excellence."
    },

    {
        id: "business-scaling",
        label: "Business Scaling",
        category: "business",
        description:
            "Growth systems, expansion, and scaling operations."
    },

    {
        id: "partnerships",
        label: "Partnerships",
        category: "business",
        description:
            "Business partnerships, collaborations, and alliances."
    },

    {
        id: "e-commerce",
        label: "E-Commerce",
        category: "business",
        description:
            "Online commerce, marketplaces, and digital selling."
    },


    {
        id: "digital-marketing",
        label: "Digital Marketing",
        category: "marketing",
        description:
            "Online marketing channels and strategies."
    },

    {
        id: "content-marketing",
        label: "Content Marketing",
        category: "marketing",
        description:
            "Content strategy, publishing, and audience growth."
    },

    {
        id: "social-media-marketing",
        label: "Social Media Marketing",
        category: "marketing",
        description:
            "Social platforms, engagement, and campaigns."
    },

    {
        id: "seo",
        label: "SEO",
        category: "marketing",
        description:
            "Search optimization and organic growth."
    },

    {
        id: "advertising",
        label: "Advertising",
        category: "marketing",
        description:
            "Advertising campaigns, messaging, and promotion."
    },

    {
        id: "brand-building",
        label: "Brand Building",
        category: "marketing",
        description:
            "Building strong brands and market presence."
    },

    {
        id: "email-marketing",
        label: "Email Marketing",
        category: "marketing",
        description:
            "Email campaigns, newsletters, and customer communication."
    },

    {
        id: "lead-generation",
        label: "Lead Generation",
        category: "marketing",
        description:
            "Finding prospects and creating business opportunities."
    },

    {
        id: "customer-acquisition",
        label: "Customer Acquisition",
        category: "marketing",
        description:
            "Attracting and converting new customers."
    },

    {
        id: "product-marketing",
        label: "Product Marketing",
        category: "marketing",
        description:
            "Product positioning, launches, and communication."
    },

    {
        id: "growth-marketing",
        label: "Growth Marketing",
        category: "marketing",
        description:
            "Experimentation, growth systems, and optimization."
    }
,

    /* =========================
       Career
       ========================= */

    {
        id: "resume-building",
        label: "Resume Building",
        category: "job-search",
        description:
            "Creating effective resumes and career documents."
    },

    {
        id: "interview-preparation",
        label: "Interview Preparation",
        category: "interview",
        description:
            "Interview skills, answers, and preparation strategies."
    },

    {
        id: "career-planning",
        label: "Career Planning",
        category: "career-growth",
        description:
            "Career goals, pathways, and professional decisions."
    },

    {
        id: "skill-development",
        label: "Skill Development",
        category: "career-growth",
        description:
            "Learning skills and improving professional abilities."
    },

    {
        id: "professional-growth",
        label: "Professional Growth",
        category: "career-growth",
        description:
            "Improving expertise and career advancement."
    },

    {
        id: "personal-branding",
        label: "Personal Branding",
        category: "career-growth",
        description:
            "Building professional identity and reputation."
    },

    {
        id: "job-search",
        label: "Job Search",
        category: "job-search",
        description:
            "Finding opportunities and applying effectively."
    },

    {
        id: "workplace-communication",
        label: "Workplace Communication",
        category: "career-growth",
        description:
            "Professional communication at work."
    },

    {
        id: "networking",
        label: "Networking",
        category: "career-growth",
        description:
            "Building professional connections and relationships."
    },

    {
        id: "leadership-development",
        label: "Leadership Development",
        category: "career-growth",
        description:
            "Developing leadership capabilities."
    },


    /* =========================
       Education
       ========================= */

    {
        id: "learning-methods",
        label: "Learning Methods",
        category: "learning",
        description:
            "Effective learning techniques and approaches."
    },

    {
        id: "teaching-methods",
        label: "Teaching Methods",
        category: "teaching",
        description:
            "Teaching approaches and educational practices."
    },

    {
        id: "online-learning",
        label: "Online Learning",
        category: "learning",
        description:
            "Digital education and online learning systems."
    },

    {
        id: "research",
        label: "Research",
        category: "learning",
        description:
            "Research methods, analysis, and academic exploration."
    },

    {
        id: "study-techniques",
        label: "Study Techniques",
        category: "learning",
        description:
            "Study habits, memory, and exam preparation."
    },

    {
        id: "academic-writing",
        label: "Academic Writing",
        category: "learning",
        description:
            "Academic documents, papers, and formal writing."
    },

    {
        id: "science-education",
        label: "Science Education",
        category: "learning",
        description:
            "Science learning and explanation."
    },

    {
        id: "technology-education",
        label: "Technology Education",
        category: "learning",
        description:
            "Teaching technology concepts and digital skills."
    },

    {
        id: "language-learning",
        label: "Language Learning",
        category: "learning",
        description:
            "Language education and communication skills."
    },

    {
        id: "training-design",
        label: "Training Design",
        category: "training",
        description:
            "Creating courses, workshops, and training programs."
    }
,

    /* =========================
       Creator
       ========================= */

    {
        id: "content-creation",
        label: "Content Creation",
        category: "content-creation",
        description:
            "Creating digital content for audiences and platforms."
    },

    {
        id: "storytelling",
        label: "Storytelling",
        category: "content-creation",
        description:
            "Stories, narratives, and emotional communication."
    },

    {
        id: "video-production",
        label: "Video Production",
        category: "video-creation",
        description:
            "Video planning, production, and publishing."
    },

    {
        id: "photography",
        label: "Photography",
        category: "photography",
        description:
            "Visual storytelling through photography."
    },

    {
        id: "podcasting",
        label: "Podcasting",
        category: "podcast",
        description:
            "Podcast planning, episodes, and discussions."
    },

    {
        id: "personal-brand",
        label: "Personal Brand",
        category: "personal-brand",
        description:
            "Building identity and reputation online."
    },

    {
        id: "audience-growth",
        label: "Audience Growth",
        category: "content-creation",
        description:
            "Growing audiences and improving engagement."
    },

    {
        id: "influencer-marketing",
        label: "Influencer Marketing",
        category: "content-creation",
        description:
            "Creator partnerships and digital influence."
    },

    {
        id: "creative-writing",
        label: "Creative Writing",
        category: "writing",
        description:
            "Creative stories, ideas, and written expression."
    },

    {
        id: "digital-art",
        label: "Digital Art",
        category: "design-creator",
        description:
            "Digital illustrations, visual design, and creativity."
    },


    /* =========================
       Community
       ========================= */

    {
        id: "social-impact",
        label: "Social Impact",
        category: "social-impact",
        description:
            "Positive social change and community development."
    },

    {
        id: "volunteer-work",
        label: "Volunteer Work",
        category: "social-impact",
        description:
            "Volunteering, service, and community contribution."
    },

    {
        id: "awareness-campaigns",
        label: "Awareness Campaigns",
        category: "social-impact",
        description:
            "Public awareness and information campaigns."
    },

    {
        id: "community-events",
        label: "Community Events",
        category: "events",
        description:
            "Planning and communicating community events."
    },

    {
        id: "public-communication",
        label: "Public Communication",
        category: "events",
        description:
            "Messages for public groups and communities."
    },

    {
        id: "nonprofit-activities",
        label: "Nonprofit Activities",
        category: "social-impact",
        description:
            "Nonprofit initiatives and organizational communication."
    },


    /* =========================
       Organization
       ========================= */

    {
        id: "internal-communication",
        label: "Internal Communication",
        category: "internal-communication",
        description:
            "Internal updates, announcements, and communication."
    },

    {
        id: "organization-policies",
        label: "Organization Policies",
        category: "institution",
        description:
            "Rules, guidelines, and organizational policies."
    },

    {
        id: "team-updates",
        label: "Team Updates",
        category: "internal-communication",
        description:
            "Team reports, updates, and progress communication."
    },

    {
        id: "reports",
        label: "Reports",
        category: "institution",
        description:
            "Business, project, and organizational reports."
    },

    {
        id: "documentation",
        label: "Documentation",
        category: "institution",
        description:
            "Process documents and organizational knowledge."
    },

    {
        id: "process-improvement",
        label: "Process Improvement",
        category: "operations",
        description:
            "Improving systems, workflows, and efficiency."
    },

    {
        id: "culture-building",
        label: "Culture Building",
        category: "institution",
        description:
            "Building values, teamwork, and organizational culture."
    }
,

    /* =========================
       Science
       ========================= */

    {
        id: "physics",
        label: "Physics",
        category: "science",
        description:
            "Physics concepts, discoveries, and scientific explanations."
    },

    {
        id: "chemistry",
        label: "Chemistry",
        category: "science",
        description:
            "Chemical concepts, research, and applications."
    },

    {
        id: "biology",
        label: "Biology",
        category: "science",
        description:
            "Life sciences, organisms, and biological discoveries."
    },

    {
        id: "space-science",
        label: "Space Science",
        category: "science",
        description:
            "Space exploration, astronomy, and universe research."
    },

    {
        id: "research-methods",
        label: "Research Methods",
        category: "research",
        description:
            "Scientific research approaches and analysis."
    },

    {
        id: "scientific-discovery",
        label: "Scientific Discovery",
        category: "science",
        description:
            "New discoveries, inventions, and scientific progress."
    },


    /* =========================
       Healthcare
       ========================= */

    {
        id: "medicine",
        label: "Medicine",
        category: "healthcare",
        description:
            "Medical knowledge, healthcare practices, and treatments."
    },

    {
        id: "public-health",
        label: "Public Health",
        category: "healthcare",
        description:
            "Community health, prevention, and awareness."
    },

    {
        id: "wellness",
        label: "Wellness",
        category: "healthcare",
        description:
            "Health, lifestyle, and wellbeing."
    },

    {
        id: "healthcare-technology",
        label: "Healthcare Technology",
        category: "healthcare",
        description:
            "Digital health systems and medical technology."
    },

    {
        id: "medical-research",
        label: "Medical Research",
        category: "healthcare",
        description:
            "Healthcare studies and medical innovation."
    },


    /* =========================
       Legal
       ========================= */

    {
        id: "law",
        label: "Law",
        category: "legal",
        description:
            "Legal concepts, systems, and information."
    },

    {
        id: "contracts",
        label: "Contracts",
        category: "legal",
        description:
            "Contract writing, agreements, and terms."
    },

    {
        id: "compliance",
        label: "Compliance",
        category: "legal",
        description:
            "Rules, regulations, and compliance requirements."
    },

    {
        id: "intellectual-property",
        label: "Intellectual Property",
        category: "legal",
        description:
            "Patents, trademarks, copyrights, and ownership."
    },

    {
        id: "privacy",
        label: "Privacy",
        category: "legal",
        description:
            "Privacy laws, data protection, and security."
    },

    {
        id: "regulations",
        label: "Regulations",
        category: "legal",
        description:
            "Industry rules, standards, and regulations."
    },


    /* =========================
       Industry
       ========================= */

    {
        id: "construction",
        label: "Construction",
        category: "construction",
        description:
            "Construction projects, infrastructure, and development."
    },

    {
        id: "energy-industry",
        label: "Energy",
        category: "energy",
        description:
            "Energy production, renewable energy, and resources."
    },

    {
        id: "environmental-sustainability",
        label: "Environmental Sustainability",
        category: "environment",
        description:
            "Sustainability, conservation, and climate solutions."
    },

    {
        id: "agricultural-technology",
        label: "Agricultural Technology",
        category: "agriculture",
        description:
            "Modern farming, technology, and agriculture innovation."
    },

    {
        id: "transportation",
        label: "Transportation",
        category: "logistics",
        description:
            "Transport systems, mobility, and infrastructure."
    },

    {
        id: "supply-chain-management",
        label: "Supply Chain Management",
        category: "supply-chain",
        description:
            "Supply networks, inventory, and distribution."
    },

    {
        id: "hospitality-management",
        label: "Hospitality Management",
        category: "hospitality",
        description:
            "Hotels, tourism, and hospitality operations."
    },

    {
        id: "retail-business",
        label: "Retail Business",
        category: "retail",
        description:
            "Retail operations, customers, and commerce."
    },

    {
        id: "property-development",
        label: "Property Development",
        category: "real-estate",
        description:
            "Real estate projects, property, and development."
    }
,

    /* =========================
       Human & General Knowledge
       ========================= */

    {
        id: "finance",
        label: "Finance",
        category: "finance",
        description:
            "Money, financial concepts, and financial decision making."
    },

    {
        id: "accounting",
        label: "Accounting",
        category: "finance",
        description:
            "Accounting principles, records, and financial reporting."
    },

    {
        id: "personal-finance",
        label: "Personal Finance",
        category: "finance",
        description:
            "Saving, budgeting, investing, and money management."
    },

    {
        id: "economics",
        label: "Economics",
        category: "finance",
        description:
            "Markets, economies, and economic concepts."
    },

    {
        id: "history",
        label: "History",
        category: "general",
        description:
            "Historical events, people, and civilizations."
    },

    {
        id: "culture",
        label: "Culture",
        category: "general",
        description:
            "Cultures, traditions, and human societies."
    },

    {
        id: "philosophy",
        label: "Philosophy",
        category: "general",
        description:
            "Ideas, beliefs, ethics, and human thinking."
    },

    {
        id: "psychology",
        label: "Psychology",
        category: "general",
        description:
            "Human behavior, mind, and emotions."
    },

    {
        id: "lifestyle",
        label: "Lifestyle",
        category: "general",
        description:
            "Daily life, habits, and personal interests."
    },

    {
        id: "food-cooking",
        label: "Food & Cooking",
        category: "food",
        description:
            "Food, recipes, cooking, and culinary topics."
    },

    {
        id: "fitness",
        label: "Fitness",
        category: "healthcare",
        description:
            "Exercise, fitness, and healthy living."
    },

    {
        id: "parenting",
        label: "Parenting",
        category: "personal-development",
        description:
            "Parenting, family, and child development."
    },

    {
        id: "travel-experiences",
        label: "Travel Experiences",
        category: "travel",
        description:
            "Travel stories, destinations, and experiences."
    },

    {
        id: "climate-change",
        label: "Climate Change",
        category: "environment",
        description:
            "Climate, environmental challenges, and solutions."
    },

    {
        id: "spirituality",
        label: "Spirituality",
        category: "general",
        description:
            "Spiritual ideas, reflection, and personal meaning."
    }
,

    /* =========================
       Personal Development
       ========================= */

    {
        id: "goal-setting",
        label: "Goal Setting",
        category: "personal-development",
        description:
            "Setting meaningful goals and creating action plans."
    },

    {
        id: "self-improvement",
        label: "Self Improvement",
        category: "personal-development",
        description:
            "Developing better habits, skills, and personal growth."
    },

    {
        id: "time-management",
        label: "Time Management",
        category: "personal-development",
        description:
            "Managing time effectively for work and life."
    },

    {
        id: "critical-thinking",
        label: "Critical Thinking",
        category: "personal-development",
        description:
            "Analyzing information and making better decisions."
    },

    {
        id: "problem-solving",
        label: "Problem Solving",
        category: "personal-development",
        description:
            "Finding practical and creative solutions."
    },

    {
        id: "confidence-building",
        label: "Confidence Building",
        category: "personal-development",
        description:
            "Developing self-confidence and self-belief."
    },

    {
        id: "motivation",
        label: "Motivation",
        category: "personal-development",
        description:
            "Building and maintaining personal motivation."
    },

    {
        id: "habit-building",
        label: "Habit Building",
        category: "personal-development",
        description:
            "Creating positive daily habits."
    },


    /* =========================
       Relationships
       ========================= */

    {
        id: "family-relationships",
        label: "Family Relationships",
        category: "relationships",
        description:
            "Building stronger family connections."
    },

    {
        id: "friendships",
        label: "Friendships",
        category: "relationships",
        description:
            "Creating and maintaining healthy friendships."
    },

    {
        id: "professional-relationships",
        label: "Professional Relationships",
        category: "relationships",
        description:
            "Building trust and collaboration at work."
    },

    {
        id: "communication-skills",
        label: "Communication Skills",
        category: "relationships",
        description:
            "Improving everyday communication."
    },

    {
        id: "conflict-management",
        label: "Conflict Management",
        category: "relationships",
        description:
            "Resolving disagreements respectfully."
    },

    {
        id: "teamwork",
        label: "Teamwork",
        category: "relationships",
        description:
            "Working effectively with others."
    },


    /* =========================
       Life Experience
       ========================= */

    {
        id: "life-lessons",
        label: "Life Lessons",
        category: "life-experience",
        description:
            "Experiences that teach valuable life lessons."
    },

    {
        id: "personal-stories",
        label: "Personal Stories",
        category: "life-experience",
        description:
            "Sharing meaningful personal experiences."
    },

    {
        id: "success-stories",
        label: "Success Stories",
        category: "life-experience",
        description:
            "Achievements, journeys, and milestones."
    },

    {
        id: "failure-lessons",
        label: "Failure Lessons",
        category: "life-experience",
        description:
            "Learning and growing from setbacks."
    },

    {
        id: "life-milestones",
        label: "Life Milestones",
        category: "life-experience",
        description:
            "Important moments and major achievements."
    },

    {
        id: "inspiration",
        label: "Inspiration",
        category: "life-experience",
        description:
            "Experiences that inspire positive action."
    }

,

    /* =========================
       Engineering
       ========================= */

    {
        id: "civil-engineering",
        label: "Civil Engineering",
        category: "engineering",
        description:
            "Infrastructure, buildings, roads, and public works."
    },

    {
        id: "mechanical-engineering",
        label: "Mechanical Engineering",
        category: "engineering",
        description:
            "Machines, manufacturing, and mechanical systems."
    },

    {
        id: "electrical-engineering",
        label: "Electrical Engineering",
        category: "engineering",
        description:
            "Electrical systems, power, and electronics."
    },

    {
        id: "electronics-engineering",
        label: "Electronics Engineering",
        category: "engineering",
        description:
            "Electronic circuits, embedded systems, and devices."
    },

    {
        id: "industrial-engineering",
        label: "Industrial Engineering",
        category: "engineering",
        description:
            "Process optimization and industrial productivity."
    },

    {
        id: "quality-engineering",
        label: "Quality Engineering",
        category: "engineering",
        description:
            "Engineering quality standards and continuous improvement."
    },


    /* =========================
       Sales
       ========================= */

    {
        id: "sales-strategy",
        label: "Sales Strategy",
        category: "sales",
        description:
            "Planning and executing successful sales strategies."
    },

    {
        id: "sales-negotiation",
        label: "Sales Negotiation",
        category: "sales",
        description:
            "Negotiating effectively with customers and partners."
    },

    {
        id: "sales-pipeline",
        label: "Sales Pipeline",
        category: "sales",
        description:
            "Managing leads from prospect to customer."
    },

    {
        id: "customer-retention",
        label: "Customer Retention",
        category: "sales",
        description:
            "Building long-term customer relationships."
    },

    {
        id: "b2b-sales",
        label: "B2B Sales",
        category: "sales",
        description:
            "Business-to-business sales practices."
    },

    {
        id: "b2c-sales",
        label: "B2C Sales",
        category: "sales",
        description:
            "Business-to-consumer sales strategies."
    },


    /* =========================
       Human Resources
       ========================= */

    {
        id: "recruitment",
        label: "Recruitment",
        category: "human-resources",
        description:
            "Hiring, sourcing, and recruiting talent."
    },

    {
        id: "employee-engagement",
        label: "Employee Engagement",
        category: "human-resources",
        description:
            "Improving employee satisfaction and participation."
    },

    {
        id: "performance-review",
        label: "Performance Review",
        category: "human-resources",
        description:
            "Evaluating employee performance and growth."
    },

    {
        id: "workplace-culture",
        label: "Workplace Culture",
        category: "human-resources",
        description:
            "Creating a healthy and productive work environment."
    },

    {
        id: "learning-development",
        label: "Learning & Development",
        category: "human-resources",
        description:
            "Employee training and career development."
    },

    {
        id: "employee-wellbeing",
        label: "Employee Wellbeing",
        category: "human-resources",
        description:
            "Supporting employee health and wellbeing."
    },


    /* =========================
       Design
       ========================= */

    {
        id: "graphic-design",
        label: "Graphic Design",
        category: "design",
        description:
            "Visual communication through graphics and layouts."
    },

    {
        id: "ui-design",
        label: "UI Design",
        category: "design",
        description:
            "Designing intuitive user interfaces."
    },

    {
        id: "ux-design",
        label: "UX Design",
        category: "design",
        description:
            "Creating effective user experiences."
    },

    {
        id: "design-systems",
        label: "Design Systems",
        category: "design",
        description:
            "Reusable components and design consistency."
    },

    {
        id: "branding-design",
        label: "Brand Identity Design",
        category: "design",
        description:
            "Creating logos, identity systems, and brand visuals."
    },

    {
        id: "typography",
        label: "Typography",
        category: "design",
        description:
            "Fonts, readability, and visual hierarchy."
    }
,

    /* =========================
       Government
       ========================= */

    {
        id: "government-administration",
        label: "Government Administration",
        category: "government",
        description:
            "Public administration, government systems, and services."
    },

    {
        id: "e-governance",
        label: "E-Governance",
        category: "government",
        description:
            "Digital government services and technology."
    },

    {
        id: "civic-services",
        label: "Civic Services",
        category: "government",
        description:
            "Public services and citizen support systems."
    },

    {
        id: "urban-development",
        label: "Urban Development",
        category: "government",
        description:
            "Cities, infrastructure, and urban planning."
    },


    /* =========================
       Public Policy
       ========================= */

    {
        id: "policy-development",
        label: "Policy Development",
        category: "public-policy",
        description:
            "Creating and evaluating public policies."
    },

    {
        id: "governance",
        label: "Governance",
        category: "public-policy",
        description:
            "Leadership, institutions, and governance systems."
    },

    {
        id: "social-policy",
        label: "Social Policy",
        category: "public-policy",
        description:
            "Policies affecting communities and society."
    },


    /* =========================
       Media
       ========================= */

    {
        id: "journalism",
        label: "Journalism",
        category: "media",
        description:
            "News reporting, investigation, and storytelling."
    },

    {
        id: "news-writing",
        label: "News Writing",
        category: "media",
        description:
            "Writing news articles and reports."
    },

    {
        id: "public-relations",
        label: "Public Relations",
        category: "media",
        description:
            "Managing public communication and reputation."
    },

    {
        id: "broadcasting",
        label: "Broadcasting",
        category: "media",
        description:
            "Radio, television, and digital broadcasting."
    },


    /* =========================
       Entertainment
       ========================= */

    {
        id: "movies",
        label: "Movies",
        category: "entertainment",
        description:
            "Film creation, reviews, and entertainment content."
    },

    {
        id: "television",
        label: "Television",
        category: "entertainment",
        description:
            "TV programs, shows, and media production."
    },

    {
        id: "theatre",
        label: "Theatre",
        category: "entertainment",
        description:
            "Stage performance and theatre arts."
    },

    {
        id: "dance",
        label: "Dance",
        category: "entertainment",
        description:
            "Dance, performance, and creative expression."
    },


    /* =========================
       Sports
       ========================= */

    {
        id: "cricket",
        label: "Cricket",
        category: "sports",
        description:
            "Cricket, players, teams, and analysis."
    },

    {
        id: "football",
        label: "Football",
        category: "sports",
        description:
            "Football, teams, tactics, and events."
    },

    {
        id: "basketball",
        label: "Basketball",
        category: "sports",
        description:
            "Basketball skills, teams, and competitions."
    },

    {
        id: "tennis",
        label: "Tennis",
        category: "sports",
        description:
            "Tennis players, techniques, and tournaments."
    },

    {
        id: "sports-management",
        label: "Sports Management",
        category: "sports",
        description:
            "Managing sports teams, events, and organizations."
    },


    /* =========================
       Music
       ========================= */

    {
        id: "music-creation",
        label: "Music Creation",
        category: "music",
        description:
            "Songwriting, composition, and music production."
    },

    {
        id: "music-production",
        label: "Music Production",
        category: "music",
        description:
            "Recording, mixing, and producing music."
    },

    {
        id: "music-performance",
        label: "Music Performance",
        category: "music",
        description:
            "Artists, performances, and live music."
    },

    {
        id: "music-business",
        label: "Music Business",
        category: "music",
        description:
            "Publishing, promotion, and music industry."
    }



]);

Object.freeze(VW_TOPICS);

export default VW_TOPICS;
