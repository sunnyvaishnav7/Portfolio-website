import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink, User, Code, Briefcase, Award, Send, Menu, X, Sun, Moon
} from 'lucide-react';
import { Download } from 'lucide-react'; // ✅ CORRECT

import "./Homepage.css";

// Memoized components for better performance
const SkillBar = memo(({ skill }) => (
  <div className="skill-item">
    <div className="skill-header">
      <span className="skill-name">{skill.name}</span>
      <span className="skill-percentage">{skill.level}%</span>
    </div>
    <div className="skill-bar-bg">
      <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
    </div>
  </div>
));

const ProjectCard = memo(({ project }) => (
  <div className="project-card">
    <div className="project-img-container">
      <img src={project.image} alt={project.title} className="project-img" loading="lazy" />
      <div className="project-overlay" />
    </div>
    <div className="project-content">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>
      <div className="project-tech">
        {project.tech.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}
      </div>
      <div className="project-links">
        <a href={project.liveUrl} className="project-link">
          <ExternalLink size={16} />Live Demo
        </a>
        <a href={project.githubUrl} className="project-link">
          <Github size={16} />GitHub
        </a>
      </div>
    </div>
  </div>
));

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Consolidated data
  const data = {
    personal: {
      name: "Shani Vaishnav",
      title: "Full Stack Developer",
      tagline: "Building digital experiences that matter",
      email: "shanivaishnav7@gmail.com",
      phone: "+91 8949640984",
      location: "Udaipur ,Rajasthan(India)",
      bio: "Passionate Java Full Stack Developer with 1+ year of experience building secure, high-performance web applications using modern Java frameworks and frontend technologies. Skilled at integrating cybersecurity best practices and leveraging AI-driven tools to enhance user experience, automate tasks, and safeguard digital assets. I enjoy transforming complex challenges into scalable, intelligent, and secure solutions.",
      mission: "My mission is to bridge the gap between functionality and security by building full-stack applications that are not only robust and scalable, but also intuitive and user-friendly. I strive to deliver solutions that blend performance, modern design, and secure coding practices for a seamless digital experience."
    },
    skills: {
      OS: [
        { name: "Linux Basic", level: 85 },
        { name: "Windows", level: 90 },
        { name: "Linux CLI", level: 80 },
        { name: "Bash Scripting", level: 75 },
        { name: "Shell Script", level: 70 }
      ],
      Backend: [
        { name: "Java (Core + OOP)", level: 90 },
        { name: "Spring Boot", level: 85 },
        { name: "Hibernate / JPA", level: 80 },
        { name: "RESTful APIs", level: 88 },
        { name: "Microservices", level: 75 }
      ],
      Frontend: [
        { name: "HTML/CSS", level: 92 },
        { name: "JavaScript", level: 90 },
        { name: "React.js", level: 85 },
        { name: "Bootstrap / Tailwind", level: 80 },
        { name: "Vite", level: 78 }
      ],
      Database: [
        { name: "MySQL", level: 88 },
        { name: "MongoDB", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "JDBC", level: 70 }
      ],
      Tools: [
        { name: "Git / GitHub", level: 92 },
        { name: "Maven", level: 85 },
        { name: "Docker", level: 75 },
        { name: "Postman", level: 88 },
        { name: "VS Code / IntelliJ", level: 90 }
      ]

    },
    projects: [
      {
        id: 1,
        title: "Ai-Productivity-Suite (APS) ",
        description: "Developed a full-stack AI productivity suite integrating React.js, Spring Boot, MySQL, and Gemini AI API. Implemented intelligent chat functionality with real-time messaging and AI-powered responses. Designed responsive UI using Framer Motion animations, 3D globe visualization, and theme switching capabilities. Engineered video conferencing demo with WebRTC signaling, participant management, and screen sharing features.",
        image: "https://cdn.prod.website-files.com/623b199ca2171a083b6bb379/642465d98ad857473c5bedd8_ai-website-builder.jpg",
        tech: ["React.js", "Spring Boot", "MySQL", "WebRTC", "Gemini AI", "Framer Motion"],
        liveUrl: "https://ai-productivity-suite.vercel.app/",
        githubUrl: "https://github.com/sunnyvaishnav7/Ai-Productivity-Suite"
      },
      {
        id: 2,
        title: "Svelora (Ai-EMS) ",
        description: "Engineered a comprehensive Employee Management System using React.js, Spring Boot, and MySQL. Implemented role-based authentication and authorization with secure CRUD operations for employee data. Developed department assignment features and employee profile management with real-time updates. Created responsive dashboard with performance tracking and analytics for workforce management.",
        image: "https://www.shutterstock.com/shutterstock/videos/1089333071/thumb/9.jpg?ip=x480",
        tech: ["React.js", "Spring Boot", "MySQL", "JWT", "Responsive Design"],
        liveUrl: "https://svelora-git-main-sunnyvaishnav7s-projects.vercel.app/",
        githubUrl: "https://github.com/sunnyvaishnav7/-Svelora"
      },
      {
        id: 3,
        title: " Portfolio Website",
        description: "Built responsive portfolio website using React.js with modern component architecture. Integrated React UI libraries for enhanced styling and smooth user interactions. Implemented automated deployment pipeline using Vercel with GitHub CI/CD integration. Optimized website performance achieving 95+ Lighthouse scores across all metrics.",
        image: "https://www.shutterstock.com/image-vector/cybersecurity-information-network-protection-future-600nw-1552462901.jpg",
        tech: ["React.js", "CSS", "React UI Libraries", "Vercel CI/CD"]
        ,
        liveUrl: "https://portfolio-website-mocha-zeta-24.vercel.app/",
        githubUrl: "https://github.com/sunnyvaishnav7/Portfolio-website.git"
      },
      {
        id: 4,
        title: "Phishing Email Scanner",
        description: "Developed a Python-based phishing email scanner that inspects content, domains, attachments, and headers for phishing indicators. Integrated custom rules for typosquatting, risky TLDs, malicious attachment types, and manipulative keywords. Implemented domain reputation scoring and detailed result logging for real-time threat analysis.",
        image: "https://www.shutterstock.com/shutterstock/videos/3563146233/thumb/7.jpg?ip=x480",
        tech: ["Python", "Regex", "Email Parser", "Security Automation"],
        liveUrl: "https://github.com/sunnyvaishnav7/phishing-email-scanner",
        githubUrl: "https://github.com/sunnyvaishnav7/phishing-email-scanner"
      },
      {
        id: 5,
        title: "Python Keylogger (Educational Purpose Only)",
        description: "Developed a proof-of-concept keylogger in Python strictly for educational and ethical research purposes. Demonstrates how keylogging mechanisms function for awareness and cybersecurity defense. Includes keyboard event capture, time-based logging, and file-based storage with legal disclaimers to prevent misuse.",
        image: "https://www.shutterstock.com/image-vector/thief-hacker-ai-robot-disguised-260nw-2338004833.jpg",
        tech: ["Python", "Pynput", "Security Research", "Ethical Hacking"],
        liveUrl: "https://github.com/sunnyvaishnav7/keylogger",
        githubUrl: "https://github.com/sunnyvaishnav7/keylogger"
      },
      {
        id: 6,
        title: "Employee Management System",
        description: "Built a full-stack Employee Management System with Spring Boot backend and React.js frontend. Enabled CRUD operations, employee role assignments, and search/sort functionality. Backend follows RESTful architecture with MySQL integration, while frontend features a responsive UI with React components.",
        image: "https://www.shutterstock.com/image-vector/hr-human-resources-management-business-600w-2159783429.jpg",
        tech: ["React.js", "Spring Boot", "MySQL", "REST API", "Responsive Design"],
        liveUrl: "https://github.com/sunnyvaishnav7/employeemanagementsystem",
        githubUrl: "https://github.com/sunnyvaishnav7/employeemanagementsystem"
      },
      {
        id: 7,
        title: "Video Call Application",
        description: "Developed a real-time video calling application using Spring Boot for WebSocket-based signaling and WebRTC for peer-to-peer video communication. Users can create and join video meetings with minimal latency. Implemented STOMP protocol for message routing and session management.",
        image: "https://wersm.com/wp-content/uploads/2025/07/wersm-zoom-VR.jpg",
        tech: ["Spring Boot", "WebSocket", "WebRTC", "STOMP", "JavaScript"],
        liveUrl: "https://github.com/sunnyvaishnav7/videocall.git",
        githubUrl: "https://github.com/sunnyvaishnav7/videocall.git"
      }

    ],
    experience: [
      {
        company: "Artan Consulting Singapore", position: "Full Stack Developer", duration: "Jun 2024 - Present",
        description: "Led the development of scalable microservices architecture, mentored junior developers, and improved application performance and deployment efficiency by 40%."
      }
    ],
    certificates: [
      {
        name: "ISO 27001", issuer: "ISO", date: "2023",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Security Blue Team Biggener", issuer: " Security Blue Team", date: "2022",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Defence Security operation", issuer: " Cybrary", date: "2021",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      }
    ],
    nav: [
      { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' }, { id: 'experience', label: 'Experience' },
      { id: 'certificates', label: 'Certificates' }, { id: 'contact', label: 'Contact' }
    ]
  };

  // Optimized scroll handler with throttling
  const scrollToSection = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  }, []);

  // const handleFormSubmit = useCallback((e) => {
  //   e.preventDefault();
  //   alert('Message sent! (EmailJS integration needed)');
  //   setFormData({ name: '', email: '', message: '' });
  // }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const Resume = () => {
    window.location.href = 'https://drive.google.com/file/d/1a3dWKAj66mtC7gnppBP5Oj2Z4r9sFn-k/view?usp=sharing';
  }
  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = data.nav.map(item => item.id);
          const scrollPos = window.scrollY + 100;
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPos) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.nav]);

  return (
    <div className={`portfolio ${isDarkMode ? 'dark' : 'light'}`}>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo">{data.personal.name.split(' ')[0]}</div>

            <div className="nav-menu desktop-menu">
              {data.nav.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="nav-controls">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="theme-toggle">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-toggle">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {data.nav.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-greeting">Hi, I'm </span>
                <span className="hero-name">{data.personal.name.split(' ')[0]}</span>
              </h1>
              <h2 className="hero-subtitle">{data.personal.title}</h2>
              <p className="hero-tagline">{data.personal.tagline}</p>

              <div className="hero-buttons">
                <button className="btn-primary" onClick={Resume}>
                  <Download size={20} />Download Resume
                </button>
                <button onClick={() => scrollToSection('contact')} className="btn-secondary">
                  Contact Me
                </button>
              </div>
            </div>
            <div className="sunny-image">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQF36ZxUoKbDRA/profile-displayphoto-shrink_400_400/B4DZPxsYAHHMAg-/0/1734926762436?e=1754524800&v=beta&t=yFoSOASO8NJVhX-bwhdl06-mcJfWi68aQAMZ2w_2oRU"
                alt="Profile"
                className="profile-image"
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <div className="section-divider" />
          </div>

          <div className="about-content">
            <div className="about-text">
              <h3 className="about-title">Passionate Cyber Analyst & Problem Solver</h3>
              <p className="about-bio">{data.personal.bio}</p>
              <p className="about-mission">{data.personal.mission}</p>

              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={20} />
                  <span>{data.personal.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={20} />
                  <span>{data.personal.phone}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={20} />
                  <span>{data.personal.location}</span>
                </div>
                <div className="contact-item">
                  <User size={20} />
                  <span>Available for hire</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Skills & Technologies</h2>
            <div className="section-divider" />
          </div>

          <div className="skills-grid">
            {Object.entries(data.skills).map(([category, skills]) => (
              <div key={category} className="skill-category">
                <div className="category-header">
                  {category === 'frontend' && <Code size={24} />}
                  {category === 'backend' && <Briefcase size={24} />}
                  {category === 'tools' && <Award size={24} />}
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                </div>
                {skills.map((skill, idx) => <SkillBar key={idx} skill={skill} />)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider" />
            <p className="section-description">Some of my recent work that I'm proud of</p>
          </div>

          <div className="projects-grid">
            {data.projects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Work Experience</h2>
            <div className="section-divider" />
          </div>

          <div className="experience-timeline">
            {data.experience.map((job, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot" />
                <div className="experience-card">
                  <h3 className="job-position">{job.position}</h3>
                  <h4 className="job-company">{job.company}</h4>
                  <p className="job-duration">{job.duration}</p>
                  <p className="job-description">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Certificates & Achievements</h2>
            <div className="section-divider" />
          </div>

          <div className="certificates-grid">
            {data.certificates.map((cert, idx) => (
              <div key={idx} className="certificate-card">
                <img src={cert.image} alt={cert.name} className="certificate-image" loading="lazy" />
                <h3 className="certificate-name">{cert.name}</h3>
                <p className="certificate-issuer">{cert.issuer}</p>
                <p className="certificate-date">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-divider" />
            <p className="section-description">Let's discuss your next project or opportunity</p>
          </div>

          <div className="contact-content">
            <div className="contact-info-section">
              <h3 className="contact-subtitle">Let's Connect</h3>
              <p className="contact-text">
                I'm always interested in hearing about new opportunities and exciting projects.
                Whether you're a company looking to hire, or you're a fellow Cyber Security Analyst who wants to connect,
                feel free to reach out!
              </p>

              <div className="contact-details">
                <div className="contact-detail">
                  <Mail size={24} />
                  <span>{data.personal.email}</span>
                </div>
                <div className="contact-detail">
                  <Phone size={24} />
                  <span>{data.personal.phone}</span>
                </div>
                <div className="contact-detail">
                  <MapPin size={24} />
                  <span>{data.personal.location}</span>
                </div>
              </div>

              <div className="social-links">
                <a href="https://github.com/sunnyvaishnav7" className="social-link">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/shani-vaishnav/" className="social-link">
                  <Linkedin size={24} />
                </a>
                <a href="https://x.com/Sunnyvaishnav77" className="social-link">
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            <div className="contact-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="form-textarea"
                  placeholder="Your message here..."
                />
              </div>

              <button  className="form-submit">
                <Send size={20} />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © {new Date().getFullYear()} {data.personal.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;