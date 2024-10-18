import { useEffect, useState } from 'react';
import { ScrollRestoration, useLocation } from 'react-router-dom';

export default function RestoreScroll() {
  const { pathname } = useLocation();
  const [restore, setRestore] = useState(true);

  useEffect(() => {
    if (pathname === '/') {
      setRestore(false);
    } else {
      setRestore(true);
    }
  }, [pathname]);

  if (restore) {
    return <ScrollRestoration />;
  }

  return null;
}
