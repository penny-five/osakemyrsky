import classNames from "classnames";
import React, { FunctionComponent } from "react";

export enum ButtonPriority {
  PRIMARY = "primary",
  SECONDARY = "secondary"
}

export enum ButtonVariant {
  DEFAULT = "default",
  TEXT = "text"
}

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  priority?: ButtonPriority;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  icon?: JSX.Element;
  form?: string;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  priority,
  variant,
  disabled,
  icon,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(className, {
        "flex items-center py-4 px-6  font-bold whitespace-nowrap": true,
        "border-1 rounded-lg border-transparent transition-colors focus:ring-2 focus:ring-blue-200": true,
        "pl-4": icon != null,
        "cursor-not-allowed": disabled,
        "shadow-lg": variant === ButtonVariant.DEFAULT,
        "bg-blue-200 text-white hover:bg-blue-300":
          variant === ButtonVariant.DEFAULT && priority === ButtonPriority.PRIMARY && !disabled,
        "bg-white border-black-200":
          variant === ButtonVariant.DEFAULT && priority === ButtonPriority.SECONDARY && !disabled,
        "text-gray-200 bg-gray-100":
          variant === ButtonVariant.DEFAULT && priority === ButtonPriority.PRIMARY && disabled,
        "text-gray-200 border-gray-200":
          variant === ButtonVariant.DEFAULT && priority === ButtonPriority.SECONDARY && disabled,
        "text-blue-200 hover:bg-blue-100":
          variant === ButtonVariant.TEXT && priority === ButtonPriority.PRIMARY && !disabled,
        "text-black-100 hover:bg-gray-300":
          variant === ButtonVariant.TEXT && priority === ButtonPriority.SECONDARY && !disabled,
        "text-gray-500": variant === ButtonVariant.TEXT && disabled
      })}
    >
      {icon != null && (
        <span className={classNames({ "w-5 h-5 mr-3": true, "text-white": ButtonPriority.PRIMARY && !disabled })}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

Button.defaultProps = {
  priority: ButtonPriority.PRIMARY,
  variant: ButtonVariant.DEFAULT,
  disabled: false,
  type: "button",
  onClick: () => {
    /* noop */
  }
};

export default Button;
