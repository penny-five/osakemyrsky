import classNames from "classnames";
import React, { FunctionComponent } from "react";

export type HeadingLevel = 1 | 2 | 3;

export interface HeadingProps {
  level?: HeadingLevel;
}

const Heading: FunctionComponent<HeadingProps> = ({ children, level }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={classNames({
        "text-4xl font-bold text-black-200": level === 1,
        "text-5xl font-bold text-black-200": level === 2,
        "text-xl font-extrabold text-black-200": level === 3
      })}
    >
      {children}
    </Tag>
  );
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
