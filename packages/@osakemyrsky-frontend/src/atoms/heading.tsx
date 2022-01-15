import classNames from "classnames";
import React from "react";

export type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
  level?: HeadingLevel;
}

const Heading = ({ children, className, level = 1, ...props }: HeadingProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const Tag = `h${level}` as keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3">;

  return (
    <Tag
      {...props}
      className={classNames(className, {
        "text-4xl font-bold": level === 1,
        "text-6xl font-bold": level === 2,
        "text-xl font-extrabold": level === 3,
        "text-lg font-extrabold my-4 leading-normal": level === 4
      })}
    >
      {children}
    </Tag>
  );
};

export default Heading;
