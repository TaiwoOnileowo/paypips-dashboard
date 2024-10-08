import React from "react";

const Parent = ({
    children,
}:{
    children: React.ReactNode
}) => {
//   console.log(trxref, reference);
//   if (!trxref || !reference) return null;
  return (
    <div className="absolute top-0 right-0 w-full h-full bg-blue-500/50 z-[100] flex items-center justify-center">
      {children}
    </div>
  );
};

export default Parent;
