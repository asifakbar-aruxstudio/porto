import { useEffect, useState, useRef } from "react";
import { FiArrowRight, FiDownload, FiCheck, FiUser } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const notifyVisit = async () => {
  try {
    const visitorInfo = {
      page: "Portfolio",
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
    };
    
    await fetch(`${import.meta.env.VITE_API_URL}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visitorInfo),
    });
  } catch {
    // Silent catch - notification failure is non-critical
  }
};

const roles = [
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Specialist",
];

const typingSpeed = 80;
const pauseDuration = 1800;

const Home = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const isDeletingRef = useRef(isDeleting);

  useEffect(() => {
    isDeletingRef.current = isDeleting;
  }, [isDeleting]);

  useEffect(() => {
    setMounted(true);
    notifyVisit();
    setTimeout(() => setShowWelcome(true), 2000);
    setTimeout(() => setShowWelcome(false), 6000);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    // Pause conditions
    if ((!isDeletingRef.current && text === currentRole) || (isDeletingRef.current && text === "")) {
      return;
    }

    const handleTyping = () => {
      setText((prev) => {
        if (isDeletingRef.current) {
          return prev.length > 0 
            ? currentRole.substring(0, prev.length - 1)
            : prev;
        } else {
          return prev.length < currentRole.length
            ? currentRole.substring(0, prev.length + 1)
            : prev;
        }
      });
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (!isDeleting && text === currentRole) {
      const timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timer);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="relative min-h-screen flex items-center py-16 md:py-0">
      {/* Windows-inspired background */}
      <div className="absolute inset-0 bg-mesh opacity-30"></div>
      
      {/* Windows accent orbs */}
      <div className="absolute inset-0 overflow-hidden perspective-1000 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 md:w-48 h-32 md:h-48 bg-gradient-to-br from-windows-blue/30 to-windows-cyan/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 md:w-64 h-40 md:h-64 bg-gradient-to-br from-windows-green/20 to-windows-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-windows-accent/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '5s' }}></div>
      </div>

      <div className={`relative max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            {/* Windows-style status badge */}
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full glass-effect mb-4 md:mb-6 animate-fadeInUp border-l-4 border-l-windows-blue">
              <span className="w-2 h-2 rounded-full bg-windows-green animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
              <span className="text-xs md:text-sm font-medium text-white">Available for freelance work</span>
            </div>

            {/* Hero heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 md:mb-4">
              <span className="block">Hi, I&apos;m</span>
              <span className="block windows-gradient-text text-shadow-glow">Asif Akbar</span>
            </h1>

            {/* Typing animation */}
            <div className="h-10 md:h-12 mb-4 md:mb-6">
              <span className="text-lg md:text-2xl lg:text-3xl font-semibold text-white">
                <span className="windows-gradient-text">{text}</span>
                <span className="inline-block w-[3px] h-6 md:h-8 ml-1 bg-windows-blue animate-pulse shadow-[0_0_10px_rgba(0,120,212,0.8)]"></span>
              </span>
            </div>

            {/* Description */}
            <p className="text-sm md:text-lg text-gray-300 max-w-xl leading-relaxed mb-6 md:mb-8">
              I build scalable, secure, and high-performance web applications
              using modern technologies like React, Node.js, Express, and MongoDB.
              Passionate about clean code and real-world solutions.
            </p>

            {/* CTA Buttons - Windows style */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <button 
                onClick={() => window.openApp?.('projects')}
                className="btn-windows-primary inline-flex items-center justify-center gap-2 group text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
              >
                <span>View Projects</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>

              <a 
                href="/Asif-Ali Full-Stack-Developer.pdf" 
                download 
                className="btn-windows-secondary inline-flex items-center justify-center gap-2 group text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
              >
                <FiDownload className="group-hover:scale-110 transition-transform" />
                <span>Download CV</span>
              </a>

              <a 
                href="https://github.com/asifakbar-aruxstudio" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-windows-secondary inline-flex items-center justify-center gap-2 group text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
              >
                <FaGithub className="group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Stats - Windows style */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="glass-card p-3 md:p-4 rounded-xl text-center hover:scale-105 transition-all duration-300 border-l-2 border-l-windows-blue">
                <div className="text-xl md:text-2xl font-bold windows-gradient-text">15+</div>
                <div className="text-xs text-gray-500">Projects</div>
              </div>
              <div className="glass-card p-3 md:p-4 rounded-xl text-center hover:scale-105 transition-all duration-300 border-l-2 border-l-windows-green">
                <div className="text-xl md:text-2xl font-bold windows-gradient-text">1+</div>
                <div className="text-xs text-gray-500">Years Exp.</div>
              </div>
              <div className="glass-card p-3 md:p-4 rounded-xl text-center hover:scale-105 transition-all duration-300 border-l-2 border-l-windows-accent">
                <div className="text-xl md:text-2xl font-bold windows-gradient-text">100%</div>
                <div className="text-xs text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right content - Hero Image */}
          <div className="hidden lg:block relative order-1 lg:order-2">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-windows-blue/20 to-windows-cyan/20 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Image container - Windows frame style */}
              <div className="relative glass-card rounded-2xl p-2 shadow-3d-glow">
                <div className="relative rounded-xl overflow-hidden bg-gray-900/50 aspect-square flex items-center justify-center">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-windows-blue/10 via-transparent to-windows-cyan/10"></div>
                  <div className="absolute top-4 left-4 right-4 h-8 bg-gray-800/50 rounded-lg flex items-center px-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  {/* Profile placeholder or image */}
                  <div className="mt-8 text-center">
                    <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-windows-blue to-windows-cyan p-1 shadow-3d-glow">
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        {/* <FiUser className="w-20 h-20 text-windows-blue" /> */}
                        <img 
                          src="/Profile.png" 
                          alt="Asif Akbar" 
                          className="w-full h-full object-cover rounded-full opacity-0"                           onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                        />
                      </div>
                    </div>
                    <p className="mt-4 text-white font-semibold">Asif Akbar</p>
                    <p className="text-sm text-gray-400">{text}</p>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-2 border-l-4 border-l-windows-green">
                <div className="flex items-center gap-2">
                  <FiCheck className="text-windows-green" />
                  <span className="text-white text-sm font-medium">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome notification - Windows style */}
      {showWelcome && (
        <div className="fixed top-24 right-6 z-50 animate-fadeInRight">
          <div className="glass-card-dark rounded-xl p-4 shadow-xl shadow-windows-blue/20 border-l-4 border-l-windows-blue">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-windows-green/20 flex items-center justify-center">
                <FiCheck className="text-windows-green" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Welcome!</p>
                <p className="text-gray-400 text-xs">Thanks for visiting my portfolio</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
