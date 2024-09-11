import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`rounded-2xl placeholder:text-harsh text-xs  border border-white outline-none backdrop-blur-[21px] w-full p-3 focus:ring-2 focus:ring-blue-500 ${className}`}
      style={{
        background:
          "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
      }}
    />
  );
};

export default Input;
