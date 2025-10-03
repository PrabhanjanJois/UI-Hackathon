import React, { useState, useEffect } from "react";
import MobileMenu from "./components/overLayMenu/MobileMenu";
import DesktopSidebar from "./components/overLayMenu/DesktopSidebar";
import { Moon, Sun } from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div
      className={`flex h-screen flex-col items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={toggleMenu}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Open Menu
        </button>

        <button
          onClick={toggleTheme}
          className={`px-6 py-3 rounded-lg shadow-lg transition flex items-center gap-2 ${
            theme === "dark"
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-white text-gray-900 hover:bg-gray-100"
          }`}
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-5 h-5" />
              Switch to Light Mode
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              Switch to Dark Mode
            </>
          )}
        </button>
      </div>

      {isMobile ? (
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <DesktopSidebar
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
