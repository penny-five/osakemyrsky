import React, { FunctionComponent } from "react";

import Heading from "./heading";

export interface PanelProps {
  title?: string;
}

const Panel: FunctionComponent<PanelProps> = ({ children, title }) => {
  return (
    <div className="p-8 py-6 bg-white border-1 border-gray-300 rounded-lg shadow-md">
      {title != null && (
        <div className="mb-8">
          <Heading level={3}>{title}</Heading>
        </div>
      )}
      {children}
    </div>
  );
};

export default Panel;
