import {beforeEach, vi} from "vitest";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn()
  }));
});
