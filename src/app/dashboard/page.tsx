import Card from '@/components/card';
import Table from '@/components/table';
import { Suspense } from 'react';
import CreateDialog from './components/create-dialog';
import { fetchBook, fetchCardData } from '../lib/data';

export default async function Dashboard() {
  const data = await fetchBook('');
  const cardData = await fetchCardData();
  return (
    <main>
      <div className="max-w-container mx-auto px-8">
        <div className="mt-8 grid gap-6 grid-cols-4">
          <Suspense>
            <Card title="总资源" value={cardData.total_record} />
            <Card title="总浏览" value={cardData.total_view} />
            <Card title="总下载" value={cardData.total_download} />
          </Suspense>
        </div>
        <div className="py-4">
          <CreateDialog />
        </div>
        <div className="flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg">
              <Table books={data} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
