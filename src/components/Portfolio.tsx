// src/components/Portfolio.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mail, Github, Linkedin, Menu, X } from 'lucide-react';
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiPython,
  SiHtml5,
  SiCss3, 
  SiFastapi, 
  SiNumpy, 
  SiPandas, 
  SiScikitlearn, 
  SiVercel,
  SiSpring,
  SiPostgresql,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiRender,
  SiJsonwebtokens,
} from 'react-icons/si';
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

// Types
interface Experience {
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

interface Project {
  name: string;
  languages: string;
  github?: string;
  description: string;
  developing?: boolean;
}

interface Certification {
  company: string;
  name: string;
  logo: string;
  url: string;
  backgroundColor: string;
}

interface ProjectsData {
  software: Project[];
  cloud: Project[];
  security: Project[];
}

type ActiveTab = keyof ProjectsData;
type ExperienceTab = 'Work' | 'Leadership';
type SkillTab = 'Languages' | 'Frameworks & Libraries' | 'DevOps & Tools' | 'Cloud' | 'AI and ML' | 'Security';

const Portfolio: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentCertIndex, setCCurrentCertIndex] = useState<number>(0);
  const [activeExperienceTab, setActiveExperienceTab] = useState<ExperienceTab>('Work');
  const [activeSkillTab, setActiveSkillTab] = useState<SkillTab>('Languages');

  // Mouse tracking for certification cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Skills data organized by category
  const skillCategories = {
    "Languages": [
      { name: "JavaScript", icon: "/assets/icons/languages/javascript.svg" },
      { name: "TypeScript", icon: "/assets/icons/languages/typescript.svg" },
      { name: "Python", icon: "/assets/icons/languages/python.svg" },
      { name: "Java", icon: "/assets/icons/languages/java.svg" },
      { name: "HTML", icon: "/assets/icons/languages/html.svg" },
      { name: "CSS", icon: "/assets/icons/languages/css.svg" },
      { name: "Bash", icon: "/assets/icons/languages/bash.svg" },
      { name: "PowerShell", icon: "/assets/icons/languages/powershell.svg" },
      { name: "PostgreSQL", icon: "/assets/icons/languages/postgresql.svg" }
    ],
    "Frameworks & Libraries": [
      { name: "React", icon: "/assets/icons/frameworkLibraries/react.svg" },
      { name: "Next.js", icon: "/assets/icons/frameworkLibraries/nextdotjs.svg" },
      { name: "Express.js", icon: "/assets/icons/frameworkLibraries/express.svg" },
      { name: "FastAPI", icon: "/assets/icons/frameworkLibraries/fastapi.svg" },
      { name: "Spring Boot", icon: "/assets/icons/frameworkLibraries/springboot.svg" },
      { name: "Tailwind CSS", icon: "/assets/icons/frameworkLibraries/tailwindcss.svg" },
      { name: "Node.js", icon: "/assets/icons/frameworkLibraries/nodejs.svg" },
      { name: "Jest", icon: "/assets/icons/frameworkLibraries/jest.svg" },
      { name: "JUnit5", icon: "/assets/icons/frameworkLibraries/junit5.svg" },
      { name: "Socket.io", icon: "/assets/icons/frameworkLibraries/socket-io.svg" },
      { name: "Mocha", icon: "/assets/icons/frameworkLibraries/mocha.svg" }
    ],
    "DevOps & Tools": [
      { name: "Docker", icon: "/assets/icons/devOps/docker.svg" },
      { name: "Kubernetes", icon: "/assets/icons/devOps/kubernetes.svg" },
      { name: "Git", icon: "/assets/icons/devOps/git.svg" },
      { name: "Jira", icon: "/assets/icons/devOps/jira.svg" },
      { name: "Postman", icon: "/assets/icons/devOps/postman.svg" },
      { name: "Figma", icon: "/assets/icons/devOps/figma.svg" },
      { name: "JWT", icon: "/assets/icons/devOps/jwt.svg" },
      { name: "CI/CD", icon: "/assets/icons/devOps/cicd.svg" },
      { name: "Confluence", icon: "/assets/icons/devOps/confluence.svg" },
      { name: "Nginx", icon: "/assets/icons/devOps/nginx.svg" }
    ],
    "Cloud": [
      { name: "Azure", icon: "/assets/icons/cloud/azure.svg" },
      { name: "Vercel", icon: "/assets/icons/cloud/vercel.svg" },
      { name: "MongoDB Atlas", icon: "/assets/icons/cloud/mongodb.svg" },
      { name: "Render", icon: "/assets/icons/cloud/render.svg" },
      { name: "Supabase", icon: "/assets/icons/cloud/Supabase.svg" }
    ],
    "AI and ML": [
      { name: "Hugging Face", icon: "/assets/icons/aiMl/huggingFace.svg" },
      { name: "LangChain", icon: "/assets/icons/aiMl/langchain.svg" },
      { name: "NumPy", icon: "/assets/icons/aiMl/numpy.svg" },
      { name: "Pandas", icon: "/assets/icons/aiMl/pandas.svg" },
      { name: "Scikit-learn", icon: "/assets/icons/aiMl/scikitlearn.svg" },
      { name: "NVIDIA NGC", icon: "/assets/icons/aiMl/nvidia.svg" }
    ],
    "Security": [
      { name: "Burp Suite", icon: "/assets/icons/security/burpsuite.svg" },
      { name: "Kali Linux", icon: "/assets/icons/security/kalilinux.svg" },
      { name: "Metasploit", icon: "/assets/icons/security/metasploit.svg" },
      { name: "Splunk", icon: "/assets/icons/security/splunk.svg" },
      { name: "VMware", icon: "/assets/icons/security/vmware.svg" },
      { name: "Wireshark", icon: "/assets/icons/security/wireshark.svg" },
      { name: "Cloudflare", icon: "/assets/icons/security/cloudflare.svg" }
    ]
  };

  // Work Experience data
  const workExperiences: Experience[] = [
    {
      company: 'Accion Labs',
      role: 'Full Stack Developer Intern',
      period: 'Summer 2025',
      logo: '/assets/logos/accion-labs.png',
      colors: { border: '#ff4d4d', shadow: 'rgba(255, 77, 77, 0.4)', text: 'linear-gradient(to right, #ff4d4d, #888888)' }
    },
    {
      company: 'DataVerify Floods',
      role: 'Software Engineering Intern',
      period: 'Fall 2024',
      logo: '/assets/logos/dataverify-floods.png',
      colors: { border: 'red', shadow: 'rgba(255, 0, 0, 0.4)', text: 'linear-gradient(to right, #cc0000, #003366)' }
    },
    {
      company: 'Factual Data',
      role: 'Software Engineering Intern',
      period: 'Summer 2024',
      logo: '/assets/logos/factual-data.png',
      colors: { border: '#00c8ff', shadow: 'rgba(0, 200, 255, 0.4)', text: 'linear-gradient(to right, #00bfff, #007acc)' }
    }
  ];

  // Leadership Experience data
  const leadershipExperiences: Experience[] = [
    {
      company: 'KeyBank',
      role: 'KeyBank Leader Development Student Summit',
      period: 'September 2025',
      logo: '/assets/logos/keybank-logo.png',
      colors: { border: '#d50000', shadow: 'rgba(213, 0, 0, 0.4)', text: 'linear-gradient(to right, #000000, #d50000)' }
    },
    {
      company: 'Cognizant',
      role: 'Cognizant Leadership Summit Program',
      period: 'August 2025',
      logo: '/assets/logos/cognizant-logo.png',
      colors: { border: '#0073e6', shadow: 'rgba(0, 115, 230, 0.4)', text: 'linear-gradient(to right, #0073e6, #004d99)' }
    },
    {
      company: 'Cardinal Health',
      role: 'Backstage Pass',
      period: 'March 2025',
      logo: '/assets/logos/cardinal-health.png',
      colors: { border: '#d50000', shadow: 'rgba(213, 0, 0, 0.4)', text: 'linear-gradient(to right, #d50000, #000000)' }
    }
  ];

  // Certifications data
  const certifications: Certification[] = [
    {
      company: 'Microsoft: Azure',
      name: 'Azure Fundamentals (AZ-900)',
      logo: '/assets/certifications/Microsoft_Azure.png',
      url: 'https://learn.microsoft.com/en-us/users/anishkajan-8444/credentials/c7abd94bf8d15526?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      backgroundColor: '#007FFF'
    },
    {
      company: 'NVIDIA',
      name: 'Building RAG Agents with LLM',
      logo: '/assets/certifications/nvidia.png',
      url: 'https://learn.nvidia.com/certificates?id=FArWziRJSsWEcFG5KLeTRw#',
      backgroundColor: '#76B900'
    },
    {
      company: 'IBM',
      name: 'Getting Started with Threat Intelligence and Hunting',
      logo: '/assets/certifications/IBM_logo.png',
      url: 'https://www.credly.com/badges/d1bbbd9b-4639-474e-8b00-5aacbb89e53d/linked_in_profile',
      backgroundColor: '#1F70C1'
    },
    {
      company: 'Splunk',
      name: 'Intro to Splunk',
      logo: '/assets/certifications/splink_logo.png',
      url: 'https://www.linkedin.com/in/anish-kajan/details/certifications/1750103938118/single-media-viewer/?profileId=ACoAAFeivHUBxd5jtEHZck8rX3PmUqUfWhM1tqM',
      backgroundColor: 'linear-gradient(135deg, #ff6600 0%, #ff4d6d 100%)'
    }
  ];

  // Scroll behavior and highlight menu
  useEffect(() => {
    const handleScroll = (): void => {
      const sections: string[] = ['home', 'about', 'projects', 'certifications', 'contact'];
      const scrollPos: number = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        const navLink = document.getElementById(`${section}-page`);
        
        if (element && navLink) {
          const offsetTop: number = element.offsetTop;
          const offsetBottom: number = offsetTop + element.offsetHeight;
          
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            document.querySelectorAll('.navbar__links').forEach(link => 
              link.classList.remove('highlight')
            );
            navLink.classList.add('highlight');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollCerts = (direction: number): void => {
    const newIndex = currentCertIndex + direction;
    if (newIndex >= 0 && newIndex < certifications.length) {
      setCCurrentCertIndex(newIndex);
    }
  };

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          .cert-card {
            position: relative;
            overflow: hidden;
          }
          .cert-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1), transparent 40%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 1;
          }
          .cert-card:hover::before {
            opacity: 1;
          }
          .cert-card > * {
            position: relative;
            z-index: 2;
          }
          
          /* Profile picture hover effect */
          .profile-picture-container {
            position: relative;
            width: 256px;
            height: auto;
            transition: all 0.3s ease;
          }
          
          .profile-picture-container .profile-image {
            transition: opacity 0.3s ease;
          }
          
          .profile-picture-container .osu-logo {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            opacity: 0;
            transition: opacity 0.3s ease;
            background: white;
            border-radius: 0.75rem;
            padding: 20px;
          }
          
          .profile-picture-container:hover .profile-image {
            opacity: 0;
          }
          
          .profile-picture-container:hover .osu-logo {
            opacity: 1;
          }
          
          .profile-picture-container:hover {
            border-color: #dc2626 !important;
            box-shadow: 0 20px 25px -5px rgba(220, 38, 38, 0.4), 0 10px 10px -5px rgba(220, 38, 38, 0.3) !important;
          }

          /* OSU text color change on hover */
          .osu-text {
            transition: color 0.3s ease;
          }
          
          .profile-picture-container:hover ~ .home-content .osu-text {
            color: #dc2626 !important;
          }
        `
      }} />
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-gray-900 h-20 flex items-center justify-center z-50">
        <div className="flex justify-between items-center w-full max-w-6xl px-12">
          <a href="#home" className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Anish Kajan
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#home" id="home-page" className="navbar__links px-6 py-2 hover:text-cyan-400 hover:border-b-2 hover:border-cyan-400 transition-all">Home</a>
            <a href="#about" id="about-page" className="navbar__links px-6 py-2 hover:text-cyan-400 hover:border-b-2 hover:border-cyan-400 transition-all">Experience</a>
            <a href="#projects" id="projects-page" className="navbar__links px-6 py-2 hover:text-cyan-400 hover:border-b-2 hover:border-cyan-400 transition-all">Projects</a>
            <a href="#certifications" id="certifications-page" className="navbar__links px-6 py-2 hover:text-cyan-400 hover:border-b-2 hover:border-cyan-400 transition-all">Certification</a>
            <a href="#contact" id="contact-link" className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded text-white hover:opacity-80 transition-opacity">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-gray-900 py-4">
            <div className="flex flex-col items-center gap-4">
              <a href="#home" className="py-2" onClick={closeMobileMenu}>Home</a>
              <a href="#about" className="py-2" onClick={closeMobileMenu}>Experience</a>
              <a href="#projects" className="py-2" onClick={closeMobileMenu}>Projects</a>
              <a href="#certifications" className="py-2" onClick={closeMobileMenu}>Certification</a>
              <a href="#contact" className="py-2" onClick={closeMobileMenu}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section id="home" className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            <div className="flex-shrink-0">
              <div className="profile-picture-container w-64 h-auto rounded-xl border-2 border-cyan-400 shadow-lg shadow-cyan-400/30">
                <img 
                  src="/assets/63184.jpg" 
                  alt="Anish Kajan" 
                  className="profile-image w-full h-auto rounded-xl"
                />
                <img 
                  src="/assets/OSU-logo.png" 
                  alt="OSU Logo" 
                  className="osu-logo"
                />
              </div>
            </div>
            <div className="flex-1 home-content">
              <div className="bg-black/50 border-2 border-cyan-400 rounded-xl p-8 shadow-lg shadow-cyan-400/30 h-full flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
                  B.S. in Computer Engineering + Minor in Information Security
                </h1>
                <p className="text-lg leading-relaxed">
                  I'm a Computer Engineering student at <span className="osu-text font-semibold">The Ohio State University</span>, passionate about building impactful and scalable solutions by combining my skills in software development, cloud platforms, and embedded systems. My interests span cybersecurity, AI, and full-stack development, where I strive to design and implement secure, intelligent systems that address real-world challenges.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Categories with Tab Navigation */}
          <div className="border-2 border-cyan-400 rounded-xl p-6 bg-black/50 shadow-lg shadow-cyan-400/30">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-800 rounded-lg p-1 flex-wrap gap-1">
                {Object.keys(skillCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveSkillTab(category as SkillTab)}
                    className={`px-4 py-2 rounded-md font-semibold transition-all text-sm ${
                      activeSkillTab === category
                        ? 'bg-cyan-400 text-black'
                        : 'text-cyan-400 hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Category Skills */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll gap-8 whitespace-nowrap">
                {skillCategories[activeSkillTab].map((skill, index) => (
                  <div key={`first-${index}`} className="flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-lg flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-60"></div>
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="relative w-6 h-6 object-contain z-10"
                      />
                    </div>
                    <span className="text-white text-lg">{skill.name}</span>
                  </div>
                ))}
                {/* Large gap/pause section */}
                <div className="w-96 flex-shrink-0"></div>
                {skillCategories[activeSkillTab].map((skill, index) => (
                  <div key={`second-${index}`} className="flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-lg flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-60"></div>
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="relative w-6 h-6 object-contain z-10"
                      />
                    </div>
                    <span className="text-white text-lg">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="about" className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-cyan-400 text-center mb-16 drop-shadow-lg">
            Experience
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveExperienceTab('Work')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeExperienceTab === 'Work'
                    ? 'bg-cyan-400 text-black'
                    : 'text-cyan-400 hover:bg-gray-700'
                }`}
              >
                Work
              </button>
              <button
                onClick={() => setActiveExperienceTab('Leadership')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeExperienceTab === 'Leadership'
                    ? 'bg-cyan-400 text-black'
                    : 'text-cyan-400 hover:bg-gray-700'
                }`}
              >
                Leadership
              </button>
            </div>
          </div>

          {/* Experience Content */}
          <div className="space-y-6">
            {(activeExperienceTab === 'Work' ? workExperiences : leadershipExperiences).map((exp, index) => (
              <div 
                key={index}
                className="flex justify-between items-center bg-white rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-400/40"
                style={{ borderColor: exp.colors.border, borderWidth: '2px' }}
              >
                <div className="flex-1">
                  <p 
                    className="text-xl font-bold bg-clip-text text-transparent"
                    style={{ 
                      backgroundImage: exp.colors.text
                    }}
                  >
                    {exp.role} – {exp.company} – {exp.period}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-6">
                  <img 
                    src={exp.logo} 
                    alt={`${exp.company} Logo`} 
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-cyan-400 text-center mb-16">Projects</h2>
          
          {/* Projects Grid - Horizontal on Desktop, Vertical on Mobile */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
            
            {/* Formula 1 Predictor App */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-400 rounded-2xl p-8 flex-1 max-w-lg hover:transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-400/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Formula 1 Predictor App</h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Modern Formula 1 race outcome prediction using machine learning with a React TypeScript frontend and intelligent prediction system. Features advanced ML training with Python, FastAPI backend, and serverless deployment for instant predictions.
              </p>
              
              <div className="mb-6">
                <h4 className="text-cyan-400 font-semibold mb-3">Tech Stack:</h4>
                <div className="flex flex-wrap gap-4">
                  <SiJavascript className="w-8 h-8 text-yellow-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiTypescript className="w-8 h-8 text-blue-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiReact className="w-8 h-8 text-blue-300 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiTailwindcss className="w-8 h-8 text-cyan-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiPython className="w-8 h-8 text-yellow-500 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiFastapi className="w-8 h-8 text-green-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiNumpy className="w-8 h-8 text-blue-600 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiPandas className="w-8 h-8 text-purple-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiScikitlearn className="w-8 h-8 text-orange-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiVercel className="w-8 h-8 text-white opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="https://github.com/AnishKajan/Formula1-Predictor-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a 
                  href="https://formula1-predictor-app.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Live Site ↗
                </a>
              </div>
            </div>

            {/* VaultGuardian AI */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-400 rounded-2xl p-8 flex-1 max-w-lg hover:transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-400/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">VaultGuardian AI</h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Intelligent secure document management system combining traditional security with AI-powered content analysis. Automatically scans, analyzes, and monitors documents for security risks, policy violations, and sensitive content using cloud-based AI services.
              </p>
              
              <div className="mb-6">
                <h4 className="text-cyan-400 font-semibold mb-3">Tech Stack:</h4>
                <div className="flex flex-wrap gap-4">
                  <SiJavascript className="w-8 h-8 text-yellow-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiReact className="w-8 h-8 text-blue-300 opacity-80 hover:opacity-100 transition-opacity" />
                  <FaJava className="w-8 h-8 text-red-500 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiSpring className="w-8 h-8 text-green-500 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiPostgresql className="w-8 h-8 text-blue-500 opacity-80 hover:opacity-100 transition-opacity" />
                  <img src="/assets/icons/aiMl/huggingFacejsx.svg" alt="Hugging Face" className="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity" />                 
                  <img src="/assets/icons/aiMl/mixtralJSXfix.svg" alt="Mixtral" className="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiRender className="w-6 h-6 text-black-600 opacity-80 hover:opacity-100 transition-opacity" />
                  <VscAzure className="w-8 h-8 text-blue-600 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiVercel className="w-8 h-8 text-white opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="https://github.com/AnishKajan/VaultGuardian-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a 
                  href="https://vault-guardian-ai.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Live Site ↗
                </a>
              </div>
            </div>

            {/* Red Recon */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-400 rounded-2xl p-8 flex-1 max-w-lg hover:transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-400/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Red Recon</h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Comprehensive penetration testing and security assessment platform providing a secure environment for practicing ethical hacking techniques and red team exercises. Features network scanning, payload testing, and comprehensive security analysis tools.
              </p>
              
              <div className="mb-6">
                <h4 className="text-cyan-400 font-semibold mb-3">Tech Stack:</h4>
                <div className="flex flex-wrap gap-4">
                  <SiJavascript className="w-8 h-8 text-yellow-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiNextdotjs className="w-8 h-8 text-white opacity-80 hover:opacity-100 transition-opacity" />
                  <SiTypescript className="w-8 h-8 text-blue-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiTailwindcss className="w-8 h-8 text-cyan-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiPython className="w-8 h-8 text-yellow-500 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiFastapi className="w-8 h-8 text-green-400 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiJsonwebtokens className="w-8 h-8 text-purple-500 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiVercel className="w-8 h-8 text-white opacity-80 hover:opacity-100 transition-opacity" />
                  <VscAzure className="w-8 h-8 text-blue-600 opacity-80 hover:opacity-100 transition-opacity" />
                  <SiMongodb className="w-8 h-8 text-green-600 opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="https://github.com/AnishKajan/Red-Recon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a 
                  href="https://red-recon.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Live Site ↗
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-cyan-400 text-center mb-16 drop-shadow-lg">
            Certifications
          </h2>
          
          {/* Mobile View - Single card with navigation */}
          <div className="md:hidden relative">
            <button 
              onClick={() => scrollCerts(-1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-cyan-400 transition-colors disabled:opacity-50"
              disabled={currentCertIndex === 0}
              aria-label="Previous certification"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={() => scrollCerts(1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-cyan-400 transition-colors disabled:opacity-50"
              disabled={currentCertIndex >= certifications.length - 1}
              aria-label="Next certification"
            >
              <ChevronRight />
            </button>

            <div className="flex justify-center">
              <div 
                className="cert-card w-80 h-96 rounded-2xl p-6 text-center text-white shadow-lg shadow-cyan-400/30 transition-transform hover:scale-105"
                style={{ background: certifications[currentCertIndex].backgroundColor }}
                onMouseMove={handleMouseMove}
              >
                <h3 className="text-xl font-bold mb-6">{certifications[currentCertIndex].company}</h3>
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                  <img 
                    src={certifications[currentCertIndex].logo}
                    alt={certifications[currentCertIndex].company}
                    className="w-16 h-auto"
                  />
                </div>
                <h4 className="text-lg font-bold mb-8">{certifications[currentCertIndex].name}</h4>
                <a 
                  href={certifications[currentCertIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors shadow-lg"
                >
                  View Certificate ↗
                </a>
              </div>
            </div>
          </div>

          {/* Desktop View - Multiple cards with gaps and arrows */}
          <div className="hidden md:block relative">
            <button 
              onClick={() => scrollCerts(-1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-cyan-400 transition-colors disabled:opacity-50"
              disabled={currentCertIndex === 0}
              aria-label="Previous certification"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={() => scrollCerts(1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-cyan-400 transition-colors disabled:opacity-50"
              disabled={currentCertIndex >= certifications.length - 1}
              aria-label="Next certification"
            >
              <ChevronRight />
            </button>

            <div className="mx-16 overflow-hidden">
              <div 
                className="flex gap-8 transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentCertIndex * (320 + 32)}px)` // 320px card width + 32px gap
                }}
              >
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="cert-card flex-shrink-0 w-80 h-96 rounded-2xl p-6 text-center text-white shadow-lg shadow-cyan-400/30 transition-transform hover:scale-105"
                    style={{ background: cert.backgroundColor }}
                    onMouseMove={handleMouseMove}
                  >
                    <h3 className="text-xl font-bold mb-6">{cert.company}</h3>
                    <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src={cert.logo}
                        alt={cert.company}
                        className="w-16 h-auto"
                      />
                    </div>
                    <h4 className="text-lg font-bold mb-8">{cert.name}</h4>
                    <a 
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors shadow-lg"
                    >
                      View Certificate ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-cyan-400 mb-12 drop-shadow-lg">
            CONTACT ME
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a 
              href="mailto:anishkajan2005@gmail.com"
              className="w-64 h-64 bg-red-600 rounded-2xl flex items-center justify-center text-6xl hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/40 transition-all"
              aria-label="Send email"
            >
              <Mail />
            </a>
            <a 
              href="https://www.linkedin.com/in/anish-kajan-18548a350/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-64 h-64 bg-blue-600 rounded-2xl flex items-center justify-center text-6xl hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/40 transition-all"
              aria-label="LinkedIn profile"
            >
              <Linkedin />
            </a>
            <a 
              href="https://github.com/AnishKajan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-64 h-64 bg-gray-800 rounded-2xl flex items-center justify-center text-6xl hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/40 transition-all"
              aria-label="GitHub profile"
            >
              <Github />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-semibold">Anish Kajan</div>
          <div className="text-center">
            <p>© Anish Kajan 2025. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;