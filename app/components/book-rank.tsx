const BookRank = (props) => {
  const { data } = props;
  return (
    <div className="w-full lg:w-50 lg:mt-19">
      <div className="font-semibold text-blue-500">热门书</div>
      <ul className="list-none mt-2">
        {data.map((pb, index) => (
          <li key={pb.id} className="flex items-center py-2" title={pb.name}>
            <span className="inline-block leading-6 text-center text-sm w-6 h-6 rounded-full bg-gray-200 mr-4">
              {index + 1}
            </span>
            <span className="overflow-hidden flex-1 whitespace-nowrap text-ellipsis text-sm text-gray-700 dark:text-gray-400">
              {pb.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookRank;
