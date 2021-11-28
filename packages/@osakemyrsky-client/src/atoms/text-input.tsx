import classNames from "classnames";
import React, { ChangeEventHandler, FunctionComponent } from "react";

export type TextInputProps =
  | {
      maxLength?: number;
      placeholder?: string;
    } & (
      | { type?: "text"; value?: number | string; onChange?: (value: string) => void }
      | { type?: "number"; value?: number; onChange?: (value: number) => void }
    );

const TextInput: FunctionComponent<TextInputProps> = ({ type, value, maxLength, placeholder, onChange }) => {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (onChange) {
      const value = type === "number" ? parseInt(event.target.value, 10) : event.target.value;
      onChange(value as never);
    }
  };

  return (
    <input
      className={classNames({
        "py-3 px-4 font-normal text-base placeholder-gray-500 border-gray-400 bg-gray-100 rounded-lg": true,
        "focus:ring-1 focus:ring-blue-200 transition-colors": true
      })}
      type={type}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onInputChange}
    />
  );
};

TextInput.defaultProps = {
  type: "text",
  onChange: () => {
    // noop
  }
};

export default TextInput;
