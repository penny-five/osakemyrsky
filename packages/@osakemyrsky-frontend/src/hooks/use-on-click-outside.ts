import { RefObject, useEffect } from "react";

export const useOnClickOutside = (target: RefObject<Element>, onClick: (event: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!target.current || target.current.contains(event.target as Node)) {
        return;
      }
      onClick(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [target, onClick]);
};
