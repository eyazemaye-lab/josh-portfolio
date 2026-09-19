import React from 'react';
import './App.css';

function App() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Frontend",
      description: "A responsive online store UI built with React and modern CSS features.",
      techStack: ["React", "CSS3", "JavaScript"],
      githubLink: "https://github.com",
      liveLink: "https://example.com"
    },
    {
      id: 2,
      title: "Task Tracker App",
      description: "A productivity application supporting CRUD operations and local storage.",
      techStack: ["React", "State Hooks", "LocalStorage"],
      githubLink: "https://github.com",
      liveLink: "https://example.com"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Fetches live weather data using REST APIs with asynchronous JavaScript.",
      techStack: ["React", "REST API", "Async/Await"],
      githubLink: "https://github.com",
      liveLink: "https://example.com"
    }
  ];

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <div className="logo">Josh.dev</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <header className="hero">
        <h1>Hi, I'm <span className="highlight">Josh</span></h1>
        <p className="subtitle">Frontend Developer & React Enthusiast</p>
        <a href="#projects" className="cta-btn">View My Work</a>
      </header>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I am a passionate web developer focused on building interactive, modern, and user-friendly web applications. 
          Experienced in HTML, CSS, JavaScript, and currently building projects with React.
        </p>
      </section>

      <section id="projects" className="section">
        <h2>My Works</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.githubLink} target="_blank" rel="noreferrer">GitHub</a>
                <a href={project.liveLink} target="_blank" rel="noreferrer">Live Demo</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Get In Touch</h2>
        <p>Interested in working together or have a question? Feel free to reach out!</p>
        <a href="mailto:josh@example.com" className="cta-btn">Email Me</a>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} Josh. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;