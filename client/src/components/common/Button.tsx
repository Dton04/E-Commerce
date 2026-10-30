import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    // Kích thước chuẩn Design System: Chiều cao 40–44px, vùng chạm >= 44px
    const sizeClasses = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 sm:h-11 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    }[size];

    // Các biến thể màu sắc chuẩn Figma DS
    const variantClasses = {
      primary:
        'bg-[#4338ca] hover:bg-[#3730a3] text-white shadow-xs focus:ring-[#4338ca]',
      secondary:
        'bg-[#eef2ff] hover:bg-[#e0e7ff] text-[#4338ca] focus:ring-[#4338ca]',
      outline:
        'bg-white hover:bg-slate-50 text-[#0f172a] border border-[#e2e8f0] focus:ring-[#4338ca]',
      destructive:
        'bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-xs focus:ring-[#dc2626]',
      ghost:
        'bg-transparent hover:bg-slate-100 text-[#0f172a] focus:ring-[#4338ca]',
    }[variant];

    const disabledClasses = disabled
      ? 'bg-[#e2e8f0] text-[#64748b] border-transparent cursor-not-allowed hover:bg-[#e2e8f0] opacity-70'
      : '';

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center font-semibold rounded-lg transition-all outline-none focus:ring-2 focus:ring-offset-1 select-none ${sizeClasses} ${disabled ? disabledClasses : variantClasses
          } ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

