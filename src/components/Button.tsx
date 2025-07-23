import React from "react";

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary";
  size?: "small" | "big";
}

export default function Button({
  text,
  onClick,
  variant = "primary",
  size = "small",
}: ButtonProps) {
  const sizeClasses =
    size === "big"
      ? "w-full min-h-[56px] py-2 text-lg"
      : "min-h-12 px-6 py-3 text-base";

  const variantClasses =
    variant === "primary"
      ? "border border-colour-primary bg-transparent text-colour-primary hover:bg-colour-secondary hover:text-white"
      : "bg-colour-secondary text-white hover:bg-transparent hover:text-colour-primary hover:border hover:border-colour-primary";

  const baseClasses = "focus:outline-none rounded-lg font-medium transition-colors duration-200";

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${sizeClasses} ${variantClasses}`}
      data-test="button"
    >
      {text}
    </button>
  );
}
