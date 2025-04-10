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
  children
}: {
  totalPages: number;
  currentPage: number;
  children: (props) => React.ReactNode;
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
          if (String(page) === '...') position = 'middle';

          const isActive = currentPage === page;

          const cls = clsx('h-7 w-7 text-center text-sm/6 border rounded-sm', {
            'z-10 bg-blue-600 border-blue-600 text-white': isActive,
            'border-gray-500 text-gray-500 hover:bg-gray-100': !isActive && position !== 'middle',
            'text-gray-300': position === 'middle',
          });
          
          return children({ page, position, isActive, cls });
        })}
      </div>
    </div>
  );
}
