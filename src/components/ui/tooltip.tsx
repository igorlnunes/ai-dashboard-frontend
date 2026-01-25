import { ReactNode, useState } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function Tooltip({ 
  text, 
  children, 
  position = 'top',
  delay = 0
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, delay);
    setShowTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
    }
    setVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help"
        title={text}
      >
        {children}
      </div>

      {visible && (
        <div
          className={`
            absolute z-50 px-3 py-2 
            bg-slate-900 dark:bg-slate-100
            text-white dark:text-black 
            text-sm rounded-md whitespace-nowrap
            pointer-events-none
            ${positionClasses[position]}
            animate-in fade-in duration-200
            shadow-lg border border-slate-700 dark:border-slate-300
          `}
        >
          {text}
          {/* Arrow */}
          <div
            className={`
              absolute w-2 h-2 
              bg-slate-900 dark:bg-slate-100
              border border-slate-700 dark:border-slate-300
              rotate-45
              ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' : ''}
              ${position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 mb-0' : ''}
              ${position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' : ''}
              ${position === 'right' ? 'right-full top-1/2 -translate-y-1/2 mr-0' : ''}
            `}
          />
        </div>
      )}
    </div>
  );
}
