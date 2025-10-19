import Card from '@/app/components/card';
import { fetchSearchCardData, fetchSearchTrend, fetchSearchType } from '@/app/lib/data';
import { Suspense, lazy } from 'react';

export const revalidate = 3600;

const SearchTrend = lazy(() => import('@/app/components/search-trend'));
const SearchType = lazy(() => import('@/app/components/search-type'));

export default async function SearchInspect() {
  const cardData = await fetchSearchCardData();
  const types = await fetchSearchType();
  const trends = await fetchSearchTrend();
  return (
    <div className="max-w-container mx-auto">
      <div className="grid gap-6 grid-cols-5">
        <Card title="AI搜索量" value={cardData.total_search} />
        <Card title="热词量" value={cardData.search_type} />
        <Card title="热门查询" value={cardData.popular_search} />
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
