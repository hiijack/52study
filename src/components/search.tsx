'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder, onSearch }) {
  // const handleSearch = (term: string) => {
  //   console.log(term);
  // };

  return (
    <div className="relative flex items-center rounded-md bg-gray-100 pl-3 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-400">
      <input
        className="block grow py-1.5 pr-3 pl-6 text-base text-gray-600 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        placeholder={placeholder}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        // defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
    </div>
  );
}
