"use client";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { searchNotesByContent } from "@/actions";
import SearchItem from "./SearchItem";
import { usePageTheme } from "@/components/ThemeProvider";

const SearchForm = ({ userId }) => {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [notes, setNotes] = useState(null);
  const pgTheme = usePageTheme();

  const handleWordChange = (e) => {
    const newWord = e.target.value;
    setWord(newWord);
  };

  const handleSearch = async () => {
    const newSearchedNotes = await searchNotesByContent(userId, word);
    setNotes(newSearchedNotes);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={clsx("flex flex-col py-20 items-center w-full", pgTheme)}>
      <label className='input input-bordered flex items-center gap-2 w-96 my-10'>
        <input
          type='text'
          className='grow'
          placeholder='Search'
          value={word}
          onChange={handleWordChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type='button'
          className='hover:bg-gray-200 p-2 rounded-md'
          onClick={handleSearch}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </label>

      <ul
        className={clsx(
          "menu rounded-box w-96",
          notes && notes.length > 0 ? "bg-base-200" : null
        )}
      >
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <SearchItem
              key={note.id}
              noteId={note.id}
              title={note.title}
              word={word}
            ></SearchItem>
          ))
        ) : (
          <div />
        )}
      </ul>
    </div>
  );
};

export default SearchForm;
