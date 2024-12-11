"use client";
import React from "react";
import ProfileForm from "./ProfileForm";
import { useSearchParams } from "next/navigation";

const Content = ({ userId, username, currentNote }) => {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id"); // 특정 파라미터 가져오기
  const upload = searchParams.get("upload");

  // console.log(noteId);
  // console.log(notes);
  // console.log(currentNote);

  if (noteId && currentNote) {
    return (
      <div className='w-full'>
        <NoteForm currentNote={currentNote}> </NoteForm>
      </div>
    );
  } else if (upload === "profile") {
    return <div className='w-full'></div>;
  } else {
    return <div></div>;
  }
};

export default Content;
