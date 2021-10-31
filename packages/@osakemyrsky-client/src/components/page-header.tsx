import { FunctionComponent } from "react";

import Heading from "src/atoms/heading";

export interface PageHeaderProps {
  title: string;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ title }) => {
  return (
    <div className="py-12 px-8 border-gray-200 border-b-1">
      <Heading level={2}>{title}</Heading>
    </div>
  );
};

export default PageHeader;
