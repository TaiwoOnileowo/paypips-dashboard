import { cn } from "@/lib/utils";
import React from "react";

const Button = ({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-[180px] bg-shining-gradient py-2 mt-6 text-white shadow_yellow rounded-full px-4",
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
