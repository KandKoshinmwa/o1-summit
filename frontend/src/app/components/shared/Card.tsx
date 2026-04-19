import { ReactNode } from 'react';

interface CardProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  padding?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

export default function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
}: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-[#E9EDF5]',
    success: 'bg-[#D1FAE5] border border-[#10B981]',
    warning: 'bg-[#FEF3C7] border-2 border-[#F59E0B]',
    error: 'bg-[#FEE2E2] border-2 border-[#B3261E]',
    info: 'bg-[#E0E7FF] border border-[#6A7FDB]',
  };

  const paddingStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div className={`rounded-xl ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}
