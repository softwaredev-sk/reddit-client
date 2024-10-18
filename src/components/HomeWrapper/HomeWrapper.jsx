import { useEffect } from 'react';

import styles from './HomeWrapper.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HomeWrapper({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') {
        navigate('/');
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [pathname, navigate]);

  return (
    <main
      className={
        pathname === '/'
          ? styles['home__wrapper']
          : `${styles['home__wrapper']} ${styles['home__wrapper--blur']}`
      }
    >
      {children}
    </main>
  );
}
