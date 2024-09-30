import React from "react";
import { useModal } from "../ui/AnimatedModal";
const Button = ({ text = "Get Started" }) => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => {
        setOpen(true);
      }}
      className="w-[150px] bg-shining-gradient py-2 mt-6 text-white shadow_yellow rounded-full px-4"
    >
      {text}
    </button>
  );
};

export default Button;
