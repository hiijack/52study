'use client';
import { useState, useRef } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useRouter } from 'next/navigation';

export default function CreateDialog() {
  const router = useRouter();
  const formRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function addBook() {
    setDisabled(true);
    const fd = new FormData(formRef.current);
    const res = await fetch('/api/add-book', {
      method: 'POST',
      body: fd,
    });
    const data = await res.json();
    if (data.code === 0) {
      router.refresh();
      setOpen(false);
      setDisabled(false);
    } else {
      // empty
    }
  }

  return (
    <section>
      <button
        className="rounded-md text-sm px-4 py-1 bg-blue-500 font-medium text-white"
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
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <DialogTitle as="h3" className="text-base/7 font-medium">
                  新增
                </DialogTitle>
                <form id="book-form" className="mt-4" ref={formRef}>
                  <div className="flex items-center gap-4 mb-4">
                    <label htmlFor="name" className="block text-sm font-medium">
                      名字
                    </label>
                    <div className="relative rounded-md flex-auto">
                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="填写名字"
                          className="peer w-full block rounded-md border border-gray-200 py-2 pl-4 text-sm placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <label htmlFor="tag" className="block text-sm font-medium">
                      标签
                    </label>
                    <div className="relative rounded-md flex-auto">
                      <div className="relative">
                        <input
                          id="tag"
                          name="tag"
                          type="text"
                          placeholder="填写标签"
                          className="peer w-full block rounded-md border border-gray-200 py-2 pl-4 text-sm placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <label htmlFor="download_url" className="block text-sm font-medium">
                      链接
                    </label>
                    <div className="relative rounded-md flex-auto">
                      <div className="relative">
                        <input
                          id="download_url"
                          name="download_url"
                          type="text"
                          placeholder="填写链接"
                          className="peer w-full block rounded-md border border-gray-200 py-2 pl-4 text-sm placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <label htmlFor="description" className="block text-sm font-medium">
                      简介
                    </label>
                    <div className="relative rounded-md flex-auto">
                      <div className="relative">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          placeholder="填写简介"
                          className="peer w-full block rounded-md border border-gray-200 py-2 pl-4 text-sm placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      disabled={disabled}
                      type="submit"
                      className="rounded-md text-sm px-4 py-1 bg-blue-500 font-medium text-white"
                      onClick={(e) => {
                        if (formRef.current.reportValidity()) {
                          addBook();
                        }
                        e.preventDefault();
                      }}
                    >
                      确定
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
