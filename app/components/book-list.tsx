'use client';

import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import Search from './search';
import Book from './book';
import Pagination from './pagination';
import { queryBook } from '../lib/service';

export default function BookList({ initData = [], totalPages = 0 }) {
  const {
    data = { data: initData, message: '', totalPages },
    run,
    loading,
  } = useRequest(queryBook, {
    manual: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSearch = (term: string) => {
    if (term !== '') {
      run(term, 1);
    } else {
      setCurrentPage(1);
      run('', 1);
    }
  };

  // todo
  const handleChange = (page: number) => {
    setCurrentPage(page);
    run(query, page);
  };

  return (
    <div className="min-h-100">
      <div className="py-3">
        <Search placeholder="想看些什么书？" onSearch={handleSearch} />
      </div>
      {loading && (
        <div className="text-center">
          <i className="loading" />
        </div>
      )}
      {data.data.length === 0 && data.message && (
        <div className="text-gray-600 dark:text-gray-400">{data.message}</div>
      )}
      <div className="divide-y divide-gray-200 dark:divide-white/20">
        {data.data.map((d) => (
          <Book key={d.id} {...d} />
        ))}
        {!loading && data.data.length === 0 && !data.message && (
          <p className="text-center p-8 text-gray-600 dark:text-gray-400">暂无相关书籍</p>
        )}
      </div>
      {data.totalPages && (
        <Pagination totalPages={data.totalPages} currentPage={currentPage}>
          {({ cls, isActive, page }) => (
            <div
              key={page}
              className={`${cls} cursor-pointer`}
              onClick={isActive ? () => void 0 : () => handleChange(page)}
            >
              {page}
            </div>
          )}
        </Pagination>
      )}
    </div>
  );
}
