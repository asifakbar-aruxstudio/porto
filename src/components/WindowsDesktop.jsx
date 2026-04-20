import { useState, useEffect, useCallback, useRef } from "react";
import { FiX, FiMinus, FiMaximize, FiHome, FiUser, FiBriefcase, FiMail, FiFileText, FiExternalLink } from "react-icons/fi";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import Home from "./Home";
import About from "./About";
import Skills from "./Skills";
import Services from "./Services";
import Projects from "./Projects";
import Contact from "./Contact";

const apps = [
  {
    id: "home",
    title: "Home",
    icon: "🏠",
    component: Home,
    color: "from-blue-500 to-cyan-500",
    description: "Welcome to my portfolio"
  },
  {
    id: "about",
    title: "About",
    icon: "👤",
    component: About,
    color: "from-purple-500 to-pink-500",
    description: "Learn more about me"
  },
  {
    id: "skills",
    title: "Skills",
    icon: "📁",
    component: Skills,
    color: "from-amber-500 to-orange-500",
    description: "My technical skills"
  },
  {
    id: "services",
    title: "Services",
    icon: "⚙️",
    component: Services,
    color: "from-indigo-500 to-purple-500",
    description: "Services I provide"
  },
  {
    id: "projects",
    title: "Projects",
    icon: "💼",
    component: Projects,
    color: "from-emerald-500 to-teal-500",
    description: "My work portfolio"
  },
  {
    id: "contact",
    title: "Contact",
    icon: "✉️",
    component: Contact,
    color: "from-rose-500 to-red-500",
    description: "Get in touch"
  },
  {
    id: "resume",
    title: "Resume",
    icon: "📄",
    external: true,
    url: "/Asif-Ali Full-Stack-Developer.pdf",
    color: "from-indigo-500 to-purple-500",
    description: "Download CV"
  }
];

// Draggable Window Component
const DraggableWindow = ({
  app,
  isActive,
  isMinimized,
  isMaximized,
  position,
  size,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange
}) => {
  const windowRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (isMaximized) return;
    if (e.target.closest('button')) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Keep window within viewport with margin
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 60;
      const minX = 10;
      const minY = 10;

      onPositionChange({
        x: Math.max(minX, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onPositionChange]);

  if (isMinimized) return null;

  const WindowComponent = app.component;

  return (
      <div
        ref={windowRef}
        onClick={onFocus}
        className={`absolute flex flex-col rounded-xl shadow-2xl overflow-hidden border transition-all duration-200
          ${isActive ? 'border-white/20 shadow-purple-500/20' : 'border-white/10 opacity-90'}
          ${isMaximized ? '!rounded-none' : ''}`}
        style={{
          ...(isMaximized
            ? { top: 0, left: 0, right: 0, bottom: '3rem' }
            : {
                left: position.x,
                top: position.y,
                width: size.w,
                height: size.h
              }
          ),
          zIndex: isActive ? 9999 : 1,
        }}
      >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className={`h-9 flex items-center justify-between px-3 cursor-move bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl
          ${isActive ? 'shadow-lg' : ''}`}
      >
        {/* App Icon & Title */}
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded bg-gradient-to-br ${app.color} flex items-center justify-center`}>
            <span className="text-xs text-white">{app.icon}</span>
          </div>
          <span className="text-sm font-medium text-white drop-shadow-sm">{app.title}</span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-7 h-6 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <FiMinus className="text-xs" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-7 h-6 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <FiMaximize className="text-xs" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-7 h-6 flex items-center justify-center rounded hover:bg-red-500 text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="text-xs" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden bg-slate-900/95 backdrop-blur-xl">
        <div className="h-full overflow-y-auto">
          {app.external ? (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-xl`}>
                  <span className="text-4xl">{app.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{app.title}</h2>
                <p className="text-gray-400 mb-6">{app.description}</p>
                <a
                  href={app.url}
                  download={app.id === "resume"}
                  target={app.id === "resume" ? "_blank" : undefined}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-3d-primary"
                >
                  <FiExternalLink className="text-sm" />
                  {app.id === "resume" ? "Download CV" : "Open"}
                </a>
              </div>
            </div>
          ) : (
            <WindowComponent />
          )}
        </div>
      </div>
    </div>
  );
};

// Main Desktop Component
const WindowsDesktop = () => {
  // Initial windows - Home starts open
  const [windows, setWindows] = useState([
    { id: "home", isOpen: true, isMinimized: false, isMaximized: false, zIndex: 100, position: { x: 120, y: 80 }, size: { w: 900, h: 650 } }
  ]);
  const [activeWindowId, setActiveWindowId] = useState("home");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClick = () => setStartMenuOpen(false);
    if (startMenuOpen) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [startMenuOpen]);

  // Window management functions
  const openWindow = useCallback((appId) => {
    setWindows(prev => {
      const exists = prev.find(w => w.id === appId);
      if (exists) {
        return prev.map(w => w.id === appId 
          ? { ...w, isMinimized: false, zIndex: Math.max(...prev.map(p => p.zIndex)) + 1 }
          : w
        );
      }
      return [...prev, {
        id: appId,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: Math.max(...prev.map(p => p.zIndex), 0) + 1,
        position: { x: 100 + prev.length * 30, y: 50 + prev.length * 30 },
        size: { w: 1000, h: 700 }
      }];
    });
    setStartMenuOpen(false);
  }, []);

  // Expose openApp globally for child components
  useEffect(() => {
    window.openApp = openWindow;
    return () => { delete window.openApp; };
  }, [openWindow]);

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const bringToFront = useCallback((id) => {
    const maxZ = Math.max(...windows.map(w => w.zIndex));
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w));
    setActiveWindowId(id);
  }, [windows]);

  const updateWindowPosition = useCallback((id, position) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position } : w));
  }, []);

  const visibleWindows = windows.filter(w => w.isOpen);

  return (
    <div className="relative w-full h-screen overflow-hidden select-none"
         style={{
           backgroundImage: `url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      {/* Desktop Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-slate-900/70"></div>

      {/* Windows */}
      {windows.map(win => {
        const app = apps.find(a => a.id === win.id);
        if (!app || !win.isOpen) return null;

        return (
          <DraggableWindow
            key={win.id}
            app={app}
            isActive={activeWindowId === win.id}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            position={win.position}
            size={win.size}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onFocus={() => bringToFront(win.id)}
            onPositionChange={(pos) => updateWindowPosition(win.id, pos)}
          />
        );
      })}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 z-[99999]">
        {/* Taskbar Background */}
        <div className="h-12 bg-gradient-to-t from-slate-900/95 via-slate-800/90 to-slate-700/80 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="h-full max-w-screen-lg mx-auto px-4 flex items-center justify-between">
            {/* Start Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setStartMenuOpen(!startMenuOpen);
              }}
              className={`flex items-center gap-2 px-4 h-9 rounded-lg transition-all duration-200
                ${startMenuOpen ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-105' : 'hover:bg-white/10'}`}
            >
              <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <span className="text-xs text-white">win</span>
              </div>
              <span className="text-sm font-medium text-white">Start</span>
            </button>

            {/* Taskbar Apps */}
            <div className="flex items-center gap-2">
              {visibleWindows.map(win => {
                const app = apps.find(a => a.id === win.id);
                if (!app) return null;
                return (
                  <button
                    key={win.id}
                    onClick={() => {
                      if (win.isMinimized) {
                        setWindows(prev => prev.map(w => w.id === win.id ? { ...w, isMinimized: false } : w));
                        bringToFront(win.id);
                      } else if (activeWindowId === win.id && !win.isMinimized) {
                        minimizeWindow(win.id);
                      } else {
                        bringToFront(win.id);
                      }
                    }}
                    className={`flex items-center gap-2 px-4 h-9 rounded-lg transition-all duration-200 group
                      ${activeWindowId === win.id && !win.isMinimized
                        ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-500/30'
                        : 'hover:bg-white/5'}`}
                  >
                    <span className={`text-sm ${activeWindowId === win.id && !win.isMinimized ? 'text-purple-400' : 'text-gray-400 group-hover:text-white'}`}>
                      {app.icon}
                    </span>
                    <span className="text-sm text-gray-300">{app.title}</span>
                  </button>
                );
              })}
            </div>

            {/* System Tray */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Volume */}
              <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors" title="Volume">
                <span className="text-xs md:text-sm">🔊</span>
              </button>

              {/* Network */}
              <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors" title="Network">
                <span className="text-xs md:text-sm">📶</span>
              </button>

              {/* Battery */}
              <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-green-400 hover:text-white transition-colors" title="Battery">
                <span className="text-xs md:text-sm">🔋</span>
              </button>

              {/* Environment/Weather */}
              <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-blue-400 hover:text-white transition-colors" title="Weather">
                <span className="text-xs md:text-sm">🌤️</span>
              </button>

              {/* Settings */}
              <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors" title="Settings">
                <span className="text-xs md:text-sm">⚙️</span>
              </button>

              {/* Zoom */}
              <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors" title="Zoom">
                <span className="text-xs md:text-sm">🔍</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => {
                  const phoneNumber = '+923153933660';
                  window.open(`https://wa.me/${phoneNumber}`, '_blank');
                }}
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-green-400 hover:text-green-300 transition-colors"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp className="text-base md:text-lg" />
              </button>

              {/* GitHub */}
              <button
                onClick={() => {
                  window.open('https://github.com/asifakbar-aruxstudio', '_blank');
                }}
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                title="GitHub - AruxStudio"
              >
                <FaGithub className="text-base md:text-lg" />
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => {
                  window.open('https://linkedin.com/in/asif-akbar-74a972206', '_blank');
                }}
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="text-base md:text-lg" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => {
                  document.documentElement.classList.toggle('dark');
                }}
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                title="Toggle Dark Mode"
              >
                <span className="text-xs md:text-sm">🌙</span>
              </button>

              {/* Clock */}
              <div className="px-2 md:px-3 py-1 rounded-lg bg-white/5 text-right">
                <div className="text-[10px] md:text-xs text-gray-300 leading-tight">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-[9px] md:text-[10px] text-gray-400 hidden md:block">
                  {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Menu */}
        {startMenuOpen && (
          <div className="absolute bottom-14 left-4 z-50 w-80">
            <div className="bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Start Menu Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-2xl text-white">A</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Asif Akbar</h3>
                    <p className="text-xs text-gray-400">Full Stack Developer</p>
                  </div>
                </div>
              </div>

              {/* Apps List */}
              <div className="p-2 max-h-96 overflow-y-auto">
                <p className="text-xs text-gray-500 px-2 py-2">Pinned</p>
                {apps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => openWindow(app.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center`}>
                      <span className="text-lg text-white">{app.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{app.title}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[180px]">{app.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Start Menu Footer */}
              <div className="p-3 border-t border-white/10 flex items-center justify-between">
                <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                  <span className="text-sm">⚙️</span>
                  <span className="text-sm">Settings</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                  <span className="text-sm">💡</span>
                  <span className="text-sm">About</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop click area */}
      <div
        className="absolute inset-0 z-0"
        onClick={() => {
          setStartMenuOpen(false);
        }}
      />
    </div>
  );
};

export default WindowsDesktop;
