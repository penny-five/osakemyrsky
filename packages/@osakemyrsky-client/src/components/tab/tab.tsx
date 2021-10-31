import React, { FunctionComponent } from "react";

export interface TabProps {
  title: string;
}

const Tab: FunctionComponent<TabProps> = ({ children }) => {
  return (
    <li role="presentation" className="list-none">
      {children}
    </li>
  );
};

export default Tab;
