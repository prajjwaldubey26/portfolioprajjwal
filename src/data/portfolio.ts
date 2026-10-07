import type { Portfolio } from "@/types/portfolio";

/**
 * Single source of truth for the site.
 * Replace every [bracketed] value, siteUrl, and formEndpoint before sharing.
 * Do not add employers, user counts, or a live AWS deployment unless they are true.
 */
export const portfolio: Portfolio = {
  siteUrl: "https://example.com",
  person: {
    name: "Prajjwal Dubey",
    given: "PRAJJWAL",
    family: "DUBEY",
    email: "prajjwaldubey26.work@gmail.com",
    phone: "[Phone]",
    city: "Mumbai, India",
    github: "https://github.com/prajjwaldubey26",
    githubHandle: "prajjwaldubey26",
    linkedin: "https://www.linkedin.com/in/prajjwal-dubey-b50813412/",
    x: "https://x.com/prajjwal_d26",
    photo: "/images/prajjwal.jpg",
    resumeUrl: "/resume.pdf",
  },
  nav: [
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#project", label: "Project", id: "project" },
    { href: "#education", label: "Education", id: "education" },
    { href: "#contact", label: "Contact", id: "contact" },
  ],
  hero: {
    status: "Open to Cloud Internships",
    phrases: ["Cloud Computing Aspirant", "AWS • Docker • CI/CD", "Full-Stack Developer"],
    tagline: "I build containerized, secure apps and I'm ready to run them in the cloud.",
    terminal: [
      "$ aws s3 ls",
      "$ docker build -t wordwise .",
      "$ git push origin main",
      "✔ pipeline passed",
    ],
    badges: ["AWS", "Docker", "Linux", "Java", "React"],
    primaryCta: "View Project",
    secondaryCta: "Download Resume",
  },
  about: {
    lines: [
      "BE/IT undergraduate in Mumbai shipping containerized, secure full-stack apps.",
      "WordWise is Spring Boot and React with JWT, a 10MB PDF pipeline, and plagiarism checks.",
    ],
    stats: [
      { value: 6, suffix: "", label: "AWS services" },
      { value: 12, suffix: "", label: "REST endpoints" },
      { value: 10, suffix: "MB", label: "PDF pipeline" },
      { value: 1, suffix: "", label: "full-stack app shipped" },
    ],
    focusLabel: "Currently learning / focus",
    focus: ["AWS", "Docker", "CI/CD", "Linux"],
  },
  skillFilters: [
    { id: "all", label: "All" },
    { id: "cloud", label: "Cloud" },
    { id: "devops", label: "DevOps" },
    { id: "backend", label: "Backend" },
    { id: "frontend", label: "Frontend" },
  ],
  skillGroups: [
    {
      id: "cloud",
      label: "Cloud (AWS)",
      tone: "accent",
      skills: [
        { name: "EC2", icon: "aws-ec2", filters: ["cloud"] },
        { name: "S3", icon: "aws-s3", filters: ["cloud"] },
        { name: "DynamoDB", icon: "aws-ddb", filters: ["cloud"] },
        { name: "VPC", icon: "aws-vpc", filters: ["cloud"] },
        { name: "CloudFront", icon: "aws-cf", filters: ["cloud"] },
        { name: "IAM", icon: "aws-iam", filters: ["cloud"] },
      ],
    },
    {
      id: "devops",
      label: "DevOps & Systems",
      tone: "cyan",
      skills: [
        { name: "Docker", icon: "docker", filters: ["devops"] },
        { name: "CI/CD", icon: "cicd", filters: ["devops"] },
        { name: "Linux", icon: "linux", filters: ["devops"] },
        { name: "Git & GitHub", icon: "git", filters: ["devops"] },
        { name: "Shell Scripting", icon: "shell", filters: ["devops"] },
      ],
    },
    {
      id: "languages",
      label: "Languages",
      tone: "violet",
      skills: [
        { name: "Java", icon: "java", filters: ["backend"] },
        { name: "C++", icon: "cpp", filters: ["backend"] },
        { name: "JavaScript", icon: "javascript", filters: ["frontend"] },
        { name: "SQL", icon: "sql", filters: ["backend"] },
      ],
    },
    {
      id: "frameworks",
      label: "Frameworks & Tools",
      tone: "accent",
      skills: [
        { name: "Spring Boot", icon: "spring", filters: ["backend"] },
        { name: "Spring Security", icon: "spring-security", filters: ["backend"] },
        { name: "React.js", icon: "react", filters: ["frontend"] },
        { name: "REST APIs", icon: "rest", filters: ["backend"] },
        { name: "Maven", icon: "maven", filters: ["backend"] },
        { name: "JWT", icon: "jwt", filters: ["backend"] },
      ],
    },
    {
      id: "cs",
      label: "Core CS",
      tone: "violet",
      skills: [
        { name: "DSA", icon: "dsa", filters: ["backend"] },
        { name: "OOP", icon: "oop", filters: ["backend"] },
        { name: "Problem Solving (LeetCode)", icon: "leetcode", filters: ["backend"] },
      ],
    },
  ],
  project: {
    name: "AI Content Generator & Plagiarism Detector",
    summary:
      "Full-stack WordWise app: PDF summaries, quizzes, plagiarism checks, JWT auth, Docker, and Razorpay.",
    repoUrl: "https://github.com/prajjwaldubey26/wordwise.content",
    tags: ["Java 17", "Spring Boot 3.2", "React 18", "MySQL 8", "Docker"],
    architectureTitle: "Reference AWS Deployment Architecture",
    architectureNote:
      "A target layout for a future AWS deploy. This project is not claimed as live on AWS.",
    nodes: [
      {
        id: "user",
        title: "User",
        subtitle: "Browser",
        description: "Someone using WordWise from a browser.",
        lane: "main",
      },
      {
        id: "cloudfront",
        title: "CloudFront",
        subtitle: "CDN",
        description: "Reference CDN in front of the static frontend.",
        lane: "main",
      },
      {
        id: "react",
        title: "React 18",
        subtitle: "S3",
        description: "React UI. Reference host is an S3 bucket.",
        lane: "main",
      },
      {
        id: "api",
        title: "Spring Boot",
        subtitle: "Docker on EC2",
        description: "Java 17 API in Docker. Reference host is EC2.",
        lane: "main",
      },
      {
        id: "mysql",
        title: "MySQL 8",
        subtitle: "Database",
        description: "MySQL 8 database used by the API.",
        lane: "main",
      },
      {
        id: "pdf",
        title: "PDFBox",
        subtitle: "Pipeline",
        description: "PDFBox turns uploads up to 10MB into text.",
        lane: "side",
      },
      {
        id: "payments",
        title: "Razorpay",
        subtitle: "Payments",
        description: "Razorpay payments checked with server-side signatures.",
        lane: "side",
      },
      {
        id: "security",
        title: "JWT · IAM",
        subtitle: "Security layer",
        description: "JWT and BCrypt in the app. IAM is the reference AWS access layer.",
        lane: "side",
      },
    ],
    features: [
      {
        title: "PDF to Summary",
        text: "PDFBox pipeline up to 10MB, short to long",
        icon: "pdf",
      },
      {
        title: "Auto Quiz Generator",
        text: "Five-question quizzes generated from textbook PDFs",
        icon: "quiz",
      },
      {
        title: "Plagiarism Engine",
        text: "Shingling plus weighted Jaccard and cosine similarity",
        icon: "scan",
      },
      {
        title: "Secure by Design",
        text: "Stateless JWT, BCrypt, and role-based access",
        icon: "shield",
      },
      {
        title: "Dockerized",
        text: "Portable image with env-based CORS and database config",
        icon: "docker",
      },
      {
        title: "Payments",
        text: "Razorpay checkout with server-side signature verification",
        icon: "pay",
      },
    ],
    endpointNote: "Illustrative sample · 12 endpoints",
    endpoints: [
      { method: "POST", path: "/api/auth/login" },
      { method: "POST", path: "/api/pdf/summarize" },
      { method: "POST", path: "/api/plagiarism/check" },
    ],
    snippet: {
      filename: "similarity.java",
      note: "Simplified illustration — not the production source.",
      code: `// Simplified illustration — not the production source
double jaccard = (double) intersection / union;
double cosine = dot / (Math.sqrt(normA) * Math.sqrt(normB));
return (0.6 * jaccard) + (0.4 * cosine);`,
    },
    screenshots: [
      {
        src: "",
        alt: "Placeholder for a WordWise summary screen",
        label: "Summary",
      },
      {
        src: "",
        alt: "Placeholder for a WordWise quiz screen",
        label: "Quiz",
      },
      {
        src: "",
        alt: "Placeholder for a WordWise plagiarism screen",
        label: "Plagiarism",
      },
    ],
  },
  roadmap: [
    {
      id: "linux",
      title: "Linux",
      detail: "Command line, files, permissions, and processes.",
      status: "completed",
    },
    {
      id: "docker",
      title: "Docker",
      detail: "Packaged WordWise so it runs the same on any host.",
      status: "completed",
    },
    {
      id: "cicd",
      title: "CI/CD",
      detail: "Practicing build and delivery automation.",
      status: "completed",
    },
    {
      id: "aws",
      title: "AWS core",
      detail: "EC2, S3, DynamoDB, VPC, CloudFront, and IAM.",
      status: "completed",
    },
    {
      id: "ccp",
      title: "Cloud Practitioner",
      detail: "AWS Certified Cloud Practitioner. Planned, not earned.",
      status: "upcoming",
    },
    {
      id: "next",
      title: "Terraform / K8s",
      detail: "Next tools. Not a resume skill yet.",
      status: "upcoming",
    },
  ],
  education: {
    degree: "BE / Information Technology",
    college: "Theem College of Engineering",
    location: "Mumbai, India",
    graduation: "Expected 2029",
    coursework: ["Operating Systems", "Computer Networks", "DBMS", "DSA"],
  },
  certification: {
    name: "[AWS Certified Cloud Practitioner]",
    statusLabel: "In Progress / Planned",
    detail: "Not earned yet. Shown as a planned credential only.",
  },
  contact: {
    headline: "Let's build something in the",
    highlight: "cloud.",
    formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
    submitLabel: "Send message",
  },
  footer: {
    credit: "Designed & built by Prajjwal Dubey",
    hostBadge: "Hosted on AWS S3 + CloudFront",
  },
};
