"use client";
import React, { createContext, useContext, useState } from "react";

// Context 생성
const RightSidebarContext = createContext();

// Provider 컴포넌트
export const RightSidebarProvider = ({ children }) => {
  // comment, music, null 가능
  const [rightSidebarValue, setRightSidebarValue] = useState("");

  return (
    <RightSidebarContext.Provider
      value={{ rightSidebarValue, setRightSidebarValue }}
    >
      {children}
    </RightSidebarContext.Provider>
  );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useRightSidebar = () => useContext(RightSidebarContext);
