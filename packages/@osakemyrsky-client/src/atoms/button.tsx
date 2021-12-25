import classNames from "classnames";
import React from "react";

export type ButtonPriority = "primary" | "secondary";

export type ButtonVariant = "default" | "text";

export type ButtonProps = {
  priority?: ButtonPriority;
  variant?: ButtonVariant;
  icon?: JSX.Element;
} & (React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>);

const isButtonProps = (props: ButtonProps): props is React.ButtonHTMLAttributes<HTMLButtonElement> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
  return (props as any).href == null;
};

const Button = ({ children, priority = "primary", variant = "default", icon, ...props }: ButtonProps) => {
  let Tag: "a" | "button";
  let disabled = false;

  if (isButtonProps(props)) {
    Tag = "button";
    disabled = props.disabled ?? false;
  } else {
    Tag = "a";
  }

  return (
    <Tag
      {...(props as React.HtmlHTMLAttributes<unknown>)}
      className={classNames(
        props.className,
        "flex items-center py-4 px-6 font-bold whitespace-nowrap",
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
    </Tag>
  );
};

export default Button;
