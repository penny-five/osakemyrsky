import { FunctionComponent, ReactNode } from "react";

import Heading from "src/atoms/heading";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  illustration: ReactNode;
  info?: ReactNode;
  actions?: ReactNode;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ title, subtitle, illustration, info, actions }) => {
  return (
    <div className="flex items-center py-2 pl-4 pr-10">
      <div className="flex items-center justify-center w-[275px] h-[275px]">{illustration}</div>
      <div className="flex flex-col flex-grow ml-8">
        <Heading level={2}>{title}</Heading>
        {subtitle != null && <span className="font-bold text-lg text-blue-200">{subtitle}</span>}
        {info != null && <div className="my-4">{info}</div>}
      </div>
      <div className="flex self-start mt-10 ml-8">{actions != null && actions}</div>
    </div>
  );
};

export default PageHeader;
