export default function Table({ books }) {
  return (
    <table className="min-w-full text-gray-900 bg-white">
      <thead className="rounded-lg text-left text-sm font-normal bg-gray-100">
        <tr>
          <th scope="col" className="px-3 py-4 font-medium">
            名字
          </th>
          <th scope="col" className="px-3 py-4 font-medium">
            标签
          </th>
          <th scope="col" className="px-3 py-4 font-medium">
            浏览量
          </th>
          <th scope="col" className="px-3 py-4 font-medium">
            下载量
          </th>
          {/* <th scope="col" className="px-3 py-4 font-medium">
            新增时间
          </th>
          <th scope="col" className="px-3 py-4 font-medium">
            Status
          </th> */}
          <th scope="col" className="py-3 py-4 font-medium">
            操作
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {books.map((b) => (
          <tr key={b.id} className="w-full border-b border-gray-200 text-sm last-of-type:border-none">
            <td className="whitespace-nowrap px-3 py-3">{b.name}</td>
            <td className="whitespace-nowrap px-3 py-3">{b.tag.join(',')}</td>
            <td className="whitespace-nowrap px-3 py-3">{b.view_count}</td>
            <td className="whitespace-nowrap px-3 py-3">{b.download_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
