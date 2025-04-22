'use client';

export default function PaginationNumber({
  page,
  isActive,
  cls,
  onClick,
}: {
  page: number | string;
  isActive: boolean;
  cls: string;
  onClick: (page: number | string) => void;
}) {
  
  return (
    <div className={`${cls} cursor-pointer`} onClick={isActive ? () => void 0 : () => onClick(page)}>
      {page}
    </div>
  );
}
