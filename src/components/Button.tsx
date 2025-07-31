import React from "react";
import Spinner from "./Spinner";

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary";
  size?: "small" | "big";
  isLoading?: boolean;
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  variant = "primary",
  size = "small",
  isLoading = false,
  disabled = false,
}: ButtonProps) {
  const sizeClasses =
    size === "big"
      ? "w-full min-h-[56px] py-2 text-lg"
      : "min-h-12 px-6 py-3 text-base";

  const variantClasses =
    variant === "primary"
      ? "border border-colour-primary bg-transparent text-colour-primary hover:bg-colour-secondary hover:text-white"
      : "bg-colour-secondary text-white hover:bg-transparent hover:text-colour-primary hover:border hover:border-colour-primary";

  const disabledClasses = (disabled || isLoading) 
    ? "opacity-50 cursor-not-allowed pointer-events-none" 
    : "";

  const baseClasses = "focus:outline-none rounded-lg font-medium transition-colors duration-200";

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses}`}
      disabled={disabled || isLoading}
      data-test="button"
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && <Spinner size="sm" color="blue" />}
        <span>{text}</span>
      </div>
    </button>
  );
}
