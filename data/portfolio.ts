import {
  BrainCircuit,
  BriefcaseBusiness,
  BellRing,
  Database,
  Figma,
  GitBranch,
  Globe2,
  Layers3,
  Palette,
  ServerCog,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const emailHref =
  "mailto:rachel.bferns@gmail.com?subject=Let%27s%20build%20something%20cool&body=Hi%20Rachel%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out.%0A%0A";

export const projects = [
  {
    title: "Prompt Engine Clone",
    tagline: "Optimizing prompts like a pro.",
    description:
      "A modular prompt-engineering system inspired by multi-LLM architectures that structures and refines queries for better AI outputs.",
    tags: ["LLM", "Prompt Engineering", "Node.js", "TypeScript"],
    href: "https://github.com/Rachelferns/Prompt-Engine-Clone",
    accent: "from-violet-400/30 via-fuchsia-300/20 to-transparent",
    icon: BrainCircuit,
  },
  {
    title: "AI Tourist App",
    tagline: "Plans your trip better than your friends.",
    description:
      "A recommendation-driven travel experience that adapts itineraries, suggests places intelligently, and makes planning feel less like admin.",
    tags: ["Recommendations", "UX", "Maps", "AI"],
    href: "https://github.com/Xx-D3V-xX/Mini_Proj",
    accent: "from-pink-300/30 via-purple-300/20 to-transparent",
    icon: Globe2,
  },
  {
    title: "Secure RAG Chatbot",
    tagline: "Answers questions safely, accurately, and without hallucinating.",
    description:
      "A retrieval-augmented chatbot built with guardrails, reliable source grounding, and a focus on safe, explainable responses.",
    tags: ["RAG", "Security", "Search", "Guardrails"],
    href: "https://github.com/Rachelferns/SecureRAG",
    accent: "from-indigo-300/30 via-violet-300/20 to-transparent",
    icon: ShieldCheck,
  },
  {
    title: "Notify - Student Notice Dashboard",
    tagline: "Never miss an important update again.",
    description:
      "A fully deployed DevOps-based student notice dashboard with CI/CD pipelines, designed to streamline communication and ensure reliable updates.",
    tags: ["DevOps", "CI/CD", "Dashboard", "Full Stack"],
    href: "https://github.com/Rachelferns/Notify",
    accent: "from-purple-300/30 via-indigo-300/20 to-transparent",
    icon: BellRing,
  },
];

export const skillGroups = [
  {
    title: "AI + ML",
    icon: Sparkles,
    items: ["LLMs", "Prompt Engineering", "RAG", "Recommendation Systems", "Model Evaluation"],
  },
  {
    title: "Frontend",
    icon: Palette,
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Figma"],
  },
  {
    title: "Backend",
    icon: ServerCog,
    items: ["Python", "APIs", "FastAPI", "Node.js", "Authentication"],
  },
  {
    title: "Data + Infra",
    icon: Database,
    items: ["SQL", "Vector Stores", "Git", "Deployment", "System Design"],
  },
];

export const quickFacts = [
  { icon: BriefcaseBusiness, label: "Backend systems with a strong UX instinct" },
  { icon: Layers3, label: "Comfortable across architecture and interface details" },
  { icon: Figma, label: "Cares about polish, not just shipping features" },
  { icon: GitBranch, label: "Learns fastest by building, breaking, and refining" },
];

export const contactLinks = [
  {
    label: "Email",
    value: "rachel.bferns@gmail.com",
    href: emailHref,
  },
  {
    label: "GitHub",
    value: "github.com/Rachelferns",
    href: "https://github.com/Rachelferns",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rachelfernandes18",
    href: "https://www.linkedin.com/in/rachelfernandes18/",
  },
  {
    label: "LeetCode",
    value: "leetcode.com/u/rachferns",
    href: "https://leetcode.com/u/rachferns/",
  },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Rachelferns",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rachelfernandes18/",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/rachferns/",
  },
];
