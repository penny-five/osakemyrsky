import useResizeObserver from "@react-hook/resize-observer";
import { RefObject, useState, useLayoutEffect } from "react";

export const useSize = (target: RefObject<HTMLElement>) => {
  const [size, setSize] = useState<DOMRect>();

  useLayoutEffect(() => {
    setSize(target.current?.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, entry => setSize(entry.contentRect));

  return size;
};
