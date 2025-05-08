import { fetchBook, fetchBookPages } from './lib/data';
import BookList from './components/book-list';
import Footer from './components/footer';
import '@/app/style/page.css';
// shadow-[0_16px_32px_-16px_rgba(0,0,0,.1)]

export default async function Page() {
  const data = await fetchBook('');
  const totalPages = await fetchBookPages('');
  return (
    <>
      <header id="title" className="sticky left-0 top-0 z-1 w-full text-black bg-white dark:text-white border-b border-gray-200 dark:border-white/20 dark:bg-gray-800">
        <div className="max-w-container mx-auto px-8">
          <h1 className="py-4 text-3xl font-bold">The Library</h1>
        </div>
      </header>
      <main>
        <div id="container" className="max-w-container mx-auto px-8">
          <div className="max-w-4xl pb-2">
            <BookList initData={data} totalPages={totalPages} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
