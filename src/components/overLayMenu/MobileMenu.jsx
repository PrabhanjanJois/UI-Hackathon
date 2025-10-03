import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { menuData } from "../../assets/data";

export default function MobileMenu({ isOpen, onClose, theme }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [menuHistory, setMenuHistory] = useState([]);
  const [currentMenu, setCurrentMenu] = useState("main");
  const [slideDirection, setSlideDirection] = useState("left");
  const menuRef = useRef(null);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > 150) {
      onClose();
    }
    setDragY(0);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentY = e.clientY;
    const diff = currentY - startY;
    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (dragY > 150) {
      onClose();
    }
    setDragY(0);
  };

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
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, startY, dragY]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentMenu("main");
      setMenuHistory([]);
    }
  }, [isOpen]);

  const menuTransform = isOpen ? `translateY(${dragY}px)` : "translateY(100%)";
  const overlayOpacity = isOpen ? Math.max(0, 0.2 - dragY / 1000) : 0;

  const activeMenu = menuData[currentMenu];
  const previousMenuTitle =
    menuHistory.length > 0
      ? menuData[menuHistory[menuHistory.length - 1]].title
      : null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 pointer-events-none ${
          isOpen ? "pointer-events-auto" : ""
        }`}
        style={{ opacity: overlayOpacity }}
        onClick={onClose}
      />

      <div
        ref={menuRef}
        className={`fixed bottom-0 left-4 right-4 rounded-3xl shadow-2xl z-50 mb-4 ${
          isDragging ? "" : "transition-transform duration-300 ease-out"
        } ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
        style={{
          maxHeight: "85vh",
          transform: menuTransform,
        }}
      >
        {/* Drag Handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div
            className={`w-12 h-1.5 rounded-full ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        </div>

        {currentMenu !== "main" && (
          <div
            className={`px-4 py-3 relative flex items-center ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            } border-b`}
          >
            <button
              onClick={handleBack}
              className={`flex items-center text-sm transition-colors group flex-shrink-0 z-10 max-w-[35%] pr-2 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1 flex-shrink-0 group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-medium truncate">
                {previousMenuTitle || "Close"}
              </span>
            </button>
            <h2
              className={`absolute left-1/2 transform -translate-x-1/2 text-sm font-semibold max-w-[40%] truncate text-center px-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {activeMenu.title}
            </h2>
            <div className="flex items-center gap-2 ml-auto z-10">
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                  theme === "dark"
                    ? "hover:bg-gray-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div
          className="overflow-hidden"
          style={{
            maxHeight:
              currentMenu === "main"
                ? "calc(85vh - 100px)"
                : "calc(85vh - 120px)",
          }}
        >
          <div
            className={`overflow-y-auto px-4 py-2 transition-all duration-300 ease-out ${
              slideDirection === "left"
                ? "animate-slideInLeft"
                : "animate-slideInRight"
            }`}
            style={{
              maxHeight:
                currentMenu === "main"
                  ? "calc(85vh - 100px)"
                  : "calc(85vh - 120px)",
            }}
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
                  className={`rounded-lg p-3 mb-2 flex items-center justify-between transition-all ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-750"
                      : "bg-white hover:bg-gray-50"
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
