import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, required, id, className = '', disabled, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="w-full space-y-1.5">
        {/* Nhãn luôn hiển thị (Figma rule: Nhãn luôn hiển thị, không dùng placeholder thay thế) */}
        <div className="flex items-center justify-between">
          <label
            htmlFor={inputId}
            className="text-xs sm:text-sm font-medium text-[#0f172a] block"
          >
            {label} {required && <span className="text-[#dc2626]">*</span>}
          </label>
          {disabled && (
            <span className="text-[11px] text-[#64748b] font-normal">
              Không thể sửa
            </span>
          )}
        </div>

        {/* Ô Input */}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`w-full h-10 sm:h-11 px-3.5 rounded-lg text-sm transition-all outline-none border ${disabled
              ? 'bg-[#f1f5f9] text-[#64748b] border-[#e2e8f0] cursor-not-allowed'
              : error
                ? 'bg-[#ffffff] text-[#0f172a] border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10'
                : 'bg-[#f8fafc] text-[#0f172a] border-[#e2e8f0] focus:bg-white focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/10'
              } placeholder:text-[#94a3b8] ${className}`}
            {...props}
          />
        </div>

        {/* Thông báo lỗi gắn liền với trường */}
        {error && (
          <p className="text-xs text-[#dc2626] flex items-center gap-1 font-medium mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {/* Ghi chú hướng dẫn nhập liệu */}
        {!error && hint && (
          <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

