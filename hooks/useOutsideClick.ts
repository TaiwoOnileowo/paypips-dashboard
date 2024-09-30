import { useEffect } from "react";
export const useOutsideClick = (
    ref: React.RefObject<HTMLElement>,
    callback: (event: MouseEvent) => void
  ) => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log("click outside");
        callback(event);
      }
    };
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);
  };