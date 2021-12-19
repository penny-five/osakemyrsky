import classNames from "classnames";
import React from "react";

import Heading from "./heading";

export interface PanelProps {
  children?: React.ReactNode;
  title?: string;
}

const PanelColumn = ({ children, title }: PanelProps) => {
  return (
    <div
      className={classNames(
        "relative flex-1",
        "before:absolute before:top-0 before:-left-8 before:bottom-0 before:border-l-1 before:border-gray-400",
        "first-of-type:before:border-l-0"
      )}
    >
      {title != null && (
        <div className="flex mb-4">
          <Heading level={3}>{title}</Heading>
        </div>
      )}
      <div className="flex">{children}</div>
    </div>
  );
};

export default PanelColumn;
