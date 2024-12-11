"use client";
import { useState } from "react";

const InputBox = ({ type, placeholder, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <input
      type={type}
      placeholder={!focused ? placeholder : ""}
      className='form-control mb-2 p-2 input border-2 border-black w-full text-center'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

export default InputBox;
