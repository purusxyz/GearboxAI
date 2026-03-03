import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "rounded-full font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-[#0f172a] text-white hover:bg-black",
    secondary:
      "bg-white border border-gray-300 text-black hover:bg-gray-100 shadow-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}