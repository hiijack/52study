import { EnvelopeIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="max-w-container mx-auto p-4">
      <p className="text-sm text-center text-gray-400">Copyright © 2025 LunJz</p>
      <p className="text-sm text-center text-gray-400">
        <a href="mailto:lunjz@qq.com">
          <EnvelopeIcon className="inline-block h-5 w-5 text-gray-400" />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
