import { PersonalInfo, Project, Experience, GithubData } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Bernhardth Neo Videan",
  title: "Full-Stack Developer",
  tagline: "I build web, mobile, and AI-powered digital products.",
  shortBio:
    "Engineering thoughtful web applications, cross-platform mobile experiences, and autonomous AI systems with a deep focus on craftsmanship, performance, and user experience.",
  location: "Indonesia",
  timezone: "GMT+7 (WIB)",
  email: "neovideanx@gmail.com",
  availability: "Available for projects",
  socials: {
    github: "https://github.com/neovdn",
    linkedin: "https://www.linkedin.com/in/bernhardthneo/",
    instagram: "https://instagram.com/neovdn",
    email: "mailto:neovideanx@gmail.com",
  },
};

export const projects: Project[] = [
  {
    id: "enterprise-pos",
    slug: "pos-laravel",
    number: "01",
    title: "Enterprise Multi-Branch POS",
    subtitle: "High-Concurrency Retail Engine & Inventory Control",
    tagline:
      "Enterprise-grade multi-branch POS and inventory control system engineered with pessimistic row locking, strict multi-tenant query scoping, and reactive Notion-style aesthetics.",
    description:
      "An enterprise-scale Point of Sale (POS) and Multi-Branch Inventory Control system built with a structured modular monolith. Engineered to guarantee financial transaction integrity and prevent inventory overselling during concurrent cashier operations using InnoDB pessimistic row locking, atomic inter-branch stock transfers, and automated physical cash float reconciliations.",
    category: "Full-Stack & Concurrency Systems",
    year: "2026",
    technologies: [
      "Laravel 12.x",
      "PHP 8.2+",
      "Livewire 3",
      "Alpine.js",
      "MySQL / InnoDB",
      "Tailwind CSS",
      "Pest PHP",
    ],
    liveUrl: undefined,
    githubUrl: "https://github.com/neovdn/POS_Laravel",
    coverImage: "/image/pos1.webp",
    images: ["/image/pos1.webp", "/image/pos2.webp", "/image/pos3.webp"],
    featured: true,
    caseStudy: {
      overview:
        "This project is an enterprise-scale Point of Sale (POS) and Multi-Branch Inventory Control system designed around a structured modular monolith architecture. The primary engineering focus lies on transactional financial integrity and the rigorous prevention of inventory overselling across high-frequency checkouts through database-level InnoDB pessimistic row locking (lockForUpdate) wrapped in atomic database transactions. The system enforces tenant query scoping across branches, cash drawer float reconciliations for cashier shifts, atomic inter-branch stock transfer approval workflows, and interactive gross profit and COGS analytics inside a Notion-inspired workspace interface.",
      problem:
        "Multi-branch retail businesses often struggle with inventory drift, concurrency race conditions during simultaneous cashier checkouts, and untracked physical cash discrepancies. When multiple cashiers ring up identical limited-stock items simultaneously, naive database queries produce negative stock and phantom sales. Furthermore, unverified inter-branch inventory transfers and chaotic shift handovers lead to unaccountable revenue leakage.",
      solution:
        "Engineered a high-concurrency Laravel 12 application featuring a dedicated Domain Service Layer (CheckoutService, ShiftService, InventoryService). Real-time inventory deduction is guarded by MySQL InnoDB pessimistic row locking (lockForUpdate) inside atomic transactions, guaranteeing zero overselling. Branch data isolation is enforced via multi-tenant query scoping, cashier shifts require mandatory physical float reconciliation with variance logging, and stock transfers execute atomically upon manager approval.",
      myRole:
        "Lead Full-Stack Architect & Backend Engineer. Designed database schemas, isolation scopes, concurrency locks, domain services, Livewire reactive components, Notion-inspired design tokens, and comprehensive Pest PHP test suites.",
      technologies: [
        {
          category: "Backend & Architecture",
          items: [
            "Laravel 12.x",
            "PHP 8.2+",
            "Domain Service Layer (CheckoutService, ShiftService, InventoryService)",
            "Modular Monolith Pattern",
          ],
        },
        {
          category: "Database & Concurrency",
          items: [
            "MySQL 8.0+ / MariaDB",
            "InnoDB Storage Engine",
            "Pessimistic Locking (lockForUpdate)",
            "Atomic DB::transaction()",
            "Multi-Tenant Query Scoping",
          ],
        },
        {
          category: "Frontend & Reactive UI",
          items: [
            "Laravel Livewire 3",
            "Alpine.js",
            "Tailwind CSS (Custom Notion Tokens)",
            "Vite 7.x",
          ],
        },
        {
          category: "Security & Testing",
          items: [
            "Laravel Breeze",
            "spatie/laravel-permission (RBAC: Superadmin, Branch Manager, Cashier)",
            "Pest PHP (39 Unit & Feature Scenarios, 100% Pass Rate)",
          ],
        },
      ],
      architecture: {
        summary:
          "The architecture implements a clean Domain Service Layer atop Laravel 12, separating business logic from HTTP transport and reactive Livewire state. All financial and inventory mutations are encapsulated inside transactional services executing pessimistic row locks against the InnoDB storage engine.",
        components: [
          {
            layer: "Presentation Layer",
            name: "Livewire 3 + Alpine.js Reactive Workspace",
            description:
              "Fast POS terminal interface with instant barcode scanning, reactive cart state management, and real-time total recalculations without full page reloads.",
          },
          {
            layer: "Domain Service Layer",
            name: "CheckoutService, ShiftService & InventoryService",
            description:
              "Encapsulated domain logic handling multi-item checkout validation, shift opening/closing float reconciliations, and inter-branch transfer state machines.",
          },
          {
            layer: "Concurrency & Lock Layer",
            name: "InnoDB Pessimistic Locking (lockForUpdate)",
            description:
              "Acquires exclusive database row locks during inventory deductions inside DB::transaction(), serializing concurrent cashier requests and eliminating race conditions.",
          },
          {
            layer: "Data Isolation Layer",
            name: "Multi-Tenant Query Scoping & RBAC",
            description:
              "Strict branch-level query isolation combined with Spatie RBAC guarding Superadmin, Branch Manager, and Cashier operational permissions.",
          },
        ],
      },
      keyFeatures: [
        {
          title: "Pessimistic Row-Locking Checkout",
          description:
            "Protects inventory counts from race conditions during simultaneous checkouts using InnoDB lockForUpdate inside atomic transactions.",
        },
        {
          title: "Multi-Tenant Branch Isolation",
          description:
            "Automated query scoping ensures staff access only their assigned branch inventory, sales logs, and registers.",
        },
        {
          title: "Cash Drawer Shift Audit & Reconciliation",
          description:
            "Mandatory shift opening float recording and end-of-shift physical cash counting with automated variance detection and audit trails.",
        },
        {
          title: "Atomic Inter-Branch Stock Transfers",
          description:
            "Two-phase transfer approval workflow that deducts transit stock and commits destination inventory only upon verified physical receipt.",
        },
        {
          title: "Gross Profit & COGS Analytics",
          description:
            "Real-time dashboards breaking down Cost of Goods Sold (HPP), revenue velocity, and net margins per product category and branch.",
        },
        {
          title: "Notion-Inspired Workspace UI",
          description:
            "Tailwind CSS styled with custom Notion design tokens, including Notion Purple accents (#5645d4), 8px rectangular buttons, and database pastel chips.",
        },
      ],
      technicalDecisions: [
        {
          decision: "InnoDB Pessimistic Locking over Optimistic Locking",
          reason:
            "Retail checkouts require immediate certainty; pessimistic locking guarantees immediate serial execution without frustrating rollback retries for cashiers during flash sale rushes.",
        },
        {
          decision: "Livewire 3 + Alpine.js over Separate SPA",
          reason:
            "Provides instantaneous reactivity for barcode scanning and cart modifications while retaining Laravel's robust server-side validation and authentication architecture.",
        },
        {
          decision: "Domain Service Layer Architecture",
          reason:
            "Decouples core checkout, inventory, and shift accounting algorithms from controllers, enabling clean automated testing and maintainability.",
        },
        {
          decision: "Comprehensive Pest PHP Test Suite",
          reason:
            "39 automated unit and feature tests validating tenant scoping boundaries, atomic mutations, shift reconciliation calculations, and race condition prevention with 100% pass rate.",
        },
      ],
      outcome:
        "Delivered an enterprise-ready retail POS system with proven 100% test pass rate across 39 scenarios, absolute financial ledger integrity, zero inventory overselling under high concurrency, and a responsive Notion-like user experience.",
    },
  },
  {
    id: "roommaster",
    slug: "roommaster",
    number: "02",
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
        "Front-desk staff at boutique and mid-scale hotels spend considerable time performing repetitive multi-step operations in rigid legacy software. When guests request adjustments, such as room upgrades, late check-outs, or date shifts, staff must manually reconcile pricing rules, room inventory, and payment status, introducing delays and human error.",
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
    number: "03",
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
    number: "04",
    title: "MigasKita",
    subtitle: "Enterprise Mobile HR & Geofencing Attendance",
    tagline:
      "Cross-platform mobile attendance and workforce verification with selfie validation and high-precision geofencing.",
    description:
      "A cross-platform mobile application engineered for field personnel and corporate employees in the energy sector. Implements strict location geofencing, camera-based selfie check-in, and leave management workflows.",
    category: "Mobile Application (Flutter)",
    year: "2024 - 2025",
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
    number: "05",
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
    period: "03/2026 – Present",
    company: "Codevela",
    role: "Founder & Full-Stack Developer",
    location: "Indonesia",
    employmentType: "Freelance",
    logo: "/image/codevela.webp",
    description:
      "Founded and managed Codevela, a freelance software development service specializing in web and mobile applications.",
    highlights: [
      "Founded and managed Codevela, a freelance software development service specializing in web and mobile applications.",
      "Delivered multiple client projects, including company profile websites, React Native applications, and custom software solutions.",
    ],
    technologies: ["Next.js", "React Native", "TypeScript", "Tailwind CSS", "Mobile & Web Apps"],
  },
  {
    id: "gresikmigas",
    period: "05/2025 – 06/2025",
    company: "PT Gresik Migas",
    role: "Mobile App Developer",
    location: "Gresik, Indonesia",
    employmentType: "Internship",
    logo: "/image/gresikmigas.webp",
    description:
      "Developed a Human Resource Management System (HRMS) mobile application using Flutter and Firebase.",
    highlights: [
      "Developed a Human Resource Management System (HRMS) mobile application using Flutter and Firebase.",
      "Built features such as authentication, location-based attendance with selfie verification, attendance tracking, role-based dashboards, and announcement management.",
      "Integrated Firebase services. Improved usability through testing and presented the final solution to stakeholders.",
    ],
    technologies: ["Flutter", "Firebase", "Dart", "HRMS", "Geofencing", "Biometric Auth"],
  },
  {
    id: "btpn",
    period: "10/2022",
    company: "BTPN Syariah",
    role: "Full-Stack Developer",
    location: "Indonesia",
    employmentType: "Internship",
    logo: "/image/btpn.webp",
    description:
      "Contributed to the development of various internal systems using Vue.js, Java, Go, SQL, and Git.",
    highlights: [
      "Contributed to the development of various internal systems using Vue.js, Java, Go, SQL, and Git.",
      "Gained hands-on experience with microservices architecture and developed a strong understanding of the professional software development lifecycle.",
    ],
    technologies: ["Vue.js", "Java", "Go", "SQL", "Git", "Microservices"],
  },
  {
    id: "ptsisi",
    period: "07/2021 – 12/2021",
    company: "PT Sinergi Informatika Semen Indonesia",
    role: "Full-Stack Developer",
    location: "Indonesia",
    employmentType: "Internship",
    logo: "/image/ptsisi.webp",
    description:
      "Developed a responsive company landing page using Bootstrap and Vue.js.",
    highlights: [
      "Developed a responsive company landing page using Bootstrap and Vue.js.",
      "Designed business process flowcharts for distribution and sales, and created intuitive UI/UX prototypes in Figma.",
      "Managed and maintained product distribution data using spreadsheets.",
      "Enhanced technical proficiency with developer tools including CLI, Git, and Vue routing.",
    ],
    technologies: ["Vue.js", "Bootstrap", "Figma", "Git", "CLI", "UI/UX Prototyping"],
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

