'use client';

import clsx from 'clsx';

const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export default function Pagination({
  totalPages,
  currentPage,
  onChange,
}: {
  totalPages: number;
  currentPage: number;
  onChange;
}) {
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <div className="flex -space-x-px gap-3">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page.toString() === '...') position = 'middle';

          const isActive = currentPage === page;

          return (
            <PaginationNumber
              key={page}
              page={page}
              position={position}
              isActive={isActive}
              onClick={isActive ? () => void 0 : () => onChange(page)}
            />
          );
        })}
      </div>
    </div>
  );
}

function PaginationNumber({
  page,
  isActive,
  position,
  onClick,
}: {
  page: number | string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
  onClick: () => void;
}) {
  const className = clsx('h-7 w-7 text-center text-sm/6 border border-gray-500 rounded-sm', {
    'z-10 bg-blue-600 border-blue-600 text-white': isActive,
    'text-gray-500 hover:bg-gray-100': !isActive && position !== 'middle',
    'text-gray-300': position === 'middle',
  });

  return (
    <div className={className} onClick={onClick}>
      {page}
    </div>
  );
}
