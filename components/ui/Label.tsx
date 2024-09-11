import React from "react";
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}
const Label = ({ text, ...props }: LabelProps) => {
  return <label {...props} className="text-sm text-white font-plus">{text}</label>;
};

export default Label;
