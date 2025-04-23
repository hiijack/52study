'use client';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useRouter } from 'next/navigation';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import BookForm from './book-form';

function UpdateDialog(props) {
  const { data, onClose } = props;
  const [open, setOpen] = useState(true);

  async function updateBook(form) {
    const fd = new FormData(form);
    const res = await fetch('/api/update-book', {
      method: 'POST',
      body: fd,
    });
    const data = await res.json();
    if (data.code === 0) {
      setOpen(false);
      onClose();
    } else {
      // empty
    }
  }

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
              <DialogTitle as="h3" className="text-base/7 font-medium dark:text-white">
                编辑
              </DialogTitle>
              <BookForm initValues={data} onSubmit={updateBook} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

const UpdateBtn = ({ data }) => {
  const router = useRouter();

  function createModal() {
    const fragment = document.createDocumentFragment();
    const root = createRoot(fragment);
    root.render(
      <UpdateDialog
        data={data}
        onClose={() => {
          router.refresh();
        }}
      />
    );
    document.body.appendChild(fragment);
  }

  return <button className='cursor-pointer' onClick={createModal}>编辑</button>;
};

export default UpdateBtn;
