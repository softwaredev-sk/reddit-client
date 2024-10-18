import { ThemeContext } from '../context/ThemeContext';
import { useContext, useEffect, useState } from 'react';

export default function ThemeProvider({ children }) {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <div className={theme} style={{ maxWidth: '100vw', height: '100%' }}>
        {children}
      </div>
    );
  }
}
