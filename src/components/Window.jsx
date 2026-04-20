/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { FiX, FiMinus, FiMaximize } from "react-icons/fi";

const Window = ({
  // eslint-disable-next-line no-unused-vars
  id,
  title,
  icon,
  children,
  isActive,
  isMinimized,
  isMaximized,
  position,
  size,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  color = "from-blue-500 to-cyan-500"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);
  const titleBarRef = useRef(null);

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

      // Keep window within viewport bounds (with some margin)
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 50;
      const minX = 0;
      const minY = 0;

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

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col rounded-xl shadow-2xl overflow-hidden border transition-all duration-200
        ${isActive ? 'border-white/20 shadow-purple-500/20' : 'border-white/10 opacity-90'}
        ${isMaximized ? 'inset-0 rounded-none' : ''}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : size.w,
        height: isMaximized ? '100%' : size.h,
        zIndex: isActive ? 9999 : 1,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        ref={titleBarRef}
        onMouseDown={handleMouseDown}
        className={`h-10 flex items-center justify-between px-3 cursor-move bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl
          ${isActive ? 'shadow-lg' : ''}`}
      >
        {/* App Icon & Title */}
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded bg-gradient-to-br ${color} flex items-center justify-center`}>
            <span className="text-xs text-white">{icon}</span>
          </div>
          <span className="text-sm font-medium text-white drop-shadow-sm">{title}</span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-8 h-7 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <FiMinus className="text-xs" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-8 h-7 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <FiMaximize className="text-xs" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-8 h-7 flex items-center justify-center rounded hover:bg-red-500 text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="text-xs" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden bg-slate-900/95 backdrop-blur-xl">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Window;
