import classNames from "classnames";
import React, { FunctionComponent } from "react";

export interface FormInputProps {
  className?: string;
  id: string;
  label: string;
  subLabel?: string;
}

const FormInput: FunctionComponent<FormInputProps> = ({ children, className, id, label, subLabel }) => {
  return (
    <div className={classNames(className, { "flex flex-col mb-4 last-of-type:mb-0": true })}>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {children}
      {subLabel && <span className="text-sm">{subLabel}</span>}
    </div>
  );
};

export default FormInput;
