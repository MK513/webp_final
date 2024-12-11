"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchItem = ({ noteId, title, word }) => {
  const router = useRouter();
  const [matchedWord] = useState(word);

  const handleClick = (e) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams();
    newSearchParams.set("id", noteId);
    newSearchParams.set("word", word);
    const newPath = `/note?${newSearchParams.toString()}`;
    router.push(newPath);
  };

  return (
    <li className='rounded-md'>
      <div onClick={handleClick} className='justify-center'>
        <span className='font-semibold'>{title}</span> : Matched '{matchedWord}'
      </div>
    </li>
  );
};

export default SearchItem;
