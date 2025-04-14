import { Suspense } from 'react';
import Card from '@/app/components/card';
import Table from '@/app/components/table';
import { fetchCardData } from '@/app/lib/data';
import CreateDialog from './components/create-dialog';

export default async function Dashboard(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || ''; // todo
  const currentPage = Number(searchParams?.page) || 1;
  const cardData = await fetchCardData();
  return (
    <main>
      <div className="max-w-container mx-auto px-8">
        <div className="mt-8 grid gap-6 grid-cols-4">
          <Card title="总资源" value={cardData.total_record} />
          <Card title="总浏览" value={cardData.total_view} />
          <Card title="总下载" value={cardData.total_download} />
        </div>
        <div className="py-4">
          <CreateDialog />
        </div>
        <div className="flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg">
              <Suspense fallback={<div>loading</div>}>
                <Table currentPage={currentPage} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
