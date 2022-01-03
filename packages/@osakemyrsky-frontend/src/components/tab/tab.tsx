import React from "react";

export interface TabProps {
  children?: React.ReactNode;
  title: string;
}

const Tab = ({ children }: TabProps) => {
  return (
    <li role="presentation" className="list-none">
      {children}
    </li>
  );
};

export default Tab;
