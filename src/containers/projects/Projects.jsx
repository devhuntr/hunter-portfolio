import React, {useState, useEffect, useContext} from "react";
import "./Project.scss";
import Button from "../../components/button/Button";
import GithubRepoCard from "../../components/githubRepoCard/GithubRepoCard";
import {openSource, socialMediaLinks} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Projects() {
  const [repositories, setRepositories] = useState([]);
  const [status, setStatus] = useState("loading");
  const {isDark} = useContext(StyleContext);
  const enabled = openSource.display;

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    setStatus("loading");
    fetch(`${import.meta.env.BASE_URL}profile.json`, {
      signal: controller.signal
    })
      .then(response => {
        if (!response.ok) throw new Error("GitHub snapshot unavailable");
        return response.json();
      })
      .then(response => {
        const edges = response?.data?.user?.pinnedItems?.edges;
        if (response.errors || !Array.isArray(edges))
          throw new Error("Invalid GitHub snapshot");
        if (controller.signal.aborted) return;
        const valid = edges.filter(
          edge =>
            edge?.node?.id &&
            edge.node.name &&
            /^https:\/\/github\.com\//.test(edge.node.url)
        );
        setRepositories(valid);
        setStatus(valid.length ? "ready" : "empty");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("unavailable");
      });
    return () => controller.abort();
  }, [enabled]);

  if (!enabled) return null;
  return (
    <section className="main" id="opensource" aria-labelledby="github-heading">
      <h2 className="project-title" id="github-heading">
        Selected GitHub repositories
      </h2>
      {status === "loading" && (
        <p role="status">Loading selected repositories…</p>
      )}
      {status === "empty" && (
        <p>No pinned repositories to show yet. Explore my work on GitHub.</p>
      )}
      {status === "unavailable" && (
        <p>Explore my repositories directly on GitHub.</p>
      )}
      {status === "ready" && (
        <div className="repo-cards-div-main">
          {repositories.map(repo => (
            <GithubRepoCard repo={repo} key={repo.node.id} isDark={isDark} />
          ))}
        </div>
      )}
      <Button
        text="View GitHub"
        className="project-button"
        href={socialMediaLinks.github}
        newTab
      />
    </section>
  );
}
