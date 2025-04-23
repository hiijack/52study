'use client';

import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

function Modal({ id, title, description, tag, download_url, open: op }) {
  const [open, setOpen] = useState(op);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-start sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-10 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <DialogTitle as="h3" className="text-base/7 font-medium text-black dark:text-white">
                {title}
              </DialogTitle>
              <div className="flex gap-x-2 mt-2">
                {tag.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-gray-100 dark:bg-white/5 dark:ring-white/20 dark:text-gray-400 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-300 ring-inset"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span>链接：</span>
                  <a
                    className="text-blue-500"
                    href={download_url}
                    target="_blank"
                    onClick={() => {
                      fetch(`/api/download?id=${id}`);
                    }}
                  >
                    {download_url}
                  </a>
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

const info = ({ id, title, description, tag, download_url }) => {
  const fragment = document.createDocumentFragment();
  const root = createRoot(fragment);
  root.render(
    <Modal id={id} title={title} description={description} tag={tag} download_url={download_url} open />
  );
  document.body.appendChild(fragment);
};

export default { info };
