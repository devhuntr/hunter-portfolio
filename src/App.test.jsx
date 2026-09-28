import {vi, beforeEach, afterEach, it, expect} from "vitest";
import React, {act} from "react";
import {createRoot} from "react-dom/client";
import {Simulate} from "react-dom/test-utils";
import App from "./App";
import {greeting} from "./portfolio";

vi.mock("./components/displayLottie/DisplayLottie", () => ({
  default: () => null
}));

let container;
let root;
const originalResumeLink = greeting.resumeLink;

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn()
  }));
  window.fetch = vi.fn();
  window.localStorage.clear();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    if (root) root.unmount();
    root = null;
  });
  container.remove();
  greeting.resumeLink = originalResumeLink;
});

function renderPortfolio() {
  act(() => {
    if (!root) root = createRoot(container);
    root.render(<App />);
  });
}

it("shows Hunter's real content immediately without optional data requests", () => {
  renderPortfolio();
  expect(container.textContent).toContain("Hi, I'm Hunter");
  expect(container.textContent).toContain("BYU-Idaho");
  expect(container.textContent).toContain("DR Heating & Plumbing");
  expect(container.textContent).toContain("Internal Operations Platform");
  expect(container.textContent).not.toMatch(
    /Saad|Harvard|Proficiency|Podcast|Lorem ipsum/
  );
  expect(container.querySelector("#twitter")).toBeNull();
  expect(container.querySelector("#blogs")).toBeNull();
  expect(window.fetch).not.toHaveBeenCalled();
});

it("provides working internal navigation and the supplied contact links", () => {
  renderPortfolio();
  container.querySelectorAll('a[href^="#"]').forEach(link => {
    expect(container.querySelector(link.getAttribute("href"))).not.toBeNull();
  });
  expect(
    container.querySelector('a[href="mailto:and25027@byui.edu"]')
  ).not.toBeNull();
  expect(
    container.querySelector('a[href="https://github.com/devhuntr"]')
  ).not.toBeNull();
  expect(
    container.querySelector(
      'a[href="https://www.linkedin.com/in/hunteranderson19/"]'
    )
  ).not.toBeNull();
});

it("hides the resume until supplied and uses its configured URL without nested links", () => {
  renderPortfolio();
  expect(container.textContent).not.toMatch(/View resume|Resume/);
  greeting.resumeLink = "https://example.com/hunter-resume.pdf";
  renderPortfolio();
  const resumeLinks = container.querySelectorAll(
    'a[href="https://example.com/hunter-resume.pdf"]'
  );
  expect(resumeLinks).toHaveLength(2);
  expect(container.querySelector("a a")).toBeNull();
});

it("opens the mobile navigation and closes it after choosing a section", () => {
  renderPortfolio();
  const toggle = container.querySelector(
    'button[aria-label="Toggle navigation"]'
  );
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  act(() => Simulate.click(toggle));
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  act(() =>
    Simulate.click(container.querySelector('header a[href="#projects"]'))
  );
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
});

it("persists dark mode and restores it on the next mount", () => {
  renderPortfolio();
  act(() =>
    Simulate.change(container.querySelector('input[aria-label="Dark mode"]'))
  );
  expect(window.localStorage.getItem("isDark")).toBe("true");
  act(() => {
    if (root) root.unmount();
    root = null;
  });
  renderPortfolio();
  expect(container.querySelector('input[aria-label="Dark mode"]').checked).toBe(
    true
  );
});
