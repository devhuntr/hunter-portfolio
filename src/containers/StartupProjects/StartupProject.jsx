import React, {useContext} from "react";
import "./StartupProjects.scss";
import {bigProjects} from "../../portfolio";
import {Fade} from "../../components/reveal/Reveal";
import StyleContext from "../../contexts/StyleContext";

export default function StartupProject() {
  const {isDark} = useContext(StyleContext);
  if (!bigProjects.display) return null;

  return (
    <Fade bottom duration={500} distance="20px">
      <div
        className="main featured-work"
        id="projects"
        data-theme={isDark ? "dark" : "light"}
      >
        <p className="featured-work__eyebrow">Selected project</p>
        <h2 className="featured-work__heading">{bigProjects.title}</h2>
        <p className="featured-work__intro">{bigProjects.subtitle}</p>
        <div className="featured-work__list">
          {bigProjects.projects.map(project => (
            <article className="case-study" key={project.projectName}>
              <div className="case-study__overview">
                <p className="featured-work__eyebrow">
                  {project.caseStudy?.category || "Project"}
                </p>
                <h3>{project.projectName}</h3>
                <p>{project.projectDesc}</p>
                {project.caseStudy && (
                  <div className="case-study__impact">
                    <strong>{project.caseStudy.impactValue}</strong>
                    <span>{project.caseStudy.impactContext}</span>
                  </div>
                )}
                {project.image && (
                  <img src={project.image} alt={project.projectName} />
                )}
                {project.footerLink.length > 0 && (
                  <div className="case-study__links">
                    {project.footerLink
                      .filter(link => link.url)
                      .map(link => (
                        <a key={link.url} href={link.url}>
                          {link.name} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                  </div>
                )}
              </div>
              {project.caseStudy && (
                <div className="case-study__details">
                  <section>
                    <h4>
                      <span aria-hidden="true">01 / </span>The problem
                    </h4>
                    <p>{project.caseStudy.problem}</p>
                  </section>
                  <section>
                    <h4>
                      <span aria-hidden="true">02 / </span>My contribution
                    </h4>
                    <p>{project.caseStudy.contribution}</p>
                  </section>
                  <section>
                    <h4>
                      <span aria-hidden="true">03 / </span>The outcome
                    </h4>
                    <p>{project.caseStudy.outcome}</p>
                  </section>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </Fade>
  );
}
