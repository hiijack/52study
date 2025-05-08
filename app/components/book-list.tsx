'use client';

import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import Search from './search';
import Book from './book';
import Pagination from './pagination';
import PageNumber from './page-number';
import SearchResult from './seach-result';

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
  const [aiSearchResult, setAiSearchResult] = useState([]);
  const [aiSearchLoading, setAiSearchLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSearch = (term: string) => {
    if (term !== '') {
      setAiSearchLoading(true);
      const param = { prompt: term };
      fetch('/api/ai-search', { method: 'POST', body: JSON.stringify(param) })
        .then((res) => res.json())
        .then((res) => {
          setAiSearchLoading(false);
          setAiSearchResult(res.result);
        });
    } else {
      setAiSearchResult([]);
      setCurrentPage(1);
      run('', 1);
    }
  };

  const handleChange = (page: number) => {
    setCurrentPage(page);
    run(query, page);
  };

  return (
    <div className="min-h-100">
      <div className="py-3">
        <Search placeholder="想看些什么书？" onSearch={handleSearch} />
      </div>
      {(loading || aiSearchLoading) && (
        <div className="text-center">
          <i className="loading" />
        </div>
      )}
      {aiSearchResult.length > 0 && <SearchResult data={aiSearchResult} />}
      {aiSearchResult.length === 0 && data.data.length > 0 && (
        <>
          <div className="divide-y divide-gray-200 dark:divide-white/20">
            {data.data.map((d) => (
              <Book key={d.id} {...d} />
            ))}
            {!loading && data.data.length === 0 && (
              <p className="text-center p-8 text-gray-600 dark:text-gray-400">暂无相关书籍</p>
            )}
          </div>
          <Pagination totalPages={data.totalPages} currentPage={currentPage}>
            {(props) => <PageNumber key={props.page} onClick={handleChange} {...props} />}
          </Pagination>
        </>
      )}
    </div>
  );
}
