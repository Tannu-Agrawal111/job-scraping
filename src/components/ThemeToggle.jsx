import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button className="theme-toggle-btn glass-effect" onClick={toggleTheme} title="Toggle Theme">
      {theme === 'dark' ? <FaSun className="sun" /> : <FaMoon className="moon" />}
    </button>
  );
};

export default ThemeToggle;
