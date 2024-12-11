"use client";
import { createContext, useContext, useState, useEffect } from "react";

// 테마 컨텍스트 생성
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // 기본 테마 설정

  // 테마 변경 함수
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // DaisyUI의 data-theme 속성 설정
    localStorage.setItem("theme", newTheme); // 테마를 localStorage에 저장
  };

  useEffect(() => {
    // 로컬 스토리지에서 저장된 테마를 불러옴
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // 저장된 테마가 없으면 시스템 테마를 사용
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
      document.documentElement.setAttribute("data-theme", systemTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const usePageTheme = () => {
  const { theme } = useContext(ThemeContext);

  if (theme === "dark") {
    return "bg-sbb-400 text-sbt-200";
  } else {
    return null;
  }
};

// 테마 컨텍스트 사용을 위한 커스텀 훅
export const useTheme = () => useContext(ThemeContext);
