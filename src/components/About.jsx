import { useEffect, useState } from "react";
import { FiDownload, FiAward, FiCode, FiTarget } from "react-icons/fi";

const About = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { icon: <FiAward />, value: "15+", label: "Projects Completed", color: "from-amber-500 to-orange-500" },
    { icon: <FiCode />, value: "1+", label: "Years Experience", color: "from-purple-500 to-sky-500" },
    { icon: <FiTarget />, value: "100%", label: "Success Rate", color: "from-green-500 to-teal-500" },
    { icon: <FiAward />, value: "MERN", label: "Tech Stack", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="py-8">
      <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-sky-500 to-pink-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-slate-800/50">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                <img src="/blue.png" alt="Asif Akbar" className="w-full h-full object-cover" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-slate-800 border border-gray-700 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <span className="text-2xl">🚀</span>
                  <span className="text-xs text-gray-400 block">Fast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <p className="text-gray-300 leading-relaxed mb-4">
              Full-stack developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js). 
              I craft scalable, secure, and high-performance web applications with clean, maintainable code.
            </p>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              With expertise spanning frontend and backend development, I create seamless user experiences 
              paired with robust server-side logic. Passionate about problem-solving and staying current 
              with modern technologies.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-4 rounded-xl text-center hover:scale-105 transition-all duration-300">
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div className="text-xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href="/Asif-Ali-Full-Stack-Developer.pdf" download className="btn-3d-primary inline-flex items-center gap-2">
              <FiDownload />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;