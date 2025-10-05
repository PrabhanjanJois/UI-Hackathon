import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Home } from "lucide-react";
import { menuData } from "../../assets/data";

export default function DesktopSidebar({ isOpen, onClose, theme }) {
  const [menuHistory, setMenuHistory] = useState(["main"]);
  const breadcrumbRef = React.useRef(null);

  const handleNavigate = (submenu) => {
    setMenuHistory([...menuHistory, submenu]);
  };

  const handleBreadcrumbClick = (index) => {
    setMenuHistory(menuHistory.slice(0, index + 1));
  };

  useEffect(() => {
    if (!isOpen) {
      setMenuHistory(["main"]);
    }
  }, [isOpen]);

  // Auto-scroll breadcrumb to the right
  useEffect(() => {
    if (breadcrumbRef.current) {
      breadcrumbRef.current.scrollLeft = breadcrumbRef.current.scrollWidth;
    }
  }, [menuHistory]);

  const currentMenu = menuHistory[menuHistory.length - 1];
  const activeMenu = menuData[currentMenu];

  const scrollbarStyles = `
    .custom-scroll::-webkit-scrollbar {
      width: 6px;
      height: 4px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: ${theme === "dark" ? "#4B5563" : "#D1D5DB"};
      border-radius: 3px;
    }
    .custom-scroll::-webkit-scrollbar-thumb:hover {
      background: ${theme === "dark" ? "#6B7280" : "#9CA3AF"};
    }
  `;

  const pageVariants = {
    enter: {
      x: "100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 0.4,
      },
    },
    exit: {
      x: -30,
      opacity: 0,
      transition: {
        duration: 0.15,
      },
    },
  };

  // Ripple reveal for menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <style>{scrollbarStyles}</style>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-testid="desktop-sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: isOpen ? 0 : "-100%",
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className={`fixed top-0 left-0 h-full shadow-2xl z-50 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
        style={{ width: "420px" }}
      >
        {/* Header with Breadcrumb */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className={`h-16 px-6 flex items-center gap-3 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          } border-b backdrop-blur-sm bg-opacity-90`}
        >
          {/* Left Section - Home Button */}
          <motion.button
            onClick={() => handleBreadcrumbClick(0)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
              menuHistory.length === 1
                ? theme === "dark"
                  ? "text-white bg-gray-800"
                  : "text-gray-900 bg-gray-100"
                : theme === "dark"
                ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
            title="Home"
          >
            <Home className="w-5 h-5" />
          </motion.button>

          {/* Center Section  */}
          {menuHistory.length > 1 && (
            <div className="flex-1 flex items-center min-w-0">
              <ChevronRight
                className={`w-4 h-4 flex-shrink-0 mr-2 ${
                  theme === "dark" ? "text-gray-600" : "text-gray-400"
                }`}
              />
              <div
                ref={breadcrumbRef}
                className="custom-scroll flex items-center gap-1.5 flex-1 overflow-x-auto overflow-y-hidden py-2"
                style={{ scrollBehavior: "smooth" }}
              >
                {menuHistory.slice(1).map((menu, index) => {
                  const actualIndex = index + 1;
                  const isLast = actualIndex === menuHistory.length - 1;
                  const menuTitle = menuData[menu].title;

                  return (
                    <React.Fragment key={menu + actualIndex}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          !isLast && handleBreadcrumbClick(actualIndex)
                        }
                        className={`text-sm font-medium transition-colors px-2 py-1 rounded whitespace-nowrap ${
                          isLast
                            ? `font-semibold ${
                                theme === "dark"
                                  ? "text-white"
                                  : "text-gray-900"
                              }`
                            : `${
                                theme === "dark"
                                  ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                              }`
                        } ${
                          !isLast ? "cursor-pointer" : "cursor-default"
                        } flex-shrink-0`}
                        title={menuTitle}
                      >
                        {menuTitle}
                      </motion.button>
                      {!isLast && (
                        <ChevronRight
                          className={`w-4 h-4 flex-shrink-0 ${
                            theme === "dark" ? "text-gray-600" : "text-gray-400"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {menuHistory.length === 1 && (
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-base font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Services
              </motion.h2>
            </div>
          )}

          {/* Right Section */}
          <motion.button
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`p-2 rounded-full transition-colors flex-shrink-0 ${
              theme === "dark"
                ? "hover:bg-gray-800 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Content Area*/}
        <div className="h-[calc(100vh-4rem)] overflow-hidden relative">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={currentMenu}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="custom-scroll absolute inset-0 overflow-y-auto px-6 py-6"
            >
              {/* Menu Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {activeMenu.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      onClick={() =>
                        item.hasSubmenu && handleNavigate(item.submenu)
                      }
                      whileHover={
                        item.hasSubmenu
                          ? {
                              scale: 1.02,
                              x: 6,
                              transition: { type: "spring", stiffness: 400 },
                            }
                          : {}
                      }
                      whileTap={
                        item.hasSubmenu
                          ? { scale: 0.97, transition: { duration: 0.1 } }
                          : {}
                      }
                      className={`rounded-2xl p-4 flex items-center justify-between transition-all duration-200 border ${
                        theme === "dark"
                          ? "bg-gradient-to-br from-gray-800 to-gray-850 hover:from-gray-750 hover:to-gray-800 border-gray-700 shadow-lg"
                          : "bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl"
                      } ${
                        item.hasSubmenu ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className={`p-2.5 rounded-xl flex-shrink-0 ${
                            theme === "dark"
                              ? "bg-gradient-to-br from-gray-700 to-gray-600"
                              : "bg-gradient-to-br from-white to-gray-100 shadow-sm"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              theme === "dark"
                                ? "text-gray-200"
                                : "text-gray-700"
                            }`}
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-sm font-semibold mb-1 ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`text-xs leading-relaxed ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {item.hasSubmenu && (
                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ChevronRight
                            className={`w-5 h-5 flex-shrink-0 ml-2 ${
                              theme === "dark"
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
