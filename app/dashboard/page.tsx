import { Suspense } from 'react';
import Card from '@/app/components/card';
import Table from '@/app/components/table';
import { fetchCardData } from '@/app/lib/data';
import { auth, signOut } from '@/auth';
import Footer from '@/app/components/footer';
import CreateDialog from './components/create-dialog';

export const revalidate = 3600;

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
      <header id="title" className="w-full border-b border-gray-200 text-black dark:border-white/20">
        <div className="max-w-container mx-auto px-8">
          <div className="flex items-center justify-between">
            <h1 className="py-4 text-3xl font-bold dark:text-white">The Library Admin</h1>
            <div className="flex gap-2 items-center">
              <span className='dark:text-gray-400'>{session.user.name}</span>
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
            <Card title="总搜索量" value="-" />
          </div>
          <div className="py-4">
            <CreateDialog />
          </div>
          <div className="flow-root">
            <div className="inline-block min-w-full min-h-100 align-middle">
              <Suspense fallback={<div>loading</div>}>
                <Table currentPage={currentPage} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
