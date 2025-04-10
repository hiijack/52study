'use client';

import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRequest } from 'ahooks';
import Search from '@/components/search';
import Book from '@/components/book';
import Pagination from './pagination';
import PageNumber from './page-number';

export default function BookList({ initData = [], totalPages = 0 }) {
  const {
    data = { data: initData, totalPages },
    run,
    loading,
  } = useRequest((term, page) => fetch(`/api/get-book?term=${term}&page=${page}`).then((res) => res.json()), {
    manual: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSearch = useDebouncedCallback((term: string) => {
    setCurrentPage(1);
    setQuery(term);
    run(term, 1);
  }, 500);

  const handleChange = (page: number) => {
    setCurrentPage(page);
    run(query, page);
  };

  return (
    <div className="mb-10">
      <div className="my-3">
        <Search placeholder="搜索名字、标签" onSearch={handleSearch} />
      </div>
      {loading && (
        <div>
          <i className="loading" />
        </div>
      )}
      <div className="divide-y divide-gray-200">
        {data.data.map((d) => (
          <Book key={d.id} {...d} />
        ))}
        {data.data.length === 0 && <p className="text-center p-8 text-gray-600">暂无相关书籍</p>}
      </div>
      <Pagination totalPages={data.totalPages} currentPage={currentPage}>
        {(props) => <PageNumber key={props.page} onClick={handleChange} {...props} />}
      </Pagination>
    </div>
  );
}
