import React, { useState } from 'react';
import './App.css';

// Option 2: Real Project Content Array
const projectsData = [
  {
    id: 1,
    title: "Personal React Portfolio",
    description: "A modern, interactive developer portfolio featuring dark/light mode toggling, custom CSS animations, smooth navigation, and direct email integration via Web3Forms.",
    technologies: ["React", "Vite", "CSS Flexbox/Grid", "Web3Forms"],
    liveUrl: "https://josh-portfolio-phi-six.vercel.app/",
    githubUrl: "https://github.com/eyazemaye-lab/josh-portfolio"
  },
  {
    id: 2,
    title: "Interactive E-Commerce Hub",
    description: "A feature-rich web storefront built with React. Includes dynamic product filtering, state-managed shopping cart, and custom UI design.",
    technologies: ["React", "JavaScript", "CSS3", "REST API"],
    liveUrl: "https://github.com/eyazemaye-lab",
    githubUrl: "https://github.com/eyazemaye-lab"
  },
  {
    id: 3,
    title: "Task & Workflow Dashboard",
    description: "A clean productivity web app for task organization, category tags, interactive status toggles, and local storage state persistence.",
    technologies: ["React", "Hooks", "JavaScript", "CSS Grid"],
    liveUrl: "https://github.com/eyazemaye-lab",
    githubUrl: "https://github.com/eyazemaye-lab"
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [formStatus, setFormStatus] = useState('');

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

  return (
    <div className={darkMode ? 'app dark-theme' : 'app light-theme'}>
      {/* Navigation */}
      <nav className="navbar">
        <h2 className="logo">Josh<span className="dot">.dev</span></h2>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="hero-section">
        <div className="badge hero-badge">Available for Work</div>
        <h1>Hi, I'm <span className="highlight">Josh</span> 👋</h1>
        <p className="subtitle">Frontend Developer & React Enthusiast</p>
        <p className="bio">
          I build sleek, responsive, and user-friendly web applications with clean React code and modern CSS design.
        </p>
        <div className="hero-cta-group">
          <a href="#projects" className="cta-btn primary-cta">View My Work</a>
          <a href="#contact" className="cta-btn secondary-cta">Get In Touch</a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2>Featured Projects 🚀</h2>
        <p className="section-desc">Here are a few real projects I've built using modern web development tools.</p>
        
        <div className="projects-grid">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-header">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="card-footer">
                <div className="tech-badges">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="badge">{tech}</span>
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
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Send Me a Message 📩</h2>
        <p>Fill out the form below to reach out directly to my email inbox.</p>

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
            <textarea id="message" name="message" rows="5" placeholder="Hi Josh, I'd like to work with you..." required></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </form>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Josh. Built with React & Deployed on Vercel.</p>
      </footer>
    </div>
  );
}

export default App;