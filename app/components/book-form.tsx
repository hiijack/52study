'use client';

import { useActionState } from 'react';
import { addBook, updateBook } from '../lib/actions';

const BookForm = ({ initValues = {}, onSuccess }: { initValues?: any; onSuccess?: () => void }) => {
  async function submitBookForm(prevState, formData) {
    try {
      // console.log(formData);
      const id = formData.get('id');
      const name = formData.get('name');
      const _tag = formData.get('tag');
      const description = formData.get('description');
      const download_url = formData.get('download_url');
      const date = new Date().toISOString().split('T')[0];
      const tag = `{${_tag}}`;
      const data = { id, name, description, download_url, tag, date };
      if (!id) {
        await addBook(data);
      } else {
        await updateBook(data);
      }
      onSuccess();
    } catch (error) {
      console.error('add book error: ', error);
      return `出错了，${error.message}`;
    }
  }

  const [errorMsg, formAction, isPending] = useActionState(submitBookForm, undefined);

  return (
    <form id="book-form" className="mt-4" action={formAction}>
      <div className="flex gap-4 mb-4">
        <label htmlFor="name" className="text-sm font-medium py-2 text-black dark:text-white">
          名字
        </label>
        <div className="relative rounded-md flex-auto">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="填写名字"
              className="peer w-full rounded-md border border-gray-200 py-2 px-3 text-sm text-gray-600 placeholder:text-gray-400 dark:bg-white/5 dark:border-0 dark:focus:outline dark:focus:outline-blue-500 dark:text-gray-200"
              defaultValue={initValues.name}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <label htmlFor="tag" className="text-sm font-medium py-2 text-black dark:text-white">
          标签
        </label>
        <div className="relative rounded-md flex-auto">
          <div className="relative">
            <input
              id="tag"
              name="tag"
              type="text"
              placeholder="填写标签"
              className="peer w-full rounded-md border border-gray-200 py-2 px-3 text-sm text-gray-600 placeholder:text-gray-400 dark:bg-white/5 dark:border-0 dark:focus:outline dark:focus:outline-blue-500 dark:text-gray-200"
              defaultValue={initValues.tag}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <label htmlFor="download_url" className="text-sm font-medium py-2 text-black dark:text-white">
          链接
        </label>
        <div className="relative rounded-md flex-auto">
          <div className="relative">
            <input
              id="download_url"
              name="download_url"
              type="text"
              placeholder="填写链接"
              className="peer w-full rounded-md border border-gray-200 py-2 px-3 text-sm text-gray-600 placeholder:text-gray-400 dark:bg-white/5 dark:border-0 dark:focus:outline dark:focus:outline-blue-500 dark:text-gray-200"
              defaultValue={initValues.download_url}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <label htmlFor="description" className="text-sm font-medium py-2 text-black dark:text-white">
          简介
        </label>
        <div className="relative rounded-md flex-auto">
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={8}
              placeholder="填写简介"
              className="peer w-full rounded-md border border-gray-200 py-2 px-3 text-sm text-gray-600 placeholder:text-gray-400 dark:bg-white/5 dark:text-gray-200 dark:border-0 dark:focus:outline dark:focus:outline-blue-500 dark:text-gray-200"
              defaultValue={initValues.description}
              required
            />
          </div>
        </div>
      </div>
      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      <input type="hidden" name="id" defaultValue={initValues.id} />
      <div className="mt-4 text-right">
        <button
          type="submit"
          className="rounded-md text-sm px-4 py-1 bg-blue-500 font-medium text-white aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
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
