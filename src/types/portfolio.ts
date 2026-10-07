export type IconName =
  | "aws-ec2"
  | "aws-s3"
  | "aws-ddb"
  | "aws-vpc"
  | "aws-cf"
  | "aws-iam"
  | "docker"
  | "cicd"
  | "linux"
  | "git"
  | "shell"
  | "java"
  | "cpp"
  | "javascript"
  | "sql"
  | "spring"
  | "spring-security"
  | "react"
  | "rest"
  | "maven"
  | "jwt"
  | "dsa"
  | "oop"
  | "leetcode";

export type SkillFilter = "cloud" | "devops" | "backend" | "frontend";

export type SkillTone = "accent" | "cyan" | "violet";

export type Skill = {
  name: string;
  icon: IconName;
  filters: SkillFilter[];
};

export type SkillGroup = {
  id: string;
  label: string;
  tone: SkillTone;
  skills: Skill[];
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiSample = {
  method: HttpMethod;
  path: string;
};

export type FeatureIcon = "pdf" | "quiz" | "scan" | "shield" | "docker" | "pay";

export type Feature = {
  title: string;
  text: string;
  icon: FeatureIcon;
};

export type ArchNode = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  lane: "main" | "side";
};

export type ScreenshotSlot = {
  src: string;
  alt: string;
  label: string;
};

export type RoadmapStatus = "completed" | "upcoming";

export type RoadmapItem = {
  id: string;
  title: string;
  detail: string;
  status: RoadmapStatus;
};

export type NavItem = {
  href: string;
  label: string;
  id: string;
};

export type Portfolio = {
  siteUrl: string;
  person: {
    name: string;
    given: string;
    family: string;
    email: string;
    phone: string;
    city: string;
    github: string;
    githubHandle: string;
    linkedin: string;
    x: string;
    photo: string;
    resumeUrl: string;
  };
  nav: NavItem[];
  hero: {
    status: string;
    phrases: string[];
    tagline: string;
    terminal: string[];
    badges: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    lines: string[];
    stats: Stat[];
    focusLabel: string;
    focus: string[];
  };
  skillFilters: { id: "all" | SkillFilter; label: string }[];
  skillGroups: SkillGroup[];
  project: {
    name: string;
    summary: string;
    repoUrl: string;
    tags: string[];
    architectureTitle: string;
    architectureNote: string;
    nodes: ArchNode[];
    features: Feature[];
    endpointNote: string;
    endpoints: ApiSample[];
    snippet: {
      filename: string;
      note: string;
      code: string;
    };
    screenshots: ScreenshotSlot[];
  };
  roadmap: RoadmapItem[];
  education: {
    degree: string;
    college: string;
    location: string;
    graduation: string;
    coursework: string[];
  };
  certification: {
    name: string;
    statusLabel: string;
    detail: string;
  };
  contact: {
    headline: string;
    highlight: string;
    formEndpoint: string;
    submitLabel: string;
  };
  footer: {
    credit: string;
    hostBadge: string;
  };
};
