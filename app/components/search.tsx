'use client';

import { SparklesIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Search({ placeholder, onSearch }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    onSearch(text);
    e.preventDefault();
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="relative flex flex-1 items-center rounded-md bg-gray-100 dark:bg-white/5 pl-3 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-400">
        <input
          className="block grow py-1.5 pr-3 pl-6 text-base text-gray-600 dark:text-gray-200 placeholder:text-gray-400 focus:outline-0 sm:text-sm/6"
          placeholder={placeholder}
          onChange={(e) => {
            setText(e.target.value);
          }}
          // defaultValue={searchParams.get('query')?.toString()}
        />
        <SparklesIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
      </div>
      <button type="submit" className="cursor-pointer rounded-md text-sm px-4 bg-blue-500 text-white" onClick={handleSubmit}>
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
