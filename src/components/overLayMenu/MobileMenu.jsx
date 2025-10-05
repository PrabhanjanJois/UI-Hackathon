import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { menuData } from "../../assets/data";

export default function MobileMenu({ isOpen, onClose, theme }) {
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

  // const previousMenuTitle =
  //   menuHistory.length > 0
  //     ? menuData[menuHistory[menuHistory.length - 1]].title
  //     : null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.2,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 },
    },
  };

  const menuVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.8,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const contentVariants = {
    enter: (direction) => ({
      x: direction === "left" ? "100%" : "-100%",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
    }),
    center: {
      x: 0,
      position: "relative",
      transition: {
        x: {
          type: "spring",
          stiffness: 350,
          damping: 30,
        },
      },
    },
    exit: (direction) => ({
      x: direction === "left" ? "-100%" : "100%",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      transition: {
        x: {
          type: "spring",
          stiffness: 350,
          damping: 30,
        },
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 bg-black z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => {
              if (currentMenu === "main") {
                onClose();
              }
            }}
          />

          {/* Menu */}
          <motion.div
            className={`fixed bottom-0 left-4 right-4 rounded-3xl shadow-2xl z-50 mb-4 overflow-hidden ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
            style={{ maxHeight: "85vh" }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            dragMomentum={true}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose();
              }
            }}
            layout
            transition={{
              layout: {
                type: "spring",
                stiffness: 350,
                damping: 30,
              },
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
              <div
                className={`w-12 h-1.5 rounded-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                }`}
              />
            </div>
            {/* Header */}
            {currentMenu !== "main" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
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
                  <ChevronLeft className="w-5 h-5 flex-shrink-0 transition-transform group-hover:-translate-x-1 duration-200" />
                  <span className="font-medium truncate">
                    {/* {previousMenuTitle || "Close"} */}
                    Back
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
              </motion.div>
            )}
            {/* Menu Content */}
            <motion.div
              layout
              className="relative overflow-hidden"
              style={{
                minHeight: "200px",
                maxHeight:
                  currentMenu === "main"
                    ? "calc(85vh - 100px)"
                    : "calc(85vh - 120px)",
              }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                },
              }}
            >
              <AnimatePresence
                initial={false}
                mode="popLayout"
                custom={slideDirection}
              >
                <motion.div
                  key={currentMenu}
                  custom={slideDirection}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="px-4 py-2 will-change-transform"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
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
                                  transition: { duration: 0.2 },
                                }
                              : {}
                          }
                          whileTap={
                            item.hasSubmenu
                              ? {
                                  scale: 0.98,
                                  transition: { duration: 0.1 },
                                }
                              : {}
                          }
                          className={`rounded-xl p-4 mb-2 flex items-center justify-between transition-colors ${
                            theme === "dark"
                              ? "bg-gray-800 hover:bg-gray-750"
                              : "bg-gray-50 hover:bg-gray-100"
                          } ${
                            item.hasSubmenu
                              ? "cursor-pointer"
                              : "cursor-default"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className={`p-2 rounded-lg ${
                                theme === "dark" ? "bg-gray-700" : "bg-white"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 flex-shrink-0 ${
                                  theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`text-sm font-semibold mb-0.5 ${
                                  theme === "dark"
                                    ? "text-white"
                                    : "text-gray-900"
                                }`}
                              >
                                {item.title}
                              </h3>
                              <p
                                className={`text-xs leading-relaxed ${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              >
                                {item.description}
                              </p>
                            </div>
                          </div>
                          {item.hasSubmenu && (
                            <ChevronRight
                              className={`w-5 h-5 flex-shrink-0 ml-2 ${
                                theme === "dark"
                                  ? "text-gray-500"
                                  : "text-gray-400"
                              }`}
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
