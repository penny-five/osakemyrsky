import classNames from "classnames";
import React, { FunctionComponent } from "react";

export interface TextInputProps {
  maxLength?: number;
  placeholder?: string;
  onChange: (value: string) => void;
}

const TextInput: FunctionComponent<TextInputProps> = ({ maxLength, placeholder, onChange }) => {
  return (
    <input
      className={classNames({
        "font-normal text-base placeholder-gray-400 border-black-100 rounded-md": true
      })}
      type="text"
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={event => onChange(event.target.value)}
    />
  );
};

TextInput.defaultProps = {
  onChange: () => {
    // noop
  }
};

export default TextInput;
