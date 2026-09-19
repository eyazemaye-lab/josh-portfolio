import React, { useState } from 'react';
import './App.css';

function App() {
  // Option 5: React State for Dark/Light Mode
  const [darkMode, setDarkMode] = useState(true);

  // Option 2: State to handle Contact Form submission status
  const [formStatus, setFormStatus] = useState('');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');

    const formData = new FormData(e.target);
    
    // Web3Forms public access key for receiving emails directly
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
      {/* Navigation Header */}
      <nav className="navbar">
        <h2 className="logo">Josh.dev</h2>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          {/* Option 5: Dark / Light Mode Toggle Button */}
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="hero-section">
        <h1>Hi, I'm <span className="highlight">Josh</span> 👋</h1>
        <p className="subtitle">Frontend Developer & React Enthusiast</p>
        <p className="bio">
          I build modern, responsive web applications with clean user interfaces and smooth interactions.
        </p>
        <a href="#contact" className="cta-btn">Get In Touch</a>
      </section>

      {/* Option 2: Functional Contact Form Section */}
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
            <textarea id="message" name="message" rows="5" placeholder="Hi Josh, I'd like to work with you on..." required></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </form>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Josh. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
