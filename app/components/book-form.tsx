import { useRef, useState } from 'react';

const BookForm = ({
  initValues = {},
  onSubmit,
}: {
  initValues?: any;
  onSubmit: (props) => Promise<void>;
}) => {
  const formRef = useRef(null);
  const [isPending, setPending] = useState(false);

  return (
    <form id="book-form" className="mt-4" ref={formRef}>
      <div className="flex gap-4 mb-4">
        <label htmlFor="name" className="text-sm font-medium py-2">
          名字
        </label>
        <div className="relative rounded-md flex-auto">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="填写名字"
              className="peer w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              defaultValue={initValues.name}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <label htmlFor="tag" className="text-sm font-medium py-2">
          标签
        </label>
        <div className="relative rounded-md flex-auto">
          <div className="relative">
            <input
              id="tag"
              name="tag"
              type="text"
              placeholder="填写标签"
              className="peer w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              defaultValue={initValues.tag}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <label htmlFor="download_url" className="text-sm font-medium py-2">
          链接
        </label>
        <div className="relative rounded-md flex-auto">
          <div className="relative">
            <input
              id="download_url"
              name="download_url"
              type="text"
              placeholder="填写链接"
              className="peer w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              defaultValue={initValues.download_url}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <label htmlFor="description" className="text-sm font-medium py-2">
          简介
        </label>
        <div className="relative rounded-md flex-auto">
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={8}
              placeholder="填写简介"
              className="peer w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              defaultValue={initValues.description}
              required
            />
          </div>
        </div>
      </div>
      <input type="hidden" name="id" defaultValue={initValues.id} />
      <div className="mt-4 text-right">
        <button
          type="submit"
          className="rounded-md text-sm px-4 py-1 bg-blue-500 font-medium text-white aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          onClick={(e) => {
            setPending(true);
            if (formRef.current.reportValidity()) {
              onSubmit(formRef.current).then(() => {
                setPending(false);
              });
            }
            e.preventDefault();
          }}
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending ? '提交中' : '确定'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
