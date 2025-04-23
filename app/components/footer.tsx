import { EnvelopeIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import ThemeProvider from './theme-context';
import ThemeBtn from './theme-btn';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 mx-auto p-6">
      <p className="text-sm text-center text-gray-400 dark:text-gray-400">
        <span className="font-serif">Copyright &copy; 2025 LunJz</span>
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-400 flex justify-center gap-2 p-2">
        <a href="mailto:lunjz@qq.com" aria-label="email" title="email">
          <EnvelopeIcon className="h-5 w-5 text-gray-400 hover:text-blue-500" />
        </a>
        <ThemeProvider>
          <ThemeBtn theme="light" aria-label="use light mode" title="use light mode">
            <SunIcon className="h-5 w-5" />
          </ThemeBtn>
          <ThemeBtn theme="dark" aria-label="use dark mode" title="use dark mode">
            <MoonIcon className="h-5 w-5" />
          </ThemeBtn>
        </ThemeProvider>
      </p>
    </footer>
  );
};

export default Footer;
