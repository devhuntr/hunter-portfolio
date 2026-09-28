import {vi, beforeEach, afterEach, it, expect} from "vitest";
import React, {act} from "react";
import {createRoot} from "react-dom/client";

import Projects from "./Projects";
import {StyleProvider} from "../../contexts/StyleContext";
import {openSource} from "../../portfolio";

let container;
let root;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  openSource.display = true;
  window.fetch = vi.fn();
});
afterEach(() => {
  act(() => {
    if (root) root.unmount();
    root = null;
  });
  container.remove();
  openSource.display = false;
});
async function renderResponse(payload, ok = true) {
  window.fetch.mockResolvedValue({ok, json: async () => payload});
  await act(async () => {
    root.render(
      <StyleProvider value={{isDark: false}}>
        <Projects />
      </StyleProvider>
    );
  });
}
it("keeps the GitHub link available when the snapshot is missing", async () => {
  await renderResponse(null, false);
  expect(container.textContent).toContain(
    "Explore my repositories directly on GitHub."
  );
  expect(
    container.querySelector('a[href="https://github.com/devhuntr"]')
  ).not.toBeNull();
});
it("handles an empty pinned repository list", async () => {
  await renderResponse({data: {user: {pinnedItems: {edges: []}}}});
  expect(container.textContent).toContain("No pinned repositories");
});
it("handles a malformed snapshot without crashing", async () => {
  await renderResponse({errors: [{message: "Unavailable"}]});
  expect(container.textContent).toContain(
    "Explore my repositories directly on GitHub."
  );
});
it("renders a valid repository as a keyboard-accessible link", async () => {
  await renderResponse({
    data: {
      user: {
        pinnedItems: {
          edges: [
            {
              node: {
                id: "sample",
                name: "Sample project",
                url: "https://github.com/devhuntr/sample",
                description: "A repository fixture",
                forkCount: 0,
                diskUsage: 100,
                stargazers: {totalCount: 0},
                primaryLanguage: null
              }
            }
          ]
        }
      }
    }
  });
  expect(
    container.querySelector('a[href="https://github.com/devhuntr/sample"]')
      .textContent
  ).toContain("Sample project");
});
it("aborts the snapshot request when unmounted", () => {
  window.fetch.mockImplementation(() => new Promise(() => {}));
  act(() => {
    root.render(
      <StyleProvider value={{isDark: false}}>
        <Projects />
      </StyleProvider>
    );
  });
  const signal = window.fetch.mock.calls[0][1].signal;
  expect(signal.aborted).toBe(false);
  act(() => {
    if (root) root.unmount();
    root = null;
  });
  expect(signal.aborted).toBe(true);
});
