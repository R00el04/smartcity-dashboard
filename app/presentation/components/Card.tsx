import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, title }) => {
  return (
    <div className={cn(
      "bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md",
      className
    )}>
      {title && (
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-lg font-medium text-gray-800 tracking-tight">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
