'use client';

import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

function ConfirmDialog({ title, description, ok, open: op }) {
  const [open, setOpen] = useState(op);

  const handleOk = () => {
    ok().finally(() => {
      setOpen(false);
    })
  };

  return (
    <Dialog open={open} onClose={setOpen} as="div" className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-10 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 mb-2 sm:p-6 sm:pb-4">
              {title && (
                <DialogTitle as="h3" className="text-base/7 font-medium text-black dark:text-white">
                  {title}
                </DialogTitle>
              )}
              <div>
                <p className="whitespace-pre-wrap text-sm text-black dark:text-gray-400">{description}</p>
              </div>
              <div className="flex gap-2 mt-2 justify-end">
                <button className='cursor-pointer rounded-md text-sm px-4 py-1 bg-blue-500 font-medium text-white' onClick={handleOk}>确定</button>
                <button className='cursor-pointer rounded-md text-sm px-4 py-1 border font-medium border-gray-500 text-gray-500'>取消 </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

const show = ({ title, description, ok }: { title?: string; description: string; ok: () => void }) => {
  const fragment = document.createDocumentFragment();
  const root = createRoot(fragment);
  root.render(<ConfirmDialog title={title} description={description} ok={ok} open />);
  document.body.appendChild(fragment);
};

export default { show };
