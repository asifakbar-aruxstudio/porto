import { FiGithub, FiLinkedin, FiTwitter, FiHeart, FiCoffee } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiLinkedin />, href: "https://linkedin.com/in/asif-akbar-74a972206", label: "LinkedIn" },
    { icon: <FiGithub />, href: "https://github.com/asifakbar-aruxstudio", label: "GitHub" },
    { icon: <FiTwitter />, href: "https://twitter.com/asifakbar", label: "Twitter" },
  ];

  return (
    <footer className="relative py-12 bg-slate-800 border-t border-white/5">
      <div className="absolute inset-0 bg-mesh opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl text-white">
                Asif<span className="text-purple-500">Akbar</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Building modern web experiences with passion
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Asif Akbar. All rights reserved.
          </p>
          
          <p className="text-gray-500 text-sm flex items-center gap-2">
            Made with <FiHeart className="text-purple-500 animate-pulse" /> and <FiCoffee className="text-amber-500" />
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </footer>
  );
};

export default Footer;