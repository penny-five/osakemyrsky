import { FunctionComponent, ReactNode } from "react";

import Heading from "src/atoms/heading";

export interface PageHeaderProps {
  title: string;
  leagueName: string;
  illustration: ReactNode;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ title, leagueName, illustration }) => {
  return (
    <div className="flex items-center py-2 px-4">
      <div className="flex items-center justify-center w-[250px] h-[250px]">{illustration}</div>
      <div className="flex flex-col ml-8">
        <Heading level={2}>{title}</Heading>
        <span className="font-bold text-lg text-blue-200">{leagueName}</span>
      </div>
    </div>
  );
};

export default PageHeader;
