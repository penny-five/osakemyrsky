import { ApexOptions } from "apexcharts";
import * as dateFns from "date-fns";
import dynamic from "next/dynamic";
import { FunctionComponent, useRef } from "react";

import { useSize } from "@/hooks/use-size";
import { randomBetween } from "@/utils/numbers";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface StockPriceChartProps {
  values?: { date: string; value: number }[];
}

const StockPriceChart: FunctionComponent<StockPriceChartProps> = ({ values }) => {
  const target = useRef(null);

  const size = useSize(target);

  const series = [
    {
      name: "Kurssi",
      data: values!.map(({ value }) => value)
    }
  ];

  const options: ApexOptions = {
    chart: {
      width: size?.width || "100%",
      fontFamily: "Inter",
      defaultLocale: "fi",
      locales: [require("apexcharts/src/locales/fi.json")],
      toolbar: {
        show: false
      },
      animations: {
        enabled: false
      },
      events: {
        mounted: chart => {
          chart.windowResizeHandler();
        }
      }
    },
    stroke: {
      width: 2,
      colors: ["#407BFF"]
    },
    fill: {
      type: "gradient",
      colors: ["#C5D7FF"],
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.8,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    },
    tooltip: {
      x: {
        show: true
      },
      marker: {
        fillColors: ["#407BFF"]
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: values!.map(value => dateFns.parseISO(value.date).getTime()),
      type: "datetime",
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        formatter: value => `${value.toFixed(2)} €`
      }
    }
  };

  return (
    <div className="flex flex-col items-stretch py-8">
      <Chart type="area" width={size?.width} options={options} series={series} />
    </div>
  );
};

StockPriceChart.defaultProps = {
  values: new Array(100).fill(0).reduce<{ date: string; value: number }[]>((arr, _current, index) => {
    arr.push({
      date: dateFns.format(dateFns.subDays(new Date(), index), "yyyy-MM-dd"),
      value: arr.length > 0 ? arr.at(-1)!.value + randomBetween(-0.5, 0.5) : randomBetween(0, 10)
    });

    return arr;
  }, [])
};

export default StockPriceChart;
