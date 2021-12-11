import React from "react";

import Heading from "src/atoms/heading";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  illustration: React.ReactNode;
  info?: React.ReactNode;
  actions?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, illustration, info, actions }: PageHeaderProps) => {
  return (
    <div className="flex items-center py-2 pl-4 pr-10">
      <div className="flex items-center justify-center w-[275px] h-[275px]">{illustration}</div>
      <div className="flex flex-col grow ml-8">
        <Heading level={2}>{title}</Heading>
        {subtitle != null && <span className="font-bold text-lg text-blue-200">{subtitle}</span>}
        {info != null && <div className="my-4">{info}</div>}
      </div>
      <div className="flex self-start mt-10 ml-8">{actions != null && actions}</div>
    </div>
  );
};

export default PageHeader;
