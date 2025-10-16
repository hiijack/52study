import Card from '@/app/components/card';
import { fetchCardData, fetchSearchTrend, fetchSearchType } from '@/app/lib/data';
import { Suspense, lazy } from 'react';

export const revalidate = 3600;

const SearchTrend = lazy(() => import('@/app/components/search-trend'));
const SearchType = lazy(() => import('@/app/components/search-type'));

export default async function SearchInspect() {
  const cardData = await fetchCardData();
  const types = await fetchSearchType();
  const trends = await fetchSearchTrend();
  return (
    <div className="max-w-container mx-auto px-8">
      <div className="grid gap-6 grid-cols-5">
        <Card title="总资源" value={cardData.total_record} />
        <Card title="总浏览" value={cardData.total_view} />
        <Card title="总下载" value={cardData.total_download} />
        <Card title="AI搜索量" value={cardData.total_search} />
      </div>
      <div className="flex py-4">
        <Suspense fallback={<div>loading</div>}>
          <SearchType data={types} />
          <SearchTrend data={trends} />
        </Suspense>
      </div>
    </div>
  );
}
