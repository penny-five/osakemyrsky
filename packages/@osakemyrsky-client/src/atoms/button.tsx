import classNames from "classnames";
import React from "react";

export type ButtonPriority = "primary" | "secondary";

export type ButtonVariant = "default" | "text";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  priority?: ButtonPriority;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  icon?: JSX.Element;
  form?: string;
}

const Button = ({
  children,
  priority = "primary",
  variant = "default",
  disabled = false,
  type = "button",
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...{ type, ...props }}
      className={classNames(
        props.className,
        "flex items-center py-4 px-6  font-bold whitespace-nowrap",
        "border-1 rounded-lg border-transparent transition-colors focus:ring-2 focus:ring-blue-200",
        {
          "pl-4": icon != null,
          "cursor-not-allowed": disabled,
          "shadow-lg": variant === "default",
          "bg-blue-200 text-white shadow-black-100/10 hover:bg-blue-300":
            variant === "default" && priority === "primary" && !disabled,
          "bg-white border-gray-400 shadow-black-100/5 hover:bg-gray-300 hover:border-gray-500":
            variant === "default" && priority === "secondary" && !disabled,
          "text-gray-200 bg-gray-100": variant === "default" && priority === "primary" && disabled,
          "text-gray-200 border-gray-200": variant === "default" && priority === "secondary" && disabled,
          "text-blue-200 hover:bg-blue-100": variant === "text" && priority === "primary" && !disabled,
          "text-black-100 hover:bg-gray-300": variant === "text" && priority === "secondary" && !disabled,
          "text-gray-500": variant === "text" && disabled
        }
      )}
    >
      {icon != null && (
        <span className={classNames("w-5 h-5 mr-3", { "text-white": priority === "primary" && !disabled })}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
