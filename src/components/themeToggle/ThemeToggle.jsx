import styles from './ThemeToggle.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <div
      className={`${styles['theme-changer']} ${
        theme === 'dark'
          ? styles['theme-changer--dark']
          : styles['theme-changer--light']
      }`}
      onClick={toggle}
    >
      <div
        className={`${styles['theme-changer__ball']} ${
          theme === 'dark'
            ? styles['theme-changer__ball--dark']
            : styles['theme-changer__ball--light']
        }`}
      ></div>
    </div>
  );
}
