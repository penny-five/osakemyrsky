export const formatCurrency = (
  value: number,
  { numFractionsDigits = 2 }: { numFractionsDigits?: number } = { numFractionsDigits: 2 }
) => {
  return Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: numFractionsDigits,
    maximumFractionDigits: numFractionsDigits
  }).format(value);
};

export const formatCents = (cents: number | null) => {
  return cents != null ? formatCurrency(cents / 100) : "- €";
};
