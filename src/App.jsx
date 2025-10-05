import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { Moon, Sun } from "lucide-react";
import "./App.css"; // Include your animations here

const MobileMenu = lazy(() => import("./components/overLayMenu/MobileMenu"));
const DesktopSidebar = lazy(() =>
  import("./components/overLayMenu/DesktopSidebar")
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [theme, setTheme] = useState("light");

  // Memoized toggle functions
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
    []
  );

  // Throttled resize listener
  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMobile(window.innerWidth < 768), 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerClass = `flex h-screen flex-col items-center justify-center ${
    theme === "dark" ? "bg-gray-900" : "bg-gray-50"
  }`;

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-6">
        <div id="root" data-testid="app-root">
          <button
            onClick={toggleMenu}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Open Menu
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Sun
            className={`w-5 h-5 transition-colors duration-300 ${
              theme === "dark" ? "text-gray-400" : "text-yellow-500"
            }`}
          />

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <div
              className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer
                peer-checked:after:translate-x-7 peer-checked:after:border-white
                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:border-gray-300 after:border after:rounded-full
                after:h-6 after:w-6 after:transition-all peer-checked:bg-gray-700"
            ></div>
          </label>

          <Moon
            className={`w-5 h-5 transition-colors duration-300 ${
              theme === "dark" ? "text-blue-400" : "text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* Lazy-loaded Menus */}
      <Suspense fallback={null}>
        {isMobile ? (
          <MobileMenu
            data-testid="mobile-menu"
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : (
          <DesktopSidebar
            data-testid="desktop-sidebar"
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
