import { fetchBook, fetchBookPages } from '@/app/lib/data';
import BookList from '@/components/book-list';
import '@/style/page.css';
import { Suspense } from 'react';
// shadow-[0_16px_32px_-16px_rgba(0,0,0,.1)]

export default async function Page() {
  const data = await fetchBook('');
  const totalPages = await fetchBookPages('');
  return (
    <>
      <header id="title" className="sticky left-0 top-0 z-1 w-full bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-8">
          <h1 className="py-4 text-3xl font-bold">The Library</h1>
        </div>
      </header>
      <main>
        <div id="container" className="max-w-container mx-auto px-8">
          <div className="max-w-4xl mt-4">
            <Suspense fallback={<div>加载中</div>}>
              <BookList initData={data} totalPages={totalPages} />
            </Suspense>
          </div>
        </div>
      </main>
      <footer className="max-w-container mx-auto p-4">
        <p className="text-sm text-center text-gray-400">Powered by LunJZ</p>
      </footer>
    </>
  );
}
