'use client';

import { ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  count?: number;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  resolvedTheme?: string;
  className?: string;
}

export const CollapsibleSection = ({
  title,
  count,
  isOpen,
  onToggle,
  children,
  resolvedTheme,
  className = ''
}: CollapsibleSectionProps) => {
  return (
    <div className={`rounded-2xl shadow-lg overflow-hidden ${
      resolvedTheme === "light" 
        ? "border border-gray-300 bg-white shadow-lg text-gray-800" 
        : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
    } ${className}`}>
      <div 
        className="flex justify-between items-center p-6 cursor-pointer hover:bg-opacity-80 transition-colors"
        onClick={onToggle}
      >
        <h2 className="text-xl font-semibold">
          {title} {count !== undefined && `(${count})`}
        </h2>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        {children}
      </div>
    </div>
  );
};