import Chart from "./base/chart";

import { formatCents } from "@/utils/currency";
import { parseDate } from "@/utils/dates";

export interface ValueHistoryChartSeries {
  name: string;
  values: { date: string; value: number }[];
}

export interface ValueHistoryChartOptions {
  currencyFractionDigits?: number;
  yaxis?: {
    min?: number;
    max?: number;
  };
}

export interface ValueHistoryChartProps {
  width?: "auto" | number;
  height?: "auto" | number;
  series: ValueHistoryChartSeries[];
  options?: ValueHistoryChartOptions;
}

/**
 * Chart for rendering historical monetary values, such as
 *
 * - Player portfolio history
 * - Stock price history
 */
const ValueHistoryChart = ({ width, height, series, options }: ValueHistoryChartProps) => {
  const categories = Array.from(
    new Set(series.flatMap(({ values }) => values).map(value => parseDate(value.date).getTime()))
  );

  return (
    <Chart
      type="area"
      width={width}
      height={height}
      options={baseOptions => ({
        ...baseOptions,
        stroke: {
          ...baseOptions.stroke,
          curve: "straight"
        },
        xaxis: {
          ...baseOptions.xaxis,
          type: "datetime",
          categories
        },
        yaxis: {
          ...baseOptions.yaxis,
          min: options?.yaxis?.min,
          max: options?.yaxis?.max,
          forceNiceScale: true,
          labels: {
            formatter: value => formatCents(value, { numFractionDigits: options?.currencyFractionDigits ?? 0 })
          }
        }
      })}
      series={series.map(({ name, values }) => ({ name: name, data: values.map(({ value }) => value) }))}
    />
  );
};

export default ValueHistoryChart;
