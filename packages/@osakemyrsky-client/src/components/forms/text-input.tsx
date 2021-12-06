import classNames from "classnames";
import React from "react";

export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  maxLength?: number;
  type?: "text" | "number";
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({ type, ...props }, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames({
      "py-3 px-4 font-normal text-base placeholder-gray-500 border-gray-400 bg-gray-100 rounded-lg": true,
      "focus:ring-1 focus:ring-blue-200 transition-colors": true
    })}
    type={type}
  />
));

TextInput.displayName = "TextInput";

TextInput.defaultProps = {
  type: "text",
  onChange: () => {
    // noop
  }
};

export default TextInput;
