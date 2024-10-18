import { useCallback, useEffect, useState } from 'react';

export default function useViewportWidth(viewportWidth = 720) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= viewportWidth);

  const handleViewportResize = useCallback(() => {
    if (window.innerWidth <= viewportWidth) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [viewportWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleViewportResize);
    return () => {
      window.removeEventListener('resize', handleViewportResize);
    };
  }, [handleViewportResize]);

  return {
    isMobile,
  };
}
