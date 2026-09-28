export interface ContentLink {
  name: string;
  url: string;
}

export interface Education {
  schoolName: string;
  logo?: string;
  subHeader: string;
  duration?: string;
  desc: string;
  descBullets: string[];
}

export interface Experience {
  role: string;
  company: string;
  companylogo?: string;
  date?: string;
  desc: string;
  descBullets: string[];
}

export interface Project {
  caseStudy?: {
    category: string;
    problem: string;
    contribution: string;
    outcome: string;
    impactValue: string;
    impactContext: string;
  };
  projectName: string;
  projectDesc: string;
  image?: string;
  footerLink: ContentLink[];
}

export interface Achievement {
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  footerLink: ContentLink[];
}
