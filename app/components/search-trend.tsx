'use client';

import { Line } from '@ant-design/charts';

const SearchTrend = ({ data = [] }) => {
  const config = {
    data,
    height: 350,
    xField: 'date',
    yField: (d) => +d.count,
    shapeField: 'smooth',
    tooltip: {
      title: 'date', // 标题
      items: ['count'],
    },
    style: {
      lineWidth: 2,
    },
  };

  return (
    <div className="flex-1">
      <div className="py-4 text-black dark:text-white">搜索趋势</div>
      <Line {...config} />
    </div>
  );
};

export default SearchTrend;
