'use client';

import Modal from './modal';

export default function Detail({ id, title, description, tag, download_url }) {
  return (
    <h2
      className="mb-2 cursor-pointer"
      onClick={() => {
        fetch(`/api/detail?id=${id}`);
        Modal.info({ id, title, description, tag, download_url });
      }}
    >
      {title}
    </h2>
  );
}
