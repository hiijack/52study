'use client';
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import BookForm from '@/app/components/book-form';

export default function CreateDialog() {
  const [open, setOpen] = useState(false);

  async function addBook(form) {
    const fd = new FormData(form);
    const res = await fetch('/api/add-book', {
      method: 'POST',
      body: fd,
    });
    const data = await res.json();
    if (data.code === 0) {
      setOpen(false);
    } else {
      // empty
    }
  }

  return (
    <section>
      <button
        className="cursor-pointer rounded-md text-sm px-4 py-1 bg-blue-500 font-medium text-white"
        onClick={() => {
          setOpen(true);
        }}
      >
        新增
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <DialogTitle as="h3" className="text-base/7 font-medium text-black dark:text-white">
                  新增
                </DialogTitle>
                <BookForm onSubmit={addBook} />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
