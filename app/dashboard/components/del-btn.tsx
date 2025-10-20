'use client';

import ConfirmDialog from '@/app/components/confirm-dialog';
import { deleteBook } from '@/app/lib/actions';

const DelBtn = (props) => {
  const { id, name } = props;

  const handleDel = () => {
    // console.log(id);
    ConfirmDialog.show({
      description: `确定删除“${name}”?`,
      ok: async () => {
        await deleteBook(id);
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
