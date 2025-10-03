import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { menuData } from "../../assets/data";

export default function DesktopSidebar({ isOpen, onClose, theme }) {
  const [menuHistory, setMenuHistory] = useState([]);
  const [currentMenu, setCurrentMenu] = useState("main");
  const [slideDirection, setSlideDirection] = useState("left");

  const handleNavigate = (submenu) => {
    setSlideDirection("left");
    setMenuHistory([...menuHistory, currentMenu]);
    setCurrentMenu(submenu);
  };

  const handleBack = () => {
    if (menuHistory.length > 0) {
      setSlideDirection("right");
      const previousMenu = menuHistory[menuHistory.length - 1];
      setMenuHistory(menuHistory.slice(0, -1));
      setCurrentMenu(previousMenu);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentMenu("main");
      setMenuHistory([]);
    }
  }, [isOpen]);

  const activeMenu = menuData[currentMenu];
  const previousMenuTitle =
    menuHistory.length > 0
      ? menuData[menuHistory[menuHistory.length - 1]].title
      : null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-20" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full shadow-2xl z-50 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
        style={{ width: "380px" }}
      >
        <div
          className={`h-16 px-6 flex items-center justify-between ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          } border-b`}
        >
          {currentMenu !== "main" ? (
            <>
              <button
                onClick={handleBack}
                className={`flex items-center text-sm transition-colors group ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                <span className="font-medium truncate max-w-[150px]">
                  {previousMenuTitle || "Back"}
                </span>
              </button>
              <h2
                className={`text-base font-semibold truncate ml-4 flex-1 text-center ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {activeMenu.title}
              </h2>
            </>
          ) : (
            <h2
              className={`text-base font-semibold flex-1 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Services Menu
            </h2>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                theme === "dark"
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="h-[calc(100vh-4rem)] overflow-hidden">
          <div
            className={`h-full overflow-y-auto px-4 py-4 transition-all duration-300 ease-out ${
              slideDirection === "left"
                ? "animate-slideInLeft"
                : "animate-slideInRight"
            }`}
            key={currentMenu}
          >
            {activeMenu.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  onClick={() =>
                    item.hasSubmenu && handleNavigate(item.submenu)
                  }
                  className={`rounded-lg p-4 mb-2 flex items-center justify-between transition-all border ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-750 border-gray-700"
                      : "bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200"
                  } ${item.hasSubmenu ? "cursor-pointer" : "cursor-default"}`}
                  style={{
                    animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-semibold mb-0.5 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronRight
                      className={`w-5 h-5 flex-shrink-0 ml-2 ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
