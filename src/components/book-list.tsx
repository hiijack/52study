'use client';

import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Search from '@/components/search';
import Book from '@/components/book';
import Pagination from './pagination';

export default function BookList({ initData, totalPages }) {
  const [books, setBooks] = useState(initData);
  const [totalPgs, setTotalPgs] = useState(totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentPage]);

  async function queryBook(term: string, page: number) {
    setQuery(term);
    const res = await fetch(`/api/get-book?term=${term}&page=${page}`);
    const resData = await res.json();
    if (resData.code === 0) {
      setBooks(resData.data);
      setTotalPgs(resData.totalPages);
    }
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    setCurrentPage(1);
    queryBook(term, 1);
  }, 300);

  const handleChange = (page: number) => {
    setCurrentPage(page);
    queryBook(query, page);
  };

  return (
    <div className="mb-10">
      <div className="my-3">
        <Search placeholder="搜索名字、标签" onSearch={handleSearch} />
      </div>
      <div className="divide-y divide-gray-200">
        {books.map((d) => (
          <Book key={d.id} {...d} />
        ))}
        {books.length === 0 && <p className="text-center p-8 text-gray-600">暂无相关书籍</p>}
      </div>
      <Pagination totalPages={totalPgs} currentPage={currentPage} onChange={handleChange} />
    </div>
  );
}
