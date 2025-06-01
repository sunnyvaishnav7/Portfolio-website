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
      title: "Cyber Security Analyst",
      tagline: "Building digital experiences that matter",
      email: "wwww.sunnyvaishnavh777@gmail.com",
      phone: "+91 8949640984",
      location: "Udaipur ,Rajasthan(India)",
      bio: "Passionate cybersecurity analyst with 1+ year of hands-on experience protecting systems and responding to threats in real time. I enjoy turning complex security challenges into clear, actionable solutions and thrive on keeping digital environments safe and resilient",
      mission: "My mission is to bridge the gap between security and usability, building digital environments that are not only secure and resilient but also efficient and user-friendly."
    },
    skills: {
      OS: [
        { name: "Linux Basic", level: 90 }, { name: "Windows Basic", level: 95 },
        { name: "Linux Cli", level: 85 }, { name: "Bash script", level: 88 }, { name: "log", level: 82 }
      ],
      SIEM: [
        { name: "Splunk", level: 85 },
        { name: "IBM QRadar", level: 80 },
        { name: "Microsoft Sentinel", level: 78 },
        { name: "ELK Stack", level: 75 },
        { name: "LogRhythm", level: 70 }
      ],
      tools: [
        { name: "Wireshark", level: 90 },
        { name: "Burp Suite", level: 85 },
        { name: "Git", level: 92 },
        { name: "Docker", level: 78 },
        { name: "Kibana", level: 80 }
      ]
    },
    projects: [
      {
        id: 1,
        title: "LogSentinel",
        description: "Simulates a SOC alert dashboard that parses logs, detects anomalies, and triggers alerts based on suspicious patterns.",
        image: "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/hznelrw3e3rjufkjy7ml",
        tech: ["React", "Python", "Flask", "SIEM Simulation"],
        liveUrl: "#",
        githubUrl: "#"
      },
      {
        id: 2,
        title: "ThreatPulse",
        description: "A log correlation engine that detects brute-force attempts, privilege misuse, and other common attack patterns from simulated Windows/Linux logs.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50iSdQJNcwNhW-PUgAOGLK61Jf-OhP83-3Q&s",
        tech: ["Python", "Regex", "Pandas", "Matplotlib"],
        liveUrl: "#",
        githubUrl: "#"
      },
      {
        id: 3,
        title: "IntruWatch",
        description: "Visualizes security events on a timeline, allowing SOC analysts to review alerts, flag false positives, and generate basic incident reports.",
        image: "https://www.shutterstock.com/image-vector/cybersecurity-information-network-protection-future-600nw-1552462901.jpg",
        tech: ["HTML5", "JavaScript", "Chart.js", "Bootstrap"],
        liveUrl: "#",
        githubUrl: "#"
      }
    ],
    experience: [
      {
        company: "Artan Consulting", position: "Jr. Cyber Security Analyst", duration: "Jun 2024 - Present",
        description: "Led implementation of SOC processes within a microservices environment, mentored junior SOC analysts, and enhanced threat detection and response efficiency by 40%."
      },
      {
        company: " ", position: "Intern Cyber Security", duration: "Jan 2024 - Jun 2024",
        description: "Assisted in monitoring security events using SIEM tools, collaborated with senior analysts to investigate incidents, and contributed to improving alert triage workflows."
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

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    alert('Message sent! (EmailJS integration needed)');
    setFormData({ name: '', email: '', message: '' });
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const Resume = () => {
    window.location.href = 'https://drive.google.com/file/d/1gruz_4b6pWQQce6BkAA-HOg1naVPjQsh/view?usp=sharing';
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
      {/* <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
        
        .portfolio { transition: all 0.3s ease; }
        .light { --bg: #fff; --text: #333; --accent: #3b82f6; --border: #e5e7eb; --card: #f9fafb; }
        .dark { --bg: #0f172a; --text: #f1f5f9; --accent: #60a5fa; --border: #334155; --card: #1e293b; }
        
        .navbar { position: fixed; top: 0; width: 100%; background: var(--bg); border-bottom: 1px solid var(--border); z-index: 1000; backdrop-filter: blur(10px); }
        .nav-container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
        .nav-content { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; color: var(--accent); }
        .nav-menu { display: flex; gap: 2rem; }
        .nav-link { background: none; border: none; color: var(--text); cursor: pointer; padding: 0.5rem 1rem; border-radius: 0.5rem; transition: all 0.2s; }
        .nav-link:hover, .nav-link.active { background: var(--accent); color: white; }
        .nav-controls { display: flex; gap: 1rem; align-items: center; }
        .theme-toggle, .mobile-menu-toggle { background: none; border: none; color: var(--text); cursor: pointer; padding: 0.5rem; border-radius: 0.5rem; }
        .mobile-menu-toggle { display: none; }
        .mobile-menu { display: none; background: var(--bg); border-bottom: 1px solid var(--border); }
        .mobile-menu-content { max-width: 1200px; margin: 0 auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .mobile-nav-link { background: none; border: none; color: var(--text); cursor: pointer; padding: 1rem; text-align: left; border-radius: 0.5rem; }
        
        .hero-section { min-height: 100vh; display: flex; align-items: center; background: linear-gradient(135deg, var(--bg) 0%, var(--card) 100%); position: relative; overflow: hidden; }
        .hero-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ddd6fe" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></svg>'); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 1; }
        .hero-content { display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; }
        .hero-title { font-size: 3.5rem; font-weight: bold; margin-bottom: 1rem; }
        .hero-name { color: var(--accent); }
        .hero-subtitle { font-size: 1.5rem; color: var(--accent); margin-bottom: 1rem; }
        .hero-tagline { font-size: 1.2rem; color: var(--text); opacity: 0.8; margin-bottom: 2rem; }
        .hero-buttons { display: flex; gap: 1rem; }
        .btn-primary, .btn-secondary { padding: 1rem 2rem; border-radius: 0.5rem; border: none; cursor: pointer; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
        .btn-primary { background: var(--accent); color: white; }
        .btn-secondary { background: transparent; color: var(--accent); border: 2px solid var(--accent); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3); }
        .btn-secondary:hover { background: var(--accent); color: white; }
        .profile-image { width: 300px; height: 300px; border-radius: 50%; object-fit: cover; border: 4px solid var(--accent); }
        .scroll-indicator { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); color: var(--accent); animation: bounce 2s infinite; }
        
        section { padding: 5rem 0; background: var(--bg); color: var(--text); }
        section:nth-child(even) { background: var(--card); }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-title { font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; }
        .section-divider { width: 4rem; height: 3px; background: var(--accent); margin: 0 auto 1rem; }
        .section-description { font-size: 1.1rem; opacity: 0.8; }
        
        .about-content { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        .about-title { font-size: 1.8rem; margin-bottom: 1rem; color: var(--accent); }
        .about-bio, .about-mission { margin-bottom: 1.5rem; line-height: 1.8; }
        .contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 2rem; }
        .contact-item { display: flex; align-items: center; gap: 0.5rem; padding: 1rem; background: var(--card); border-radius: 0.5rem; }
        
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .skill-category { background: var(--card); padding: 2rem; border-radius: 1rem; }
        .category-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; color: var(--accent); }
        .skill-item { margin-bottom: 1.5rem; }
        .skill-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .skill-bar-bg { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
        .skill-bar-fill { height: 100%; background: var(--accent); transition: width 0.5s ease; border-radius: 4px; }
        
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
        .project-card { background: var(--card); border-radius: 1rem; overflow: hidden; transition: transform 0.3s; }
        .project-card:hover { transform: translateY(-5px); }
        .project-img-container { position: relative; overflow: hidden; }
        .project-img { width: 100%; height: 200px; object-fit: cover; }
        .project-overlay { position: absolute; inset: 0; background: linear-gradient(45deg, var(--accent), transparent); opacity: 0; transition: opacity 0.3s; }
        .project-card:hover .project-overlay { opacity: 0.3; }
        .project-content { padding: 1.5rem; }
        .project-title { font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--accent); }
        .project-desc { margin-bottom: 1rem; opacity: 0.9; }
        .project-tech { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .tech-tag { background: var(--accent); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem; }
        .project-links { display: flex; gap: 1rem; }
        .project-link { display: flex; align-items: center; gap: 0.5rem; color: var(--accent); text-decoration: none; padding: 0.5rem 1rem; border: 1px solid var(--accent); border-radius: 0.5rem; transition: all 0.2s; }
        .project-link:hover { background: var(--accent); color: white; }
        
        .experience-timeline { position: relative; }
        .experience-timeline::before { content: ''; position: absolute; left: 20px; top: 0; bottom: 0; width: 2px; background: var(--accent); }
        .timeline-item { position: relative; padding-left: 60px; margin-bottom: 3rem; }
        .timeline-dot { position: absolute; left: 12px; top: 8px; width: 16px; height: 16px; background: var(--accent); border-radius: 50%; }
        .experience-card { background: var(--card); padding: 2rem; border-radius: 1rem; }
        .job-position { font-size: 1.3rem; color: var(--accent); margin-bottom: 0.5rem; }
        .job-company { font-size: 1.1rem; margin-bottom: 0.5rem; }
        .job-duration { color: var(--accent); margin-bottom: 1rem; }
        
        .certificates-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .certificate-card { background: var(--card); padding: 1.5rem; border-radius: 1rem; text-align: center; }
        .certificate-image { width: 80px; height: 80px; border-radius: 0.5rem; margin-bottom: 1rem; object-fit: cover; }
        .certificate-name { font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--accent); }
        .certificate-issuer { opacity: 0.8; margin-bottom: 0.5rem; }
        
        .contact-content { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        .contact-subtitle { font-size: 1.5rem; margin-bottom: 1rem; color: var(--accent); }
        .contact-text { margin-bottom: 2rem; line-height: 1.8; }
        .contact-details { margin-bottom: 2rem; }
        .contact-detail { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .social-links { display: flex; gap: 1rem; }
        .social-link { display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--accent); color: white; border-radius: 50%; text-decoration: none; transition: transform 0.2s; }
        .social-link:hover { transform: scale(1.1); }
        .contact-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; }
        .form-label { margin-bottom: 0.5rem; color: var(--accent); }
        .form-input, .form-textarea { padding: 1rem; border: 1px solid var(--border); border-radius: 0.5rem; background: var(--bg); color: var(--text); }
        .form-submit { padding: 1rem 2rem; background: var(--accent); color: white; border: none; border-radius: 0.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.2s; }
        .form-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3); }
        
        .footer { background: var(--card); padding: 2rem 0; text-align: center; border-top: 1px solid var(--border); }
        
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); } 40% { transform: translateX(-50%) translateY(-10px); } 60% { transform: translateX(-50%) translateY(-5px); } }
        
        @media (max-width: 768px) {
          .desktop-menu { display: none; }
          .mobile-menu-toggle { display: block; }
          .mobile-menu.show { display: block; }
          .hero-content { grid-template-columns: 1fr; text-align: center; }
          .hero-title { font-size: 2.5rem; }
          .profile-image { width: 200px; height: 200px; }
          .contact-content { grid-template-columns: 1fr; }
          .hero-buttons { flex-direction: column; }
          .projects-grid { grid-template-columns: 1fr; }
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style> */}

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

              <button onClick={handleFormSubmit} className="form-submit">
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