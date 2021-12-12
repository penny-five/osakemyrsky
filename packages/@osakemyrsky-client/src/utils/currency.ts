const formatter = Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR"
});

export const formatCurrency = (value: number) => {
  return formatter.format(value);
};
