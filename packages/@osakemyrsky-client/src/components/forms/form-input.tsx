import classNames from "classnames";
import React from "react";

export interface FormInputProps {
  children?: React.ReactNode;
  className?: string;
  id: string;
  label: string;
  subLabel?: string;
  error?: unknown;
}

const FormInput = ({ children, className, id, label, subLabel, error = false }: FormInputProps) => {
  return (
    <div className={classNames(className, { "flex flex-col mb-4 last-of-type:mb-0": true })}>
      <label htmlFor={id} className={classNames({ "font-semibold": true, "text-red-200": error })}>
        {label}
      </label>
      {children}
      {subLabel && <span className="text-sm">{subLabel}</span>}
    </div>
  );
};

export default FormInput;
