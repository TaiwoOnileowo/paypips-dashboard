import React from "react";

const Parent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="rounded-3xl w-full p-5 "
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
      }}
    >
      <div className="flex max-md:flex-col justify-between items-center">
        <h2 className="text-white text-lg font-medium">Withdrawals</h2>
        {/* <div className="max-md:pt-3 flex gap-3 items-center text-white">
          <div className="flex items-center gap-2 rounded-xl border border-lightGray bg-[#0F1535] pl-2">
            <Image src={search} alt="search" width={20} height={20} />
            <input
              type="text"
              className=" px-3 p-2 bg-[#0F1535] rounded-r-xl text-sm text-white ring-0 transition-all  ease-in  outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
          <FilterListRoundedIcon className="cursor-pointer text-white" />
        </div> */}
      </div>
      {children}
    </div>
  );
};

export default Parent;
