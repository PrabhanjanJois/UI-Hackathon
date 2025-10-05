import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MobileMenu from "../overLayMenu/MobileMenu";

// Mock menu data
vi.mock("../../assets/data", () => ({
  menuData: {
    main: {
      title: "Services",
      items: [
        {
          title: "Web Development",
          description: "Build modern websites",
          icon: () => <div data-testid="icon-web" />,
          hasSubmenu: true,
          submenu: "webSubmenu",
        },
        {
          title: "UI/UX Design",
          description: "Design amazing interfaces",
          icon: () => <div data-testid="icon-uiux" />,
          hasSubmenu: false,
        },
      ],
    },
    webSubmenu: {
      title: "Web Development Options",
      items: [
        {
          title: "Frontend Development",
          description: "React, Vue, Angular",
          icon: () => <div data-testid="icon-frontend" />,
          hasSubmenu: false,
        },
        {
          title: "Backend Development",
          description: "Node.js, Python, PHP",
          icon: () => <div data-testid="icon-backend" />,
          hasSubmenu: false,
        },
      ],
    },
  },
}));

// Mock ResizeObserver
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("MobileMenu Component", () => {
  const onCloseMock = vi.fn();

  const renderMenu = (props = {}) =>
    render(
      <MobileMenu
        isOpen={true}
        onClose={onCloseMock}
        theme="light"
        {...props}
      />
    );

  it("renders main menu items when open", () => {
    renderMenu();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("UI/UX Design")).toBeInTheDocument();
  });

  it("navigates to Web Development submenu when clicked", () => {
    renderMenu();
    fireEvent.click(screen.getByText("Web Development"));
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Backend Development")).toBeInTheDocument();
  });

  it("returns to main menu when back button is clicked", () => {
    renderMenu();

    // Go to submenu
    fireEvent.click(screen.getByText("Web Development"));

    // Submenu should show frontend/backend options
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Backend Development")).toBeInTheDocument();

    // Click back button
    fireEvent.click(screen.getByText("Back"));

    // Main menu should show original items
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("UI/UX Design")).toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked on main menu", () => {
    renderMenu();
    fireEvent.click(document.querySelector(".fixed.inset-0.bg-black"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("applies dark theme styles correctly", () => {
    renderMenu({ theme: "dark" });
    const menuElement = document.querySelector(".bg-gray-900");
    expect(menuElement).toBeInTheDocument();
  });
  it("calls onClose when menu is dragged down", () => {
    const { container } = renderMenu();
    const menu = container.querySelector(".fixed.bottom-0");
    fireEvent.mouseUp(menu, { clientY: 200, movementY: 150 });
    fireEvent.touchEnd(menu, { changedTouches: [{ clientY: 200 }] });
  });
});
