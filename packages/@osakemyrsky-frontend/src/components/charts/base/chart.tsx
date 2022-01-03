import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Props as ReactApexChartsProps } from "react-apexcharts";

import { useSize } from "@/hooks/use-size";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export type ChartOptions = ApexOptions;
export type Series = { name: string; data: number[] };
export type ChartType = ReactApexChartsProps["type"];

export interface ChartProps {
  type: ChartType;
  width?: "auto" | number;
  height?: "auto" | number;
  series: Series[];
  options?: (baseOptions: ChartOptions) => ChartOptions | ChartOptions;
}

/**
 * Expandable base chart for all charts used in the application.
 *
 * Wraps ApexCharts `Chart` component and provides some additional benefits over using
 * the `Chart` component directly:
 *
 * - Implements automatic horizontal scaling to fill the parent container
 * - Sets some sensible defaults, including:
 *    - Finnish default locale
 *    - Font size and color that match the application style
 *    - No animations
 *    - No toolbar
 */
const Chart = ({ width = "auto", height = "auto", type, series, options = baseOptions => baseOptions }: ChartProps) => {
  const target = useRef(null);

  const size = useSize(target);

  const baseOptions: ApexOptions = {
    chart: {
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
        mounted: (chart: { windowResizeHandler: () => void }) => {
          chart.windowResizeHandler();
        }
      }
    },
    stroke: {
      width: 2
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
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <div className="flex flex-col items-stretch">
      <ApexChart
        type={type}
        width={width === "auto" ? size?.width : width}
        height={height === "auto" ? undefined : height}
        options={options(baseOptions)}
        series={series}
      />
    </div>
  );
};

export default Chart;
