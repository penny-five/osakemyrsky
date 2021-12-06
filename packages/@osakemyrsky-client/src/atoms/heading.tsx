import classNames from "classnames";
import React from "react";

export type HeadingLevel = 1 | 2 | 3;

export interface HeadingProps {
  children?: React.ReactNode;
  className?: string;
  level?: HeadingLevel;
}

const Heading = ({ children, className, level = 1 }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={classNames(className, {
        "text-4xl font-bold text-black-100": level === 1,
        "text-6xl font-bold text-black-100": level === 2,
        "text-xl font-extrabold text-black-100": level === 3
      })}
    >
      {children}
    </Tag>
  );
};

export default Heading;
