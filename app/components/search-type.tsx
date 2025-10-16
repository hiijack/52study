'use client';

import { Column } from '@ant-design/charts';

const SearchType = ({ data = [] }) => {

  const config = {
    data,
    xField: 'type',
    yField: (d) => +d.count,
    height: 350,
    tooltip: {
      title: 'type', // 标题
      items: ['count'],
    },
    axis: {
      y: { tickCount: 4 },
    },
  };
  return (
    <div className="flex-1">
      <div className="py-4 text-black dark:text-white">搜索热词</div>
      <Column {...config} />
    </div>
  );
};

export default SearchType;
