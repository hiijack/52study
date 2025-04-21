import { Suspense } from 'react';
import Card from '@/app/components/card';
import Table from '@/app/components/table';
import { fetchCardData } from '@/app/lib/data';
import { auth, signOut } from '@/auth';
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
  const session = await auth();

  return (
    <>
      <header id="title" className="w-full bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-8">
          <div className="flex items-center justify-between">
            <h1 className="py-4 text-3xl font-bold">The Library Admin</h1>
            <div className="flex gap-2 items-center">
              <span>{session.user.name}</span>
              <a
                className="text-sm text-blue-500 cursor-pointer"
                onClick={async () => {
                  'use server';
                  await signOut({ redirectTo: '/login' });
                }}
              >
                登出
              </a>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-container mx-auto px-8">
          <div className="mt-4 grid gap-6 grid-cols-5">
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
      <footer className="max-w-container mx-auto p-4">
        <p className="text-sm text-center text-gray-400">Powered by LunJz</p>
      </footer>
    </>
  );
}
