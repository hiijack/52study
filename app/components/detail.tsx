'use client';

import Modal from './modal';

export default function Detail({ id, title, description, tag, download_url, children }) {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        fetch(`/api/detail?id=${id}`, {
          cache: 'force-cache',
        });
        Modal.info({ id, title, description, tag, download_url });
      }}
    >
      {children}
    </div>
  );
}
