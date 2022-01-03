export const capitalize = <T extends string | null>(value: T): T => {
  if (value == null) {
    return value;
  }

  return `${value.at(0)!.toUpperCase()} + ${value.substring(1)}` as T;
};
