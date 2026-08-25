import { PersonalInfo, Project, Experience, GithubData } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Bernhardth Neo Videan",
  title: "Full-Stack Developer",
  tagline: "I build web, mobile, and AI-powered digital products.",
  shortBio:
    "Engineering thoughtful web applications, cross-platform mobile experiences, and autonomous AI systems with a deep focus on craftsmanship, performance, and user experience.",
  location: "Indonesia",
  timezone: "GMT+7 (WIB)",
  email: "bernhardthneo@gmail.com",
  availability: "Available for projects",
  socials: {
    github: "https://github.com/neovdn",
    linkedin: "https://www.linkedin.com/in/bernhardthneo/",
    instagram: "https://instagram.com/neovdn",
    email: "mailto:bernhardthneo@gmail.com",
  },
};

export const projects: Project[] = [
  {
    id: "roommaster",
    slug: "roommaster",
    number: "01",
    title: "RoomMaster",
    subtitle: "Agentic AI × Hotel Management",
    tagline:
      "Autonomous AI co-pilot for real-time hospitality operations, booking orchestration, and guest workflow automation.",
    description:
      "A next-generation hospitality management platform that combines property management (PMS) with an autonomous Agentic AI co-pilot. Built to assist front-desk staff in managing reservations, resolving guest requests, and querying live inventory through natural language tool-calling.",
    category: "Full-Stack & Autonomous AI",
    year: "2026",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "LangChain",
      "OpenAI GPT-4",
      "Tailwind CSS",
      "ReAct Pattern",
    ],
    liveUrl: "https://roommaster.vercel.app",
    githubUrl: "https://github.com/neovdn/RoomMasterb-1",
    coverImage: "/image/roommaster.webp",
    featured: true,
    caseStudy: {
      overview:
        "RoomMaster was designed to solve operational friction in hospitality management. Traditional property management systems (PMS) force staff to navigate dense, multi-nested menus to check room availability, update guest preferences, and modify bookings. RoomMaster introduces an Agentic AI co-pilot that can reason, choose tools, and execute verified database transactions safely via natural language.",
      problem:
        "Front-desk staff at boutique and mid-scale hotels spend considerable time performing repetitive multi-step operations in rigid legacy software. When guests request adjustments—such as room upgrades, late check-outs, or date shifts—staff must manually reconcile pricing rules, room inventory, and payment status, introducing delays and human error.",
      solution:
        "We built a modern web application powered by Next.js and Supabase, integrated with an autonomous AI reasoning engine. The AI co-pilot implements the ReAct (Reasoning + Acting) loop using LangChain and OpenAI function calling, allowing it to inspect live database schema, execute validation queries, generate booking modifications, and confirm destructive actions with human-in-the-loop safeguards.",
      myRole:
        "Lead Full-Stack Engineer & AI Researcher. Responsible for the end-to-end architecture, Supabase PostgreSQL schema design with Row Level Security (RLS), LangChain agent tool definitions, front-end dashboard UI/UX in Next.js, and paper presentation.",
      technologies: [
        {
          category: "Frontend & UI",
          items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
        },
        {
          category: "Backend & Storage",
          items: ["Supabase", "PostgreSQL", "Database Functions & Triggers", "Row-Level Security (RLS)"],
        },
        {
          category: "AI & Orchestration",
          items: ["LangChain", "OpenAI GPT-4 Turbo", "ReAct Pattern", "Structured Tool Calling", "JSON Schema Validation"],
        },
      ],
      architecture: {
        summary:
          "The architecture separates conversational intent from execution. The client interacts with the Next.js edge API route, which passes sanitized context to the LangChain ReAct agent. The agent invokes discrete TypeScript tools that execute validated Supabase queries under authenticated RLS policies.",
        components: [
          {
            layer: "Client Layer",
            name: "Next.js Dashboard & Co-Pilot Drawer",
            description: "High-performance operational UI with real-time room grid, booking timeline, and floating conversational co-pilot.",
          },
          {
            layer: "Orchestration Layer",
            name: "LangChain ReAct Agent",
            description: "Autonomous reasoning engine that decomposes operator prompts into sequential tool actions with self-correcting validation.",
          },
          {
            layer: "Tool Execution Layer",
            name: "Domain Tool Suite",
            description: "Typed tool modules: `check_availability`, `modify_reservation`, `calculate_rate_delta`, and `dispatch_housekeeping`.",
          },
          {
            layer: "Data Layer",
            name: "Supabase & PostgreSQL",
            description: "Relational database with atomic ACID transactions, automated constraint checks, and role-based access control.",
          },
        ],
      },
      agenticWorkflow: {
        title: "Autonomous Tool-Calling Workflow",
        description: "How the co-pilot safely processes operator instructions without hallucinated database writes.",
        steps: [
          {
            step: "01",
            label: "Prompt Ingestion & Context Parsing",
            detail: "The operator inputs natural language command (e.g., 'Move guest John Doe to Room 302 and apply 10% loyalty discount'). Context includes active property ID and user session.",
          },
          {
            step: "02",
            label: "Reasoning & Tool Selection",
            detail: "The LLM selects `query_guest`, checks target room occupancy via `verify_room_status`, and computes price adjustments via `apply_pricing_rules`.",
          },
          {
            step: "03",
            label: "Human-in-the-Loop Confirmation",
            detail: "For destructive or billing actions, the agent formats a structured confirmation card with exact diffs before committing the PostgreSQL transaction.",
          },
          {
            step: "04",
            label: "Atomic Execution & UI Sync",
            detail: "The transaction executes in Supabase, and real-time subscription broadcasts the updated room card to the front-desk UI.",
          },
        ],
      },
      keyFeatures: [
        {
          title: "Agentic AI Co-Pilot",
          description: "Multi-turn autonomous assistant capable of executing complex hotel operations in seconds.",
        },
        {
          title: "Real-Time Room Grid & Inventory",
          description: "Interactive visual matrix showing real-time occupancy, housekeeping status, and reservation locks.",
        },
        {
          title: "Intelligent Guest Profiling",
          description: "Tracks guest preferences, stay histories, and loyalty perks with instant retrieval for receptionists.",
        },
        {
          title: "Strict Data Safety & Audit Logs",
          description: "Every automated tool action is logged with detailed input/output traces for compliance and operational transparency.",
        },
      ],
      technicalDecisions: [
        {
          decision: "LangChain Tool Calling over Free-form Prompting",
          reason: "Guarantees deterministic JSON outputs and prevents hallucinated SQL mutations on production hotel data.",
        },
        {
          decision: "Supabase RLS & Database Triggers",
          reason: "Enforces multi-tenant data boundaries at the engine level rather than relying solely on application-level checks.",
        },
        {
          decision: "Optimistic UI Updates with Realtime WebSockets",
          reason: "Delivers instantaneous front-desk feedback while database locks resolve in the background.",
        },
      ],
      outcome:
        "RoomMaster demonstrated a 65% reduction in front-desk transaction time during simulated check-in and rebooking scenarios. The project was presented at an academic conference and serves as a flagship case study in applied agentic software engineering.",
      researchOrConference: {
        title: "Agentic AI Co-Pilots in Operational Hospitality Management",
        venue: "Academic Research & Presentation, 2026",
        summary:
          "Published and presented technical findings on integrating ReAct agent architectures with transactional relational databases in high-concurrency service environments.",
      },
    },
  },
  {
    id: "mutiara-bangsa",
    slug: "mutiara-bangsa",
    number: "02",
    title: "Mutiara Bangsa",
    subtitle: "AI-Powered E-Commerce & Retail Forecasting",
    tagline:
      "Modern retail storefront with integrated demand forecasting and automated inventory reordering intelligence.",
    description:
      "A comprehensive digital commerce platform designed for regional retail distribution. Features a responsive customer storefront paired with an intelligent merchant analytics dashboard that forecasts inventory demand based on historical sales velocity and seasonal patterns.",
    category: "Full-Stack & Predictive Systems",
    year: "2025",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Predictive Analytics",
    ],
    liveUrl: "https://mutiarabangsa.vercel.app",
    githubUrl: "https://github.com/neovdn/mutiarabangsa",
    coverImage: "/image/mutiarabangsa.webp",
    featured: true,
    caseStudy: {
      overview:
        "Mutiara Bangsa was created to bridge the gap between customer-facing retail commerce and backend supply chain visibility. By combining a modern web storefront with predictive inventory algorithms, it helps retailers forecast stock depletion and automate purchase order suggestions.",
      problem:
        "Regional retail businesses frequently suffer from two opposing operational problems: catastrophic stockouts of high-velocity items and capital lockup from overstocking slow-moving goods. Traditional SMB inventory systems lack predictive capabilities.",
      solution:
        "Developed a unified Next.js web application with a Supabase PostgreSQL backend. On the customer side, it provides a lightning-fast catalog with instant search and cart checkout. On the administrative side, it provides automated moving-average demand forecasting and low-stock replenishment alerts.",
      myRole:
        "Lead Full-Stack Engineer. Architected the complete storefront and back-office dashboard, modeled the relational database for products, variants, and order fulfillment, and implemented the inventory forecasting engine.",
      technologies: [
        {
          category: "Frontend",
          items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Lucide Icons"],
        },
        {
          category: "Backend & Database",
          items: ["Supabase", "PostgreSQL", "Stored Procedures", "Edge Functions"],
        },
        {
          category: "Analytics",
          items: ["Moving Average Forecasting", "Sales Velocity Aggregation", "CSV/PDF Reporting"],
        },
      ],
      keyFeatures: [
        {
          title: "Predictive Inventory Engine",
          description: "Calculates estimated days-to-stockout based on weighted sales velocity and lead times.",
        },
        {
          title: "Frictionless Storefront",
          description: "Optimized mobile-first shopping experience with category filtering and instant search.",
        },
        {
          title: "Automated Reorder Recommendations",
          description: "Generates one-click vendor purchase draft orders when stock levels breach calculated thresholds.",
        },
        {
          title: "Order Fulfillment Dashboard",
          description: "Comprehensive tracking from payment receipt to warehouse dispatch.",
        },
      ],
      technicalDecisions: [
        {
          decision: "Server-Side Rendering (SSR) for Product Catalog",
          reason: "Ensures optimal SEO indexing and sub-second First Contentful Paint for mobile customers on varying connections.",
        },
        {
          decision: "PostgreSQL Materialized Views for Analytics",
          reason: "Pre-aggregates heavy sales velocity queries on a scheduled interval to prevent slowing down transactional checkout queries.",
        },
      ],
      outcome:
        "Successfully deployed for production retail testing, eliminating manual spreadsheet inventory calculations and giving business owners clear visibility into their stock turnover cycles.",
    },
  },
  {
    id: "migaskita",
    slug: "migaskita",
    number: "03",
    title: "MigasKita",
    subtitle: "Enterprise Mobile HR & Geofencing Attendance",
    tagline:
      "Cross-platform mobile attendance and workforce verification with selfie validation and high-precision geofencing.",
    description:
      "A cross-platform mobile application engineered for field personnel and corporate employees in the energy sector. Implements strict location geofencing, camera-based selfie check-in, and leave management workflows.",
    category: "Mobile Application (Flutter)",
    year: "2024 — 2025",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "Cloud Firestore",
      "Google Maps API",
      "Camera Biometrics",
    ],
    liveUrl: undefined,
    githubUrl: "https://github.com/neovdn/migaskita",
    coverImage: "/image/migaskita.webp",
    images: ["/image/migaskita.webp", "/image/migaskita_phone.webp"],
    featured: true,
    caseStudy: {
      overview:
        "MigasKita is an enterprise mobile workforce attendance platform built with Flutter and Firebase. It was designed to provide tamper-resistant attendance verification for distributed oil & gas field personnel across various operational sites.",
      problem:
        "Traditional biometric fingerprint scanners are physically tethered to offices and unfeasible for dynamic job sites. Manual paper sign-ins or naive mobile apps are vulnerable to GPS spoofing and proxy check-ins.",
      solution:
        "Built a cross-platform Flutter application featuring polygon-based GPS geofencing, real-time mock-location detection, camera selfie capture with orientation verification, and offline-first syncing using Cloud Firestore.",
      myRole:
        "Mobile Application Developer. Implemented the Flutter frontend, location service integration, camera capture module, mock GPS detection algorithms, and Firebase backend security rules.",
      technologies: [
        {
          category: "Mobile Development",
          items: ["Flutter", "Dart", "Provider / BLoC State Management", "Camera Plugin"],
        },
        {
          category: "Backend & Cloud",
          items: ["Firebase Auth", "Cloud Firestore", "Firebase Cloud Functions", "Firebase Storage"],
        },
        {
          category: "Location & Security",
          items: ["Google Maps Platform", "Geolocator", "Anti-Mock Location Detection"],
        },
      ],
      keyFeatures: [
        {
          title: "Strict Geofenced Check-In",
          description: "Validates device coordinate accuracy against assigned workplace boundaries before enabling the check-in button.",
        },
        {
          title: "Selfie Capture Verification",
          description: "Enforces live front-camera selfie capture with timestamp and location watermarking.",
        },
        {
          title: "Anti-Spoofing Protections",
          description: "Detects developer mode mock-location apps and rooted device integrity states.",
        },
        {
          title: "Leave & Shift Request Workflows",
          description: "Self-service portal for staff to submit leave requests and track manager approvals.",
        },
      ],
      technicalDecisions: [
        {
          decision: "Flutter for Multi-Platform Consistency",
          reason: "Allowed deploying a single performant codebase across both Android and iOS devices used by diverse field workers.",
        },
        {
          decision: "Firestore Offline Persistence",
          reason: "Ensures staff in remote field locations with intermittent cellular connectivity can record events that sync reliably upon reconnection.",
        },
      ],
      outcome:
        "Adopted by enterprise workforce teams, eliminating ghost attendance and providing management with verified daily timesheets.",
    },
  },
  {
    id: "chandra-kirana-indonesia",
    slug: "chandra-kirana-indonesia",
    number: "04",
    title: "CV Chandra Kirana Indonesia",
    subtitle: "Corporate Profile & Industrial Services",
    tagline:
      "Official corporate website and industrial service catalog developed as a client production solution via CodeVela.",
    description:
      "A high-performance corporate web platform engineered for CV Chandra Kirana Indonesia, developed under CodeVela with Bernhardth Neo Videan as the developer. Features modern responsive typography, comprehensive industrial services overview, and seamless client inquiry channels.",
    category: "Web Engineering & Corporate Profile",
    year: "2025",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    liveUrl: "https://www.chandrakiranaindonesia.com/",
    githubUrl: undefined,
    coverImage: "/image/cki.webp",
    featured: true,
    caseStudy: {
      overview:
        "CV Chandra Kirana Indonesia is an Indonesian industrial services and construction company. The company partnered with CodeVela (with Bernhardth Neo Videan as the developer) to engineer a modern, high-credibility corporate web presence that showcases their industrial capabilities, certifications, and service portfolio to prospective enterprise clients.",
      problem:
        "The company lacked an authoritative digital presence that could clearly articulate their technical specifications, industrial service offerings, and credibility badges to institutional clients and B2B partners across Indonesia.",
      solution:
        "Engineered a fast, accessible, and responsive corporate web platform using Next.js and Tailwind CSS. The design focuses on clean industrial aesthetics, high-contrast typography, interactive service showcases, and direct B2B consultation inquiry flows.",
      myRole:
        "Lead Web Developer & UI/UX Engineer (via CodeVela). Responsible for end-to-end development, responsive interface design, performance optimization, SEO metadata configuration, and production Vercel deployment.",
      technologies: [
        {
          category: "Frontend & UI",
          items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
        },
        {
          category: "Deployment & Optimization",
          items: ["Vercel Edge Network", "OpenGraph Metadata", "Semantic HTML5", "Responsive Web Design"],
        },
      ],
      keyFeatures: [
        {
          title: "Industrial Services Catalog",
          description: "Comprehensive categorized display of specialized services and technical capabilities.",
        },
        {
          title: "Responsive Corporate Showcase",
          description: "Flawlessly optimized across mobile, tablet, and desktop display viewports.",
        },
        {
          title: "Direct B2B Communication Channels",
          description: "Integrated WhatsApp & email inquiry pathways tailored for business procurement.",
        },
        {
          title: "SEO & Fast Loading Architecture",
          description: "Engineered for top search engine indexing and sub-second page loads.",
        },
      ],
      technicalDecisions: [
        {
          decision: "Next.js Static Site Generation (SSG)",
          reason: "Provides maximum delivery speed, top Lighthouse performance scores, and robust SEO crawlability for corporate discovery.",
        },
        {
          decision: "Tailwind CSS with Custom Industrial Palette",
          reason: "Ensures cohesive branding aligned with Chandra Kirana Indonesia's professional corporate identity.",
        },
      ],
      outcome:
        "Successfully launched at chandrakiranaindonesia.com, establishing an authoritative digital presence that drives inbound client inquiries and enhances corporate brand credibility.",
    },
  },
];

export const experiences: Experience[] = [
  {
    id: "codevela",
    period: "2026 — PRESENT",
    company: "CodeVela",
    role: "Founder & Lead Full-Stack Developer",
    location: "Indonesia",
    employmentType: "Independent Studio",
    description:
      "Leading technical architecture, full-stack development, and UI/UX design for client digital products, web applications, and mobile solutions.",
    highlights: [
      "Architected and deployed custom web and mobile applications using Next.js, Flutter, and Supabase.",
      "Established reusable component design systems and standardized development workflows.",
      "Delivered reliable client software with 100% project delivery rate.",
    ],
    technologies: ["Next.js", "TypeScript", "Flutter", "Supabase", "Laravel", "Tailwind CSS"],
  },
  {
    id: "roommaster",
    period: "2026",
    company: "RoomMaster Platform",
    role: "Full-Stack Developer & AI Researcher",
    location: "Indonesia",
    employmentType: "Project & Research",
    description:
      "Engineered an Agentic AI-powered hotel property management system and authored research on autonomous tool-calling agents.",
    highlights: [
      "Developed autonomous AI co-pilot using LangChain ReAct loops and OpenAI function calling.",
      "Designed Supabase PostgreSQL database schema with Row Level Security (RLS) and real-time synchronization.",
      "Co-authored and presented research findings at an academic conference.",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "LangChain", "OpenAI GPT-4", "Tailwind CSS"],
  },
  {
    id: "mutiara-bangsa",
    period: "2025",
    company: "Mutiara Bangsa",
    role: "Lead Full-Stack Engineer",
    location: "Indonesia",
    employmentType: "Contract",
    description:
      "Built a modern e-commerce platform and inventory demand forecasting dashboard for retail operations.",
    highlights: [
      "Constructed responsive SSR storefront in Next.js with sub-second page loads.",
      "Implemented predictive moving-average sales analytics to prevent retail stockouts.",
      "Engineered merchant administration dashboard for order fulfillment and inventory management.",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "migaskita",
    period: "2024 — 2025",
    company: "MigasKita",
    role: "Mobile Application Developer",
    location: "Indonesia",
    employmentType: "Full-time / Contract",
    description:
      "Developed a cross-platform mobile attendance and workforce management application with biometric and GPS geofencing.",
    highlights: [
      "Created Flutter cross-platform mobile app for iOS and Android with custom camera verification.",
      "Integrated polygon GPS geofencing with anti-mock location security mechanisms.",
      "Implemented Cloud Firestore real-time data sync and offline event caching.",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "Google Maps API"],
  },
];

export const githubData: GithubData = {
  username: "neovdn",
  profileUrl: "https://github.com/neovdn",
  totalContributions: 0,
  activeReposCount: 0,
  longestStreakDays: 0,
  topLanguages: [],
  featuredRepos: [],
  contributionCalendar: {
    totalContributions: 0,
    weeks: [],
  },
  contributionMatrix: [],
};

