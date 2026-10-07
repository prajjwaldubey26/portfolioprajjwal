import type { ComponentType, SVGProps } from "react";
import {
  Braces,
  Database,
  Puzzle,
  Shield,
  Terminal,
  Waypoints,
  Workflow,
} from "lucide-react";
import {
  SiApachemaven,
  SiCplusplus,
  SiDocker,
  SiGit,
  SiJavascript,
  SiJsonwebtokens,
  SiLeetcode,
  SiLinux,
  SiOpenjdk,
  SiReact,
  SiSpringboot,
} from "react-icons/si";
import type { IconName } from "@/types/portfolio";

type Glyph = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<Exclude<IconName, `aws-${string}`>, Glyph> = {
  docker: SiDocker,
  cicd: Workflow,
  linux: SiLinux,
  git: SiGit,
  shell: Terminal,
  java: SiOpenjdk,
  cpp: SiCplusplus,
  javascript: SiJavascript,
  sql: Database,
  spring: SiSpringboot,
  "spring-security": Shield,
  react: SiReact,
  rest: Braces,
  maven: SiApachemaven,
  jwt: SiJsonwebtokens,
  dsa: Waypoints,
  oop: Puzzle,
  leetcode: SiLeetcode,
};

const AWS_LABEL: Record<string, string> = {
  "aws-ec2": "EC2",
  "aws-s3": "S3",
  "aws-ddb": "DDB",
  "aws-vpc": "VPC",
  "aws-cf": "CF",
  "aws-iam": "IAM",
};

const BRAND: Partial<Record<IconName, string>> = {
  docker: "#2496ED",
  git: "#F05032",
  java: "#EA2D2E",
  cpp: "#00599C",
  javascript: "#EAB308",
  spring: "#6DB33F",
  react: "#61DAFB",
  maven: "#C71A36",
  jwt: "#FB015B",
  leetcode: "#FFA116",
};

export function TechIcon({ name }: { name: IconName }) {
  if (name.startsWith("aws-")) {
    return (
      <span
        aria-hidden
        className="grid h-10 w-10 place-items-center rounded-lg bg-[#FF9900] font-mono text-[10px] font-bold leading-none text-ink"
      >
        {AWS_LABEL[name]}
      </span>
    );
  }

  const Icon = ICONS[name as Exclude<IconName, `aws-${string}`>];
  return <Icon aria-hidden className="h-6 w-6" color={BRAND[name] ?? "currentColor"} />;
}
