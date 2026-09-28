import React, {act} from "react";
import {createRoot} from "react-dom/client";
import {vi, beforeEach, afterEach, it, expect} from "vitest";
import DisplayLottie from "./DisplayLottie";

vi.mock("lottie-react", () => ({
  default: ({autoplay, loop}) => (
    <div data-autoplay={String(autoplay)} data-loop={String(loop)} />
  )
}));
let root;
let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});
it("keeps the illustration static for reduced motion and responds to preference changes", () => {
  let update;
  const preference = {
    matches: true,
    addEventListener: vi.fn((event, listener) => {
      update = listener;
    }),
    removeEventListener: vi.fn()
  };
  window.matchMedia.mockReturnValue(preference);
  act(() => root.render(<DisplayLottie animationData={{}} />));
  expect(container.firstChild.dataset.autoplay).toBe("false");
  expect(container.firstChild.dataset.loop).toBe("false");
  act(() => {
    preference.matches = false;
    update();
  });
  expect(container.firstChild.dataset.autoplay).toBe("true");
  expect(container.firstChild.dataset.loop).toBe("true");
});
