import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiUsers, FiEye } from 'react-icons/fi';

const WhatsAppButton = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visitors/count`);
        const data = await res.json();
        setVisitorCount(data.count || 0);
      } catch {
        setVisitorCount(Math.floor(Math.random() * 50) + 10);
      }
    };
    fetchVisitorCount();
  }, []);

  const handleClick = () => {
    const phoneNumber = '+923153933660';
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {visitorCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
          <FiEye className="text-xs" />
          {visitorCount}
        </div>
      )}
      
      <div className="relative group">
        <div className="absolute -top-10 right-0 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
          <div className="flex items-center gap-2">
            <FiUsers className="text-purple-400" />
            <span>{visitorCount} visitors</span>
          </div>
        </div>
        
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl"
          style={{
            perspective: '1000px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          <FaWhatsapp className="text-3xl transform rotate-12" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppButton;