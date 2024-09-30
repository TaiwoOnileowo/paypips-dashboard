import React from "react";
import logo from "@/assets/images/logo.png";
import { footer } from "@/lib/data/websitedata";
import { BsInstagram } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import Button from "./Button";
import Image from "next/image";
const Footer = () => {
  return (
    <section
      id="footer"
      className={`${
        window.innerWidth > 1020 ? "footer-border" : null
      } relative shadow_footer_yellow bg-primary-gradient  text-white w-full overflow-y-hidden py-8 flex pt-24 flex-col items-center gap-12 xsm:gap-24 justify-between`}
    >
      <div className="blur absolute z-[0] w-[60%]  h-[60%]  top-[80%] rounded-[50%] opacity-40 bg-shining-gradient" />

      <div className="flex flex-col items-center w-full justify-center">
        <Image src={logo} alt="" className="w-20 h-20" />

        <p className="pt-6 xs:w-[300px] text-center">
          Transform your Forex Telegram Community Management
        </p>
        <Button text="Get Started" />
      </div>
      <div className="flex justify-between xsm:flex-row flex-col-reverse gap-6 items-center text-white w-full px-16">
        <ul className="hidden ss:flex gap-[6px] xs:gap-6 mt-4 xsm:mt-0">
          {footer.map((item) => (
            <li
              key={item.id}
              className="hover:text-blue-accent z-[10] xs:text-base text-xs transition-all  duration-300 cursor-pointer"
            >
              <a href={item.link}>{item.text}</a>
            </li>
          ))}
        </ul>
        <div className="flex gap-6">
          <BsInstagram className="xs:text-2xl text-base hover:text-blue-accent z-[10] transition-all duration-300 cursor-pointer" />
          <FaTwitter className="xs:text-2xl text-base hover:text-blue-accent z-[10] transition-all duration-300 cursor-pointer" />
          <FaTelegramPlane className="xs:text-2xl text-base hover:text-blue-accent z-[10] transition-all duration-300 cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default Footer;
