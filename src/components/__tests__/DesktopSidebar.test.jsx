import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DesktopSidebar from "../overLayMenu/DesktopSidebar";

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

describe("DesktopSidebar Component", () => {
  const onCloseMock = vi.fn();

  const renderSidebar = (props = {}) =>
    render(
      <DesktopSidebar
        isOpen={true}
        onClose={onCloseMock}
        theme="light"
        {...props}
      />
    );

  it("renders main menu items when open", () => {
    renderSidebar();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("UI/UX Design")).toBeInTheDocument();
    expect(screen.getByText("Build modern websites")).toBeInTheDocument();
  });

  it("navigates to submenu when item with submenu is clicked", () => {
    renderSidebar();
    fireEvent.click(screen.getByText("Web Development"));

    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Backend Development")).toBeInTheDocument();
  });

  it("updates breadcrumb when navigating to submenu", () => {
    renderSidebar();
    fireEvent.click(screen.getByText("Web Development"));

    // Breadcrumb should have submenu title
    expect(screen.getByText("Web Development Options")).toBeInTheDocument();
  });

  it("clicking breadcrumb navigates back to previous menu", () => {
    renderSidebar();
    fireEvent.click(screen.getByText("Web Development")); // go to submenu

    // Click the Home button to go back to main menu
    fireEvent.click(screen.getByTitle("Home"));
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("UI/UX Design")).toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked", () => {
    renderSidebar();
    fireEvent.click(document.querySelector(".fixed.inset-0.bg-black"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("applies dark theme styles correctly", () => {
    renderSidebar({ theme: "dark" });
    const menuElement = document.querySelector(".bg-gray-900");
    expect(menuElement).toBeInTheDocument();
  });
});
