import { Suspense } from 'react';
import Card from '@/app/components/card';
import Table from '@/app/dashboard/components/table';
import { fetchCardData } from '@/app/lib/data';

export const revalidate = 3600;

export default async function Dashboard(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const cardData = await fetchCardData();

  return (
    <div className="max-w-container mx-auto">
      <div className="grid gap-6 grid-cols-5">
        <Card title="总资源" value={cardData.total_record} />
        <Card title="总浏览" value={cardData.total_view} />
        <Card title="总下载" value={cardData.total_download} />
        <Card title="总标签" value={cardData.total_tag} />
      </div>
      <div className="inline-block min-w-full min-h-100 align-middle pt-4">
        <Suspense fallback={<div>loading</div>}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
