import { ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';
import Detail from './detail';

const Book = (props) => {
  const { id, name, description, view_count, download_count, tag, download_url } = props;
  return (
    <div className="py-4">
      <h2 className="mb-2 text-black dark:text-white">{name}</h2>
      <div className="flex gap-x-2 mb-2">
        {tag.map((t) => (
          <span
            key={t}
            className="rounded-md bg-gray-100 dark:bg-white/5 dark:ring-white/20 dark:text-gray-400 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-300 ring-inset"
          >
            {t}
          </span>
        ))}
      </div>
      <Detail id={id} title={name} description={description} tag={tag} download_url={download_url}>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer">{description}</p>
      </Detail>
      <div className="flex gap-4">
        <span className="flex item-center gap-2" title="浏览量">
          <EyeIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm/4 text-gray-500 dark:text-gray-400">{view_count}</span>
        </span>
        <span className="flex item-center gap-2" title="下载量">
          <ArrowDownTrayIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm/4 text-gray-500 dark:text-gray-400">{download_count}</span>
        </span>
      </div>
    </div>
  );
};

export default Book;
