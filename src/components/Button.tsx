import React from "react";

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary";
}

export default function Button({
  text,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "w-full min-h-12 focus:outline-none rounded-lg font-medium transition-colors duration-200";

  const variantStyles =
    variant === "primary"
      ? "border border-colour-primary bg-transparent text-colour-primary hover:bg-colour-secondary hover:text-white"
      : "bg-colour-secondary text-white hover:bg-transparent hover:text-colour-primary hover:border hover:border-colour-primary";

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
      {text}
    </button>
  );
}
