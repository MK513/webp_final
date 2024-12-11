"use client";
import { useState } from "react";
import AddButton from "./AddButton";
import { useTheme } from "@/components/ThemeProvider";
import SidebarItem from "@/components/ui/LeftSidebarItem";
import SearchButton from "@/components/ui/SearchButton";
import ProfileButton from "./ProfileButton";
import HomeButton from "./HomeButton";

const LeftSidebar = ({ userId, username, noteId, notes, profileImage }) => {
  const { theme } = useTheme();
  const [focus, setFocus] = useState(noteId);
  const noteCnt = notes.length;

  const sideStyles = {
    backgroundColor: theme === "dark" ? "#202020" : "#F7F7F5", // 다크/라이트 배경색
    color: theme === "dark" ? "#FFFFFF" : "#1A202C", // 다크/라이트 텍스트 색
    textColor: theme === "dark" ? "#BBBBBB" : "#333333", // 다크/라이트 텍스트 색 (부가적인 색상)
  };

  return (
    <nav style={sideStyles} className='w-60 p-1 flex-shrink-0 min-h-screen'>
      <div className='flex text justify-between text-sm py-1 px-3 h-8 my-1'>
        <ProfileButton
          userId={userId}
          username={username}
          setFocus={setFocus}
          profileImage={profileImage}
        />
        <AddButton
          userId={userId}
          noteCnt={noteCnt}
          setFocus={setFocus}
          form={"button"}
        />
      </div>
      <div>
        <SearchButton focus={focus} setFocus={setFocus} />
        <HomeButton focus={focus} setFocus={setFocus} />
      </div>
      <div className='mt-8'>
        <div className='flex pages-center h-4 px-1 text-xs font-semibold'>
          <p>Private</p>
        </div>
        <div className='relative font-semibold rounded-md'>
          {notes.map((note) => (
            <SidebarItem
              key={note.id}
              userId={userId}
              noteId={note.id}
              title={note.title}
              curFavorite={note.isFavorite}
              focus={focus}
              setFocus={setFocus}
            />
          ))}
          <AddButton
            userId={userId}
            noteCnt={noteCnt}
            setFocus={setFocus}
            form={"page"}
          />
        </div>
      </div>
    </nav>
  );
};

export default LeftSidebar;
