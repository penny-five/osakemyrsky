export interface FormatCurrencyOptions {
  numFractionDigits: number;
}

export const formatCurrency = (
  value: number,
  { numFractionDigits = 2 }: FormatCurrencyOptions = { numFractionDigits: 2 }
) => {
  return Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: numFractionDigits,
    maximumFractionDigits: numFractionDigits
  }).format(value);
};

export const formatCents = (cents: number | null, options?: FormatCurrencyOptions) => {
  return cents != null ? formatCurrency(cents / 100, options) : "- €";
};
