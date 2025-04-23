'use client';

import { useContext } from 'react';
import clsx from 'clsx';
import { ThemeContext } from './theme-context';

const ThemeBtn = ({ theme, children, ...rest }) => {
  const { currentTheme, setTheme } = useContext(ThemeContext);

  return (
    <span
      className={clsx('cursor-pointer', currentTheme === theme ? 'text-blue-500' : 'text-gray-400')}
      onClick={() => {
        setTheme(theme);
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
      }}
      {...rest}
    >
      {children}
    </span>
  );
};

export default ThemeBtn;
