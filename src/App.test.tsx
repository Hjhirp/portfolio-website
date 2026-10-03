import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Pipeline } from "./components/notebook/Notebook";
import HomePage from "./pages/HomePage";
import { useReducedMotion } from "framer-motion";
jest.mock("framer-motion", () => ({
  ...jest.requireActual("framer-motion"),
  useReducedMotion: jest.fn(() => false),
}));
jest.mock("react-router-dom", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
}), { virtual: true });
test("the portfolio remains readable when CV data is unavailable", () => {
  render(<HomePage cvData={null} loading={false} error="unavailable" />);
  expect(
    screen.getByRole("heading", { name: /Learning is a systems problem/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Testing the contract/ }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "Read project details →" })).toHaveLength(4);
  expect(
    screen.getByRole("link", { name: /Hirparaharshal333@gmail.com/ }),
  ).toHaveAttribute("href", "mailto:Hirparaharshal333@gmail.com");
});
test("pipeline stages expose their explanation to keyboard users", () => {
  render(
    <Pipeline
      title="Test loop"
      stages={[
        { name: "Execute", detail: "Run the experiment." },
        { name: "Observe", detail: "Inspect the evidence." },
      ]}
    />,
  );
  const observe = screen.getByRole("button", { name: /Observe/ });
  fireEvent.focus(observe);
  expect(observe).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText(/Inspect the evidence/)).toBeInTheDocument();
});

test("pipeline loops and hover temporarily overrides it", () => {
  jest.useFakeTimers();
  const { unmount } = render(<Pipeline title="Auto loop" stages={[
    { name: "First", detail: "First description." },
    { name: "Second", detail: "Second description." },
  ]} />);
  act(() => { jest.advanceTimersByTime(5000); });
  expect(screen.getByRole("button", { name: /02 Second/ })).toHaveAttribute("aria-pressed", "true");
  act(() => { jest.advanceTimersByTime(5000); });
  expect(screen.getByRole("button", { name: /01 First/ })).toHaveAttribute("aria-pressed", "true");
  const second = screen.getByRole("button", { name: /02 Second/ });
  fireEvent.mouseEnter(second);
  act(() => { jest.advanceTimersByTime(10000); });
  expect(second).toHaveAttribute("aria-pressed", "true");
  fireEvent.mouseLeave(second);
  act(() => { jest.advanceTimersByTime(5000); });
  expect(screen.getByRole("button", { name: /01 First/ })).toHaveAttribute("aria-pressed", "true");
  unmount();
  jest.useRealTimers();
});

test("reduced motion disables automatic cycling while retaining keyboard selection", () => {
  (useReducedMotion as jest.Mock).mockReturnValue(true);
  jest.useFakeTimers();
  const { unmount } = render(<Pipeline title="Reduced motion" stages={[
    { name: "Start", detail: "Initial stage." },
    { name: "Finish", detail: "Final stage." },
  ]} />);
  act(() => { jest.advanceTimersByTime(15000); });
  expect(screen.getByRole("button", { name: /01 Start/ })).toHaveAttribute("aria-pressed", "true");
  fireEvent.focus(screen.getByRole("button", { name: /02 Finish/ }));
  expect(screen.getByRole("button", { name: /02 Finish/ })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText(/Final stage/)).toBeVisible();
  unmount();
  jest.useRealTimers();
  (useReducedMotion as jest.Mock).mockReturnValue(false);
});
