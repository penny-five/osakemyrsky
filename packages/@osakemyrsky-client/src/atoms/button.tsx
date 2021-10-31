import classNames from "classnames";
import React, { FunctionComponent } from "react";

export enum ButtonPriority {
  PRIMARY = "primary",
  SECONDARY = "secondary"
}

export interface ButtonProps {
  className?: string;
  priority?: ButtonPriority;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  icon?: JSX.Element;
}

const Button: FunctionComponent<ButtonProps> = ({ children, className, priority, type, disabled, icon, onClick }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(className, {
        "flex items-center py-3 px-6 border-1 rounded-md border-transparent font-semibold ": true,
        "focus:ring-2 focus:ring-blue-200": true,
        "pl-4": icon != null,
        "bg-black-100 text-white hover:text-bronze-200": priority === ButtonPriority.PRIMARY && !disabled,
        "bg-white border-black-200 hover:text-bronze-200": priority === ButtonPriority.SECONDARY && !disabled,
        "text-gray-200 bg-gray-100 cursor-not-allowed": priority === ButtonPriority.PRIMARY && disabled,
        "text-gray-200 border-gray-200 cursor-not-allowed": priority === ButtonPriority.SECONDARY && disabled
      })}
    >
      {icon != null && (
        <span className={classNames({ "w-5 h-5 mr-3": true, "text-bronze-200": ButtonPriority.PRIMARY && !disabled })}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

Button.defaultProps = {
  priority: ButtonPriority.PRIMARY,
  disabled: false,
  type: "button",
  onClick: () => {
    /* noop */
  }
};

export default Button;
