import { useFont } from "@/components/FontProvider";
import { useState } from "react";

const FontSelector = ({}) => {
  const { font, changeFont } = useFont();
  const [selectedFont, setSelectedFont] = useState(font);

  const fonts = [
    { value: "sans", label: "Sans", style: "font-sans" },
    { value: "mono", label: "Mono", style: "font-mono" },
    { value: "agro", label: "어그로체", style: "font-agro" },
    { value: "chosun", label: "조선 100년체", style: "font-chosun" },
    { value: "logy", label: "페이퍼로지체", style: "font-logy" },
  ];

  const handleSelect = (e) => {
    setSelectedFont(e.target.value);
    changeFont(e.target.value);
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl mb-6 font-semibold'>Font</h1>
      <select
        className='select select-bordered w-full max-w-xs'
        value={selectedFont} 
        onChange={handleSelect}
      >
        {fonts.map((font) => (
          <option
            key={font.value}
            value={font.value}
            className={font.style} // 각 폰트에 고유 스타일 적용
          >
            {font.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
