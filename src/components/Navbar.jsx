import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiMoon, FiSun, FiDownload, FiHome, FiUser, FiBriefcase, FiMail } from "react-icons/fi";

const sections = [
  { name: "Home", path: "/", icon: <FiHome /> },
  { name: "About", path: "/about", icon: <FiUser /> },
  { name: "Projects", path: "/projects", icon: <FiBriefcase /> },
  { name: "Contact", path: "/contact", icon: <FiMail /> },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-slate-900/90 backdrop-blur-xl shadow-xl shadow-purple-500/10 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <NavLink 
          to="/" 
          className={`flex items-center gap-3 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-sky-500 rounded-xl blur opacity-40"></div>
          </div>
          <span className="font-bold text-xl text-white">
            Asif<span className="text-purple-500">Akbar</span>
          </span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-2">
          {sections.map(({ name, path, icon }) => (
            <NavLink
              key={name}
              to={path}
              className={`relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 group ${
                isActive(path)
                  ? "text-white bg-purple-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`text-lg ${isActive(path) ? 'text-purple-400' : 'text-gray-500 group-hover:text-purple-400'}`}>
                  {icon}
                </span>
                {name}
              </span>
              {isActive(path) && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-sky-500/20 animate-pulse"></div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/Asif-Ali Full-Stack-Developer.pdf"
            download
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full btn-3d-primary text-sm"
          >
            <FiDownload className="group-hover:animate-bounce" />
            <span>Resume</span>
          </Link>

          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:scale-110 transition-all duration-300 hover:border-purple-500/30"
          >
            {dark ? <FiSun className="text-amber-400" /> : <FiMoon className="text-purple-400" />}
          </button>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden w-10 h-10 rounded-xl glass-effect flex items-center justify-center text-white hover:scale-110 transition-all"
        >
          <FiMenu className="text-xl" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-slate-800 border-l border-white/10 p-6 animate-fadeInRight">
            <div className="flex items-center justify-between mb-10">
              <span className="font-bold text-xl text-white">
                Asif<span className="text-purple-500">Akbar</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center text-white hover:scale-110 transition-all"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {sections.map(({ name, path, icon }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive(path)
                      ? "bg-gradient-to-r from-purple-500/20 to-sky-500/20 text-white border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-lg text-purple-400">{icon}</span>
                  {name}
                </NavLink>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/10 dark:border-white/5">
              <Link
                to="/Asif-Ali Full-Stack-Developer.pdf"
                download
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl btn-3d-primary text-sm"
              >
                <FiDownload />
                Download Resume
              </Link>

              <button
                onClick={() => setDark(!dark)}
                className="flex items-center justify-center gap-2 w-full mt-4 py-4 rounded-xl glass-effect-dark hover:scale-105 transition-all"
              >
                {dark ? <FiSun className="text-amber-400" /> : <FiMoon className="text-purple-400" />}
                {dark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;