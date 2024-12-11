"use client";
import clsx from "clsx";

const FormButton = ({ label }) => {
  return (
    <div className='form-control font-semibold mb-6'>
      <button
        type='submit'
        className={clsx(
          "btn btn-block btn-black w-full p-2 my-4 bg-black text-white border-2"
        )}
      >
        {label}
      </button>
    </div>
  );
};

export default FormButton;
