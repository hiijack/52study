'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const links = [
  { name: '图书管理', href: '/dashboard'},
  { name: '搜索分析', href: '/dashboard/inspect'},
];
export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                }
              )}
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
