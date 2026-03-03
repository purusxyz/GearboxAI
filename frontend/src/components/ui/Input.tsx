import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`
        w-full
        h-10
        rounded-full
        border border-gray-300
        bg-white
        px-5
        text-sm
        outline-none
        focus:border-black
        
        transition
        ${className}
      `}
      {...props}
    />
  );
}