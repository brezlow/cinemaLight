import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "icon";
}

const Button: React.FC<ButtonProps> = ({ variant = "default", size = "default", className, ...props }) => {
  return (
    <button
      className={clsx(
        "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition",
        // Variant styles
        variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "ghost" && "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
        variant === "outline" &&
          "border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
        // Size styles
        size === "default" && "px-4 py-2",
        size === "icon" && "p-2",
        className
      )}
      {...props}
    />
  );
};

export { Button };