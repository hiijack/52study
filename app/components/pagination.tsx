import clsx from 'clsx';

const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export default function Pagination({
  totalPages,
  currentPage,
  children,
}: {
  totalPages: number;
  currentPage: number;
  children: (props) => React.ReactNode;
}) {
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex py-2">
      <div className="flex -space-x-px gap-3">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (String(page) === '...') position = 'middle';

          const isActive = currentPage === page;

          const cls = clsx('h-7 w-7 text-center text-sm/6 border rounded-sm', {
            'z-10 bg-blue-500 border-blue-500 text-white': isActive,
            'border-gray-500 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400': !isActive && position !== 'middle',
            'text-gray-300 dark:text-gray-400': position === 'middle',
          });

          return children({ page, isActive, cls });
        })}
      </div>
    </div>
  );
}
