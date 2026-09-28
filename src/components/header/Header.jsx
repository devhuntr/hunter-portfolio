import React, {useContext, useState} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  bigProjects,
  achievementSection
} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    {show: bigProjects.display, href: "#projects", text: "Work"},
    {show: skillsSection.display, href: "#skills", text: "Skills"},
    {show: workExperiences.display, href: "#experience", text: "Experience"},
    {show: openSource.display, href: "#opensource", text: "GitHub"},
    {
      show: achievementSection.display,
      href: "#achievements",
      text: "Certifications"
    },
    {
      show: Boolean(greeting.resumeLink),
      href: greeting.resumeLink,
      text: "Resume"
    },
    {show: true, href: "#contact", text: "Contact"}
  ];
  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="#greeting" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </a>
        <button
          className="menu-icon"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="portfolio-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </button>
        <ul
          id="portfolio-navigation"
          className={`${isDark ? "dark-menu " : ""}menu${
            menuOpen ? " menu-open" : ""
          }`}
        >
          {links
            .filter(link => link.show)
            .map(link => (
              <li key={link.text}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.text}
                </a>
              </li>
            ))}
          <li className="theme-toggle">
            <ToggleSwitch />
          </li>
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;
