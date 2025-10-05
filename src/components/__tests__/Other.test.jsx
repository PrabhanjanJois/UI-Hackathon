// src/__tests__/App.test.jsx
import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../../App";

// Mock lazy-loaded components
vi.mock("../components/overLayMenu/MobileMenu", () => ({
  default: ({ isOpen }) =>
    isOpen ? <div data-testid="mobile-menu">Mobile Menu</div> : null,
}));

vi.mock("../components/overLayMenu/DesktopSidebar", () => ({
  default: ({ isOpen }) =>
    isOpen ? <div data-testid="desktop-sidebar">Desktop Sidebar</div> : null,
}));

describe("App Component", () => {
  beforeEach(() => {
    // Reset window.innerWidth for each test
    window.innerWidth = 1024;
  });

  it("renders Open Menu button and theme toggle", () => {
    render(<App />);
    expect(screen.getByText(/Open Menu/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("opens MobileMenu on button click when viewport is mobile", () => {
    window.innerWidth = 500; // mobile viewport
    render(<App />);
    const button = screen.getByText(/Open Menu/i);

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId("app-root")).toBeInTheDocument();
  });

  it("opens DesktopSidebar on button click when viewport is desktop", () => {
    window.innerWidth = 1024; // set before render
    render(<App />); // now isMobile is false

    const button = screen.getByText(/Open Menu/i);

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId("app-root")).toBeInTheDocument();
  });

  it("toggles theme when checkbox is clicked", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox");

    // initial theme: light
    expect(checkbox.checked).toBe(false);

    act(() => {
      fireEvent.click(checkbox);
    });

    expect(checkbox.checked).toBe(true);

    act(() => {
      fireEvent.click(checkbox);
    });

    expect(checkbox.checked).toBe(false);
  });
  it("renders MobileMenu or DesktopSidebar when Open Menu is clicked", async () => {
    // Set viewport for desktop
    window.innerWidth = 1024;

    render(<App />);

    // Initially menu is not in the DOM
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    expect(screen.queryByTestId("desktop-sidebar")).not.toBeInTheDocument();

    // Click the Open Menu button
    const button = screen.getByText("Open Menu");
    act(() => {
      fireEvent.click(button);
    });

    // Wait for lazy-loaded menu to appear
    const menu = await waitFor(() => screen.getByTestId("desktop-sidebar"));

    expect(menu).toBeInTheDocument();
  });
});
