'use client';

import ConfirmDialog from '@/app/components/confirm-dialog';
import { deleteBook } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

const DelBtn = (props) => {
  const { id, name } = props;
  const router = useRouter();

  const handleDel = () => {
    // console.log(id);
    ConfirmDialog.show({
      description: `确定删除“${name}”?`,
      ok: async () => {
        const res = await deleteBook(id);
        if (res) {
          router.refresh();
        }
      },
    });
  };

  return (
    <button className="text-blue-500 cursor-pointer" onClick={handleDel}>
      删除
    </button>
  );
};

export default DelBtn;
