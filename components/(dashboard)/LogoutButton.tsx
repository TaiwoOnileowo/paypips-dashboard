import React from "react";
import Image from "next/image";
import { signOutUser } from "@/lib/actions/user.actions";
import logoutwhite from "@/assets/icons/logout-white.svg";
import logoutblue from "@/assets/icons/logout-blue.svg";
const LogoutButton = () => {
  return (
    <form
      action={signOutUser}
      className="
      items-center
      flex
      flex-col
      gap-1
     mt-1
      w-full
      justify-center"
    >
      <button
        type="submit"
        className={`flex text-white items-center   gap-4  w-full rounded-3xl cursor-pointer  `}
      >
        <span
          className={`rounded-xl bg-harshBlue w-8 h-8 flex items-center justify-center`}
        >
          <Image src={logoutblue} alt="Logout" width={15} height={15} />
        </span>
        <span className="text-white font-plus text-sm font-semibold">
          Log out
        </span>
      </button>
    </form>
  );
};

export default LogoutButton;
