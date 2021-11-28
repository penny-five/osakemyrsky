import Image from "next/image";
import { FunctionComponent } from "react";

import Panel from "@/atoms/panel";
import PageHeader from "@/components/page-header";
import { useActiveMembership } from "@/providers/active-membership";

const MyPortfolio: FunctionComponent = () => {
  const { activeMembership } = useActiveMembership();

  return (
    <div className="flex-grow">
      <PageHeader
        title="Oma salkku"
        leagueName={activeMembership?.leagueName ?? ""}
        illustration={
          <Image src="/images/page-header-my-portfolio.svg" alt="illustration" width="200px" height="200px" />
        }
      />
      <div className="flex flex-col gap-10 px-10 pb-8">
        <Panel title="Salkun kehitys"></Panel>
        <Panel title="Omistukset"></Panel>
        <Panel title="Toimeksiannot"></Panel>
      </div>
    </div>
  );
};

export default MyPortfolio;
