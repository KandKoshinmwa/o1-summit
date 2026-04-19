import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  const baseStyles = 'transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[#0B132B] text-white hover:bg-[#1a2240]',
    secondary: 'bg-[#3E5C9A] text-white hover:bg-[#2f4775]',
    tertiary: 'bg-[#6A7FDB] text-white hover:bg-[#5568c7]',
    outline: 'border-2 border-[#0B132B] text-[#0B132B] bg-white hover:bg-[#E9EDF5]',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-[14px] font-medium rounded-lg',
    md: 'px-4 py-3 text-[14px] font-medium rounded-xl',
    lg: 'px-6 py-4 text-[14px] font-medium rounded-xl',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
    >
      {children}
    </button>
  );
}
