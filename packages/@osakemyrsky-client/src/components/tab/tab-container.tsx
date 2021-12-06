import classNames from "classnames";
import React, { ReactElement, useState } from "react";

import { TabProps } from "./tab";

export interface TabContainerProps {
  children: ReactElement<TabProps>[];
}

const TabContainer = ({ children }: TabContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <ul className="flex" role="tablist">
        {children.map((child, index) => (
          <li
            key={index}
            className={classNames({
              "flex-grow py-4 px-4 font-bold text-center truncate cursor-pointer transition-colors": true,
              "first:rounded-l-md last:rounded-r-md": true,
              "text-white bg-black-100": index === activeTab,
              "text-black-200 bg-gray-300": index !== activeTab
            })}
            onClick={() => setActiveTab(index)}
          >
            {child.props.title}
          </li>
        ))}
      </ul>
      <div>{children.map((child, index) => (index === activeTab ? child : null))}</div>
    </div>
  );
};

export default TabContainer;
