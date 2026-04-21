import { useEffect, useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const Projects = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: 'Hotelify',
      description: 'A modern, responsive real world app Hotelify built using React and Tailwind CSS with smooth animations and a professional design.',
      languages: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB  ','Express.js', 'Rest API'],
      link: 'https://hotelify-cyan.vercel.app/',
      image: 'logo.png',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Help Human Rights Organization',
      description: 'NGO platform with user-friendly features, donation system, and event management for humanitarian work.',
      languages: ['React', 'Tailwind CSS', 'Vercel'],
      link: 'https://project-wine-omega-21.vercel.app/',
      image: 'help.jpg',
      color: 'from-green-400 to-blue-500',
    },
    {
      title: 'NexousTech',
      description: 'Responsive corporate website built with modern HTML, CSS & JavaScript showcasing tech services.',
      languages: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://software-kappa-two.vercel.app/',
      image: 'nex.PNG',
      color: 'from-yellow-400 to-orange-500',
    },
  ];

  return (
    <div className="py-8">
      <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Featured Work
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcasing my best work with modern design and cutting-edge technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl overflow-hidden bg-slate-800/50 border border-white/5 hover:border-purple-500/30 transition-all duration-500 card-hover ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <img 
                  src={project.image.startsWith('http') ? project.image : `/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.languages.map((lang, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <FiExternalLink className="text-sm" />
                    Live Demo
                  </a>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <FiGithub className="text-sm" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;