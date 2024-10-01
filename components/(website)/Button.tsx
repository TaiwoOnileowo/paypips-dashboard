import React from "react";
import { useModal } from "../ui/AnimatedModal";
import Link from "next/link";
const Button = ({ text = "Get Started" }) => {
  return (
    <Link href="https://t.me/paypips_adminBot" target="_blank">
      {" "}
      <button className="w-[150px] bg-shining-gradient py-2 mt-6 text-white shadow_yellow rounded-full px-4">
        {text}
      </button>
    </Link>
  );
};

export default Button;
