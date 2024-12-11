"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// 폰트 컨텍스트 생성
const FontContext = createContext();

// 사용 가능한 폰트 리스트
const availableFonts = ["sans", "mono", "agro", "chosun", "logy"];

export const FontProvider = ({ children }) => {
  const [font, setFont] = useState(null); // 초기 상태는 null

  // 폰트 변경 함수
  const changeFont = (newFont) => {
    if (availableFonts.includes(newFont)) {
      console.log(`Changing font to: ${newFont}`); // 디버깅 로그 추가
      setFont(newFont);
      document.documentElement.setAttribute("data-font", newFont);
      localStorage.setItem("font", newFont); // 로컬 스토리지 저장
    } else {
      console.error(`Invalid font: ${newFont}`);
    }
  };

  // 컴포넌트가 마운트될 때 로컬 저장소에서 폰트를 불러오기
  useEffect(() => {
    const savedFont = localStorage.getItem("font");
    if (savedFont && availableFonts.includes(savedFont)) {
      setFont(savedFont);
      document.documentElement.setAttribute("data-font", savedFont);
    } else {
      // 기본 폰트 설정
      const defaultFont = "sans";
      setFont(defaultFont);
      document.documentElement.setAttribute("data-font", defaultFont);
    }
  }, []);

  // 로드가 완료되지 않았을 때는 children을 렌더링하지 않음
  if (!font) {
    return null;
  }

  return (
    <FontContext.Provider value={{ font, changeFont }}>
      {children}
    </FontContext.Provider>
  );
};

// 커스텀 훅
export const useFont = () => useContext(FontContext);
