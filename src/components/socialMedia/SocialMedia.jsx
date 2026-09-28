import React from "react";
import "./SocialMedia.scss";
import {socialMediaLinks} from "../../portfolio";

export default function SocialMedia() {
  if (!socialMediaLinks.display) return null;
  const links = [
    {
      label: "GitHub",
      href: socialMediaLinks.github,
      className: "github",
      icon: "fab fa-github"
    },
    {
      label: "LinkedIn",
      href: socialMediaLinks.linkedin,
      className: "linkedin",
      icon: "fab fa-linkedin-in"
    },
    {
      label: "Email Hunter",
      href: socialMediaLinks.gmail && `mailto:${socialMediaLinks.gmail}`,
      className: "google",
      icon: "fas fa-envelope"
    }
  ];
  return (
    <div className="social-media-div">
      {links
        .filter(link => link.href)
        .map(link => (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            className={`icon-button ${link.className}`}
          >
            <i className={link.icon} aria-hidden="true"></i>
          </a>
        ))}
    </div>
  );
}
