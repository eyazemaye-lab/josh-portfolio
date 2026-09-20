import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Project Data Array
const projectsData = [
  {
    id: 1,
    title: "DriveSmart - E-Learning Platform",
    description: "A responsive driving school platform featuring course exploration, pricing tiers, and self-paced learning modules for student drivers.",
    technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    image: "/project1.png", 
    liveUrl: "https://josh-portfolio-phi-six.vercel.app/",
    githubUrl: "https://github.com/eyazemaye-lab"
  },
  {
    id: 2,
    title: "DriveSmart - Multilingual Web App",
    description: "A localized version of the DriveSmart platform featuring internationalization support, dynamic content rendering, and a fully responsive layout.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5"],
    image: "/project2.png", 
    liveUrl: "https://github.com/eyazemaye-lab",
    githubUrl: "https://github.com/eyazemaye-lab"
  },
  {
    id: 3,
    title: "Learning Management Admin Panel",
    description: "A comprehensive admin dashboard to manage students, courses, and enrollments. Features data visualization, progress tracking, and verification systems.",
    technologies: ["PHP", "MySQL", "JavaScript", "CSS3"],
    image: "/project3.png", 
    liveUrl: "https://github.com/eyazemaye-lab",
    githubUrl: "https://github.com/eyazemaye-lab"
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [formStatus, setFormStatus] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const tiltRef = useRef(null);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');

    const formData = new FormData(e.target);
    formData.append("access_key", "4b0a65d1-9d53-462a-92ef-38288c6b6fe7");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus('Message sent successfully! 🎉');
        e.target.reset();
      } else {
        setFormStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormStatus('Error sending message. Check your connection.');
    }
  };

  // Scroll Reveal Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Active Navbar Link Tracker Logic
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  // Scroll to Top Button Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3D Tilt Mouse Handlers
  const handleMouseMove = (e) => {
    const wrapper = tiltRef.current;
    if (!wrapper) return;

    const { left, top, width, height } = wrapper.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateY = (x - 0.5) * 20; 
    const rotateX = (0.5 - y) * 20; 

    wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    
    wrapper.style.setProperty('--mouse-x', `${x * 100}%`);
    wrapper.style.setProperty('--mouse-y', `${y * 100}%`);
    wrapper.style.setProperty('--glare-opacity', '1');
  };

  const handleMouseLeave = () => {
    const wrapper = tiltRef.current;
    if (!wrapper) return;
    wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    wrapper.style.setProperty('--glare-opacity', '0');
  };

  return (
    <div className={darkMode ? 'app dark-theme' : 'app light-theme'}>
      {/* Floating Header */}
      <header className="navbar-container">
        <nav className="navbar">
          <div className="nav-logo">&lt;EN /&gt;</div>
          
          <div className="nav-menu">
            <a href="#about" className={activeSection === 'about' ? 'active-link' : ''}>About</a>
            <a href="#skills" className={activeSection === 'skills' ? 'active-link' : ''}>Skills</a>
            <a href="#work" className={activeSection === 'work' ? 'active-link' : ''}>Work</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active-link' : ''}>Contact</a>
          </div>

          <div className="nav-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <a href="/resume.pdf" download="Eyasu_Nigussie_Resume.pdf" className="download-cv-btn">
              Download CV
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-section reveal">
        <div className="hero-container">
          <div className="hero-content">
            <div className="role-pill">Full Stack Developer</div>
            
            <h1 className="hero-title">
              Hi, I'm <span className="highlight-name">Eyasu Nigussie</span> <span className="wave-emoji">👋</span>
            </h1>

            <p className="hero-bio">
              I'm a full-stack developer passionate about crafting exceptional digital experiences. 
              I specialize in building fast, accessible, and visually appealing applications that users love. 
              My approach combines technical expertise with a keen eye for design.
            </p>

            <div className="hero-details">
              <div className="detail-item">
                <span className="icon">📍</span>
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="detail-item">
                <span className="status-dot"></span>
                <span>Available for new projects</span>
              </div>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/eyazemaye-lab" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/></svg>
              </a>
            </div>
          </div>

          <div 
            className="hero-image-wrapper" 
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="image-backdrop"></div>
            <img src="/eyasu.jpg" alt="Eyasu Nigussie" className="hero-profile-img" />
            <div className="hero-glare"></div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section reveal">
        <div className="section-pill-container">
          <span className="section-pill">About me</span>
        </div>

        <div className="about-container">
          <div className="about-image-wrapper">
            <div className="about-image-backdrop"></div>
            <img src="/eyasu1.jpg" alt="Eyasu Nigussie" className="about-profile-img" />
          </div>

          <div className="about-content">
            <h2>Curious about me? Here you go:</h2>
            
            <p>
              As a full-stack developer with a background in computer engineering, I build modern web applications using React, Next.js, and Node.js.
            </p>

            <p>
              I specialize in turning complex technical challenges into intuitive, fast, and scalable solutions—from interactive user interfaces to cloud-hosted back-end services.
            </p>

            <p>When I’m not coding, I enjoy exploring new tech and contributing to open-source projects.</p>

            <p className="about-availability">
              Ready for my next challenge—available for both freelance work and full-time roles!
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section reveal">
        <div className="section-pill-container">
          <span className="section-pill">Skills</span>
        </div>
        <p className="section-subtitle">The skills, tools and technologies I am really good at:</p>

        <div className="skills-grid">
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
            <span>HTML5</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
            <span>CSS3</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
            <span>Javascript</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
            <span>Typescript</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
            <span>React</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className="theme-invert" alt="Next.js" />
            <span>Next.js</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
            <span>Node.js</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="theme-invert" alt="Express.js" />
            <span>Express.js</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
            <span>PostgreSQL</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
            <span>MongoDB</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwindcss" />
            <span>Tailwindcss</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" alt="Sass/Scss" />
            <span>Sass/Scss</span>
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
            <span>Git</span>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="projects-section">
        <div className="reveal">
          <h2>Featured Projects 🚀</h2>
          <p className="section-desc">Here are a few real projects I've built using modern web development tools.</p>
        </div>
        
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card reveal" 
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-screenshot" />
              </div>

              <div className="project-content">
                <div className="card-header">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <div className="card-footer">
                  <div className="tech-badges">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="badge">{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Live Demo ↗
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                      GitHub 💻
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section - Upgraded with Direct Info */}
      <section id="contact" className="contact-section reveal">
        <h2>FINALLY 📩</h2>
        <p>I'm available to discuss development opportunities, answer any queries, or simply connect. Let's get in touch."</p>

        {/* Direct Contact Info */}
        <div className="contact-info">
          <a href="mailto:abelmekonn9@gmail.com" className="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>eyazenaye@gmail.com</span>
          </a>
          <a href="tel:+251930540790" className="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>0930540790</span>
          </a>
          <a href="tel:+251942067027" className="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>0942067027</span>
          </a>
        </div>

        <p className="socials-text">You may also find me on these platforms!</p>
        
        <div className="hero-socials contact-socials">
          <a href="https://github.com/eyazemaye-lab" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter" aria-label="Twitter">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/></svg>
          </a>
        </div>

        <form onSubmit={handleFormSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" placeholder="john@example.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Hi Eyasu..." required></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </form>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Eyasu Nigussie. Built with React & Deployed on Vercel.</p>
      </footer>

      <button 
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default App;