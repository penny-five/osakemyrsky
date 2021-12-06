import classNames from "classnames";
import React, { FunctionComponent } from "react";

export interface FormInputProps {
  className?: string;
  id: string;
  label: string;
  subLabel?: string;
  error?: unknown;
}

const FormInput: FunctionComponent<FormInputProps> = ({ children, className, id, label, subLabel, error }) => {
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

FormInput.defaultProps = {
  error: false
};

export default FormInput;
