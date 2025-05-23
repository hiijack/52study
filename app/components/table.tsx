import Link from 'next/link';
import { fetchBook, fetchBookPages } from '@/app/lib/data';
import Pagination from './pagination';
import UpdateBtn from './update-btn';

export default async function Table({ currentPage }) {
  const data = await fetchBook('', currentPage);
  const totalPages = await fetchBookPages('');

  return (
    <>
      <table className="min-w-full text-gray-900 bg-white dark:bg-gray-800">
        <thead className="rounded-lg text-left text-sm font-normal bg-gray-100 dark:bg-gray-900 dark:text-white">
          <tr>
            <th scope="col" className="px-3 py-3 font-medium">
              名字
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              标签
            </th>
            <th scope="col" className="px-2 py-3 font-medium">
              浏览量
            </th>
            <th scope="col" className="px-2 py-3 font-medium">
              下载量
            </th>
            {/* <th scope="col" className="px-3 py-3 font-medium">
            新增时间
          </th>
          <th scope="col" className="px-3 py-3 font-medium">
            Status
          </th> */}
            <th scope="col" className="px-3 py-3 font-medium">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((b) => (
            <tr key={b.id} className="w-full border-b border-gray-200 text-sm last-of-type:border-none dark:text-gray-400 dark:border-white/20">
              <td className="whitespace-nowrap px-3 py-3">{b.name}</td>
              <td className="whitespace-nowrap px-3 py-3">{b.tag.join(',')}</td>
              <td className="whitespace-nowrap px-2 py-3">{b.view_count}</td>
              <td className="whitespace-nowrap px-2 py-3">{b.download_count}</td>
              <td className="whitespace-nowrap px-3 py-3">
                <UpdateBtn data={b} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={currentPage}>
        {({ page, cls }) => (
          <Link key={page} href={`/dashboard?page=${page}`} className={cls}>
            {page}
          </Link>
        )}
      </Pagination>
    </>
  );
}
