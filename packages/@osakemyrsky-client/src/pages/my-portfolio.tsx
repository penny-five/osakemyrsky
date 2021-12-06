import Image from "next/image";

import Panel from "@/atoms/panel";
import PageHeader from "@/components/page-header";
import { useActiveMembership } from "@/providers/active-membership";

const MyPortfolio = () => {
  const { activeMembership } = useActiveMembership();

  return (
    <div className="flex-grow">
      <PageHeader
        title="Oma salkku"
        subtitle={activeMembership?.leagueName ?? ""}
        illustration={
          <Image src="/images/page-header-my-portfolio.svg" alt="illustration" width="225px" height="225px" />
        }
        info={
          <dl className="flex gap-6">
            <div className="flex flex-col">
              <dt className="text-lg text-gray-500 font-semibold">Sijoitus liigassa</dt>
              <dd className="text-4xl font-extrabold">?</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-lg text-gray-500 font-semibold">Salkun arvo</dt>
              <dd className="text-4xl font-extrabold">?</dd>
            </div>
          </dl>
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
