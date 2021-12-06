import classNames from "classnames";
import React, { FunctionComponent, ReactElement, useState } from "react";

import { TabProps } from "./tab";

export interface TabContainerProps {
  disabled?: boolean;
}

const TabContainer: FunctionComponent<TabContainerProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <ul className="flex" role="tablist">
        {(children as ReactElement<TabProps>[]).map((child, index) => (
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
      <div>{(children as ReactElement<TabProps>[]).map((child, index) => (index === activeTab ? child : null))}</div>
    </div>
  );
};

TabContainer.defaultProps = {
  disabled: false
};

export default TabContainer;
