// src/types/portfolio.types.ts

export interface Experience {
  company: string;
  role: string;
  period: string;
  logo: string;
  colors: {
    border: string;
    shadow: string;
    text: string;
  };
}

export interface Project {
  name: string;
  languages: string;
  github?: string;
  description: string;
  developing?: boolean;
}

export interface Certification {
  company: string;
  name: string;
  logo: string;
  url: string;
  backgroundColor: string;
}

export interface ProjectsData {
  software: Project[];
  cloud: Project[];
  security: Project[];
}

export type ActiveTab = keyof ProjectsData;

export interface ContactLink {
  href: string;
  icon: React.ComponentType;
  label: string;
  bgColor: string;
  target?: string;
}