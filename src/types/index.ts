export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  category: string;
  year: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  coverImage: string;
  featured: boolean;
  caseStudy: CaseStudy;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  solution: string;
  myRole: string;
  technologies: {
    category: string;
    items: string[];
  }[];
  architecture?: {
    summary: string;
    components: {
      layer: string;
      name: string;
      description: string;
    }[];
  };
  agenticWorkflow?: {
    title: string;
    description: string;
    steps: {
      step: string;
      label: string;
      detail: string;
    }[];
  };
  keyFeatures: {
    title: string;
    description: string;
  }[];
  technicalDecisions: {
    decision: string;
    reason: string;
  }[];
  outcome: string;
  researchOrConference?: {
    title: string;
    venue: string;
    summary: string;
  };
}

export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  location: string;
  employmentType: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  isPrivate?: boolean;
}

export interface GithubData {
  username: string;
  profileUrl: string;
  totalContributions: number;
  activeReposCount: number;
  longestStreakDays: number;
  topLanguages: { name: string; percentage: number }[];
  featuredRepos: GithubRepo[];
  // 52 weeks x 7 days (0 to 4 intensity)
  contributionMatrix: number[][];
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  location: string;
  timezone: string;
  email: string;
  availability: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    email: string;
  };
}
