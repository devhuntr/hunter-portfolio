import type {Education, Experience, Project, Achievement} from "./types";
// Portfolio content stays centralized while the app is modernized in stages.
import splashAnimation from "../assets/lottie/splashAnimation.json";

const splashScreen = {
  enabled: false,
  animation: splashAnimation,
  duration: 2000
};
const illustration = {animated: true};

const greeting = {
  username: "Hunter Anderson",
  title: "Hi, I'm Hunter",
  subTitle:
    "I build software that solves real operational problems. Software engineering, AI implementation, and product thinking — from understanding the problem to putting a solution in people's hands.",
  resumeLink: "", // Add your resume URL to show the hero and navigation links.
  displayGreeting: true
};

const socialMediaLinks = {
  github: "https://github.com/devhuntr",
  linkedin: "https://www.linkedin.com/in/hunteranderson19/",
  gmail: "and25027@byui.edu",
  display: true
};

const skillsSection = {
  title: "What I do",
  subTitle:
    "I'm a Software Engineering student at BYU-Idaho with a minor in Cloud Technologies. I enjoy working where engineering, AI, business, and product intersect.",
  skills: [
    "Software development: Python, JavaScript, C#, SQL, HTML/CSS, React, .NET, REST APIs, and Git.",
    "AI & automation: OpenAI, Claude, Claude Code, Codex, LLM workflows, n8n, and Zapier.",
    "Cloud: AWS and cloud technologies.",
    "Product & engineering: stakeholder collaboration, requirements gathering, user testing, and implementing solutions to real business problems."
  ],
  softwareSkills: [
    {skillName: "Python", fontAwesomeClassname: "fab fa-python"},
    {skillName: "JavaScript", fontAwesomeClassname: "fab fa-js"},
    {skillName: "React", fontAwesomeClassname: "fab fa-react"},
    {skillName: "C# / .NET", fontAwesomeClassname: "fas fa-code"},
    {skillName: "SQL", fontAwesomeClassname: "fas fa-database"},
    {skillName: "AWS", fontAwesomeClassname: "fab fa-aws"},
    {skillName: "Git", fontAwesomeClassname: "fab fa-git-alt"}
  ],
  display: true
};

const educationInfo: {display: boolean; schools: Education[]} = {
  display: true,
  schools: [
    {
      schoolName: "BYU-Idaho",
      subHeader: "Software Engineering",
      duration: "Expected graduation: December 2027",
      desc: "Minor in Cloud Technologies · 4.0 GPA",
      descBullets: []
    }
  ]
};

const workExperiences: {display: boolean; experience: Experience[]} = {
  display: true,
  experience: [
    {
      role: "AI Implementation Specialist",
      company: "DR Heating & Plumbing",
      desc: "Build internal software and automation tools around the operational needs of a heating and plumbing business.",
      descBullets: [
        "Work directly with stakeholders to understand problems, gather requirements, and design practical solutions.",
        "Develop and test tools with users, then help implement them in day-to-day workflows.",
        "Build workflows that have saved the company 10+ hours per week."
      ]
    },
    {
      role: "Contract Developer & Project Lead",
      company: "Self-Employed",
      desc: "Develop software for business needs and lead and maintain existing software projects.",
      descBullets: [
        "Translate stakeholder needs into software requirements and implementation decisions.",
        "Build web applications and AI-enabled tools, with attention to testing and practical use."
      ]
    }
  ]
};

// Enable pinned repositories once a GitHub data refresh is configured.
// Contact links work independently of this optional integration.
const openSource = {display: false};

const bigProjects: {
  title: string;
  subtitle: string;
  projects: Project[];
  display: boolean;
} = {
  title: "Featured Work",
  subtitle: "Software built around real business problems.",
  projects: [
    {
      projectName: "Internal Operations Platform",
      projectDesc:
        "Turning day-to-day operational needs into a system for tracking projects from contract award through completion.",
      caseStudy: {
        category: "Business software · DR Heating & Plumbing",
        problem:
          "Project information, responsibilities, deadlines, and equipment needs were difficult to track.",
        contribution:
          "I interviewed employees, gathered requirements, mapped workflows, and prioritized features. I then developed the system and tested it with users.",
        outcome:
          "The platform helps assign responsibilities and prevent missed tasks throughout a project. It is part of the broader software and automation effort at DR Heating & Plumbing.",
        impactValue: "10+ hours / week",
        impactContext: "Saved across the broader company automation effort."
      },
      footerLink: []
    }
  ],
  display: true
};

// Keep the component available for verified certifications added later.
const achievementSection: {
  title: string;
  subtitle: string;
  achievementsCards: Achievement[];
  display: boolean;
} = {
  title: "Achievements & Certifications",
  subtitle: "",
  achievementsCards: [],
  display: false
};

const contactInfo = {
  title: "Let's connect",
  subtitle:
    "Interested in software engineering, AI implementation, or building a practical solution? I'd be glad to connect.",
  number: "",
  email_address: socialMediaLinks.gmail
};

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  contactInfo
};
