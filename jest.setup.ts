import "@testing-library/jest-dom";

let uuidCounter = 0;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(),
    dispatchEvent: jest.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});

Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, "crypto", {
    value: {
      randomUUID: jest.fn(() => `test-uuid-${++uuidCounter}`),
    },
  });
} else {
  Object.defineProperty(globalThis.crypto, "randomUUID", {
    writable: true,
    value: jest.fn(() => `test-uuid-${++uuidCounter}`),
  });
}

beforeEach(() => {
  uuidCounter = 0;
});
