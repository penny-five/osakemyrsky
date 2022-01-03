import { useState } from "react";

import { parseJSON } from "@/utils/json";
import { isBrowser } from "@/utils/nextjs";

export const useLocalStorage = <T = string>(
  key: string,
  initialValue?: T
): [T | null | undefined, (value: T | null) => void] => {
  const [value, setValue] = useState<T | null | undefined>(() => {
    if (isBrowser()) {
      const existingValue = localStorage.getItem(key);
      return existingValue != null ? parseJSON<T>(existingValue) : initialValue;
    }

    return initialValue;
  });

  const setter = (value: T | null) => {
    setValue(value);
    if (isBrowser()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [value, setter];
};
