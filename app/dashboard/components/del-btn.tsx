'use client';

import ConfirmDialog from '@/app/components/confirm-dialog';

const DelBtn = (props) => {
  const { id, name } = props;

  const handleDel = () => {
    // console.log(id);
    ConfirmDialog.show({
      description: `确定删除“${name}”?`,
      ok: () => {
        console.log('ok');
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
