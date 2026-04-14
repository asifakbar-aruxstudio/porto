import { useEffect, useState } from "react";
import { FiArrowRight, FiDownload, FiCheck } from "react-icons/fi";
import About from "./About";
import Skills from "./Skills";
import Services from "./Services";
import Projects from "./Projects";
import Contact from "./Contact";

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
  } catch (error) {
    console.log("Notification sent silently");
  }
};

const roles = [
  "MERN Stack Developer",
  "Backend Developer (Node.js)",
  "React Frontend Developer",
];

const typingSpeed = 80;
const pauseDuration = 1800;

const Home = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setMounted(true);
    notifyVisit();
    setTimeout(() => setShowWelcome(true), 2000);
    setTimeout(() => setShowWelcome(false), 6000);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const handleTyping = () => {
      setText((prev) => {
        const newText = isDeleting
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1);
        return newText;
      });
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [roleIndex]);

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
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-mesh"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-sky-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6 animate-fadeInUp">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              Available for work
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              Hi, I'm <span className="gradient-text">Asif Akbar</span>
            </h1>

            <div className="h-10 sm:h-12 mb-6">
              <span className="text-2xl sm:text-3xl font-semibold gradient-text">
                {text}
                <span className="inline-block w-[3px] h-8 ml-1 bg-purple-500 animate-pulse"></span>
              </span>
            </div>

            <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              I build scalable, secure, and high-performance web applications
              using modern technologies like React, Node.js, Express, and MongoDB.
              Passionate about clean code and real-world solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#projects" className="btn-primary inline-flex items-center justify-center gap-2">
                View Projects
                <FiArrowRight className="transition-transform" />
              </a>

              <a href="/Asif Akbar.pdf" download className="btn-secondary inline-flex items-center justify-center gap-2">
                <FiDownload />
                Download CV
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1+</div>
                <div className="text-sm text-gray-500">Years Exp.</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-sky-500 to-pink-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-72 sm:w-80 lg:w-96 aspect-square rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="./enhancerImage.png"
                  alt="Asif Akbar"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-slate-800 border border-gray-700 flex flex-col items-center justify-center shadow-xl">
                <span className="text-2xl">M</span>
                <span className="text-xs text-gray-400">MERN</span>
              </div>
              
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-2xl bg-slate-800 border border-gray-700 flex items-center justify-center shadow-xl animate-float">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-sm">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-700 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-purple-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {showWelcome && (
        <div className="fixed top-24 right-6 z-50 animate-fadeInRight">
          <div className="bg-slate-800 border border-purple-500/30 rounded-xl p-4 shadow-xl shadow-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <FiCheck className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Welcome!</p>
                <p className="text-gray-400 text-xs">Thanks for visiting my portfolio</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <About />
      <Skills />
      <Services />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;